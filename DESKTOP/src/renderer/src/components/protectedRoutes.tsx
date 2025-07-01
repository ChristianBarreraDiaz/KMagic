import { useAuth } from '@renderer/context/authContext'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  redirectPath?: string
  children: React.ReactNode
}

export const ProtectedRoute = ({ redirectPath, children }: Props): React.ReactNode | null => {
  const { token, fetchToken } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('🚀 ~ file: protectedRoutes.tsx:41 ~ ProtectedRoute ~ token:', token)
    const fetchData = async (): Promise<void> => {
      try {
        await fetchToken()
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching token:', error)
        setIsLoading(false)
      }
    }
    console.log('🚀 ~ file: protectedRoutes.tsx:51 ~ ProtectedRoute ~ token:', token)

    fetchData()
  }, [fetchToken])

  if (isLoading) {
    // Handle loading state, if needed
    return null
  }

  if (!token) {
    return <Navigate to={redirectPath ?? '/signin'} replace />
  }

  return children
}
