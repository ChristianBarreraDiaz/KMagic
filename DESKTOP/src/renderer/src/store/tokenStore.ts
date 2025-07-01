import { create } from 'zustand'

interface AuthStore {
  token: string | null
  setToken: (newToken: string | null) => void
  fetchToken: () => Promise<string | null> // Change the return type to Promise<string | null>
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  setToken: (newToken) => set({ token: newToken }),
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  fetchToken: async () => {
    try {
      const response = await fetch(`${import.meta.env.RENDERER_VITE_EXPRES_URL}/token`)
      const data = await response.json()

      if (data?.token) {
        const isValid = await fetchVerifyToken(data.token)
        set({ token: isValid ? data.token : null })
        return isValid ? data.token : null // Return the token if valid, otherwise null
      } else {
        set({ token: null })
        return null
      }
    } catch (error) {
      console.error('Error fetching token:', error)
      return null
    }
  }
}))

const fetchVerifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${import.meta.env.RENDERER_VITE_EXPRES_URL}/token/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    })
    const data = await response.json()
    return data?.status as boolean
  } catch (error) {
    console.error('Error fetching validating token:', error)
    return false
  }
}
