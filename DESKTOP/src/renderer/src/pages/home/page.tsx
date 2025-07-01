// Component
import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/tokenStore'

const HomePage: React.FC = () => {
  const { fetchToken } = useAuthStore()
  const [qr, setQr] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const fetchedToken = await fetchToken()
        console.log('🚀 ~ file: page.tsx:14 ~ fetchData ~ token:', fetchedToken)

        if (!fetchedToken) {
          // If there is no token, redirect to the login page
          navigate('/signin')
        } else {
          generateQRCode(fetchedToken)
        }
      } catch (error) {
        console.error('Error fetching token:', error)
        // Handle error as needed, e.g., redirect to login
        navigate('/signin')
      }
    }

    fetchData()
  }, [fetchToken, navigate])

  // With async/await
  const generateQRCode = async (text): Promise<void> => {
    if (text) {
      QRCode.toDataURL(
        text,
        {
          width: 800,
          margin: 0,
          color: {
            dark: '#335383FF',
            light: '#ffffff'
          }
        },
        (err, url) => {
          if (err) return console.error(err)

          console.log(url)
          setQr(url)
        }
      )
    }
  }

  return (
    <section className="from-chetwode-blue-300 to-chetwode-blue-200 mx-auto my-0 flex h-screen w-full bg-gradient-to-r items-center justify-center">
      <div className="bg-white max-w-sm shadow-full-sm py-10 px-10 rounded-lg items-center justify-center flex-col gap-5 flex">
        <h1 className="text-black font-bold text-base ">
          Escanea el código QR para conectar dispositivo móvil
        </h1>
        {qr && (
          <>
            <img src={qr} alt="qr-code" />
          </>
        )}
      </div>
    </section>
  )
}

export default HomePage
