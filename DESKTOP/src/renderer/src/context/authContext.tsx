import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react'

interface AuthContextProps {
  token: string | null
  setToken: (newToken: string | null) => void
  fetchToken: () => Promise<void> // Add a function to fetch the token
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)

  // Function to fetch the token
  const fetchToken = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:8085/token')
      const data = await response.json()
      console.log('🚀 ~ file: authContext.tsx:19 ~ fetchToken ~ data:', data)

      if (data?.token) {
        const isValid = await fetchVerifyToken(data.token)
        setToken(isValid ? data.token : null)
      } else {
        setToken(null)
      }
    } catch (error) {
      console.error('Error fetching token:', error)
    }
  }

  const fetchVerifyToken = async (token: string): Promise<boolean> => {
    try {
      console.log('🚀 ~ file: authContext.tsx:56 ~ fetchVerifyToken ~ token:', token)
      const response = await fetch('http://localhost:8085/token/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      })
      const data = await response.json()
      console.log('🚀 ~ file: authContext.tsx:43 ~ fetchToken ~ data:', data)
      return data?.status as boolean
    } catch (error) {
      console.error('Error fetching validating token:', error)
      return false
    }
  }

  useEffect(() => {
    // Fetch the token when the component mounts
    fetchToken()
  }, []) // The empty dependency array ensures it runs only once

  return (
    <AuthContext.Provider value={{ token, setToken, fetchToken }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
