import { type ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/validateEmail'
import hero from '../../assets/hero.png'
import saly from '../../assets/Saly-17.svg'
import { useAuthStore } from '@renderer/store/tokenStore'

type ValidationStatus = 'default' | 'valid' | 'invalid'

type Message = '' | 'Las credenciales ingresadas son inválidas'

function Signin(): JSX.Element {
  const [username, setUsername] = useState<string | null>(null) // Update the type of data to allow for string or null
  const [password, setPassword] = useState<string | null>(null) // Update the type of data to allow for string or null\  const [isUsernameValid, setIsUsernameValid] =
  const [isUsernameValid, setIsUsernameValid] = useState<ValidationStatus>('default')
  const [isPasswordValid, setIsPasswordValid] = useState<ValidationStatus>('default')
  const [message, setMessage] = useState<Message>('')

  let usernameTimeout: NodeJS.Timeout | null = null
  let passwordTimeout: NodeJS.Timeout | null = null

  const navigate = useNavigate()
  const { fetchToken } = useAuthStore()

  const validateUsername = (username: string): void => {
    const isValid = validateEmail(username)
    setIsUsernameValid(isValid ? 'valid' : 'invalid')
    console.log('🚀 ~ file: signin-form.tsx:33 ~ SigninForm ~ isUsernameValid:', isUsernameValid)
  }

  const validatePassword = (password: string): void => {
    console.log('🚀 ~ file: signin-form.tsx:50 ~ validatePassword ~ password:', password)
    console.log('🚀 ~ file: page.tsx:14 ~ Signin ~ isPasswordValid:', isPasswordValid)
    setIsPasswordValid(password ? 'valid' : 'invalid')
  }

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setMessage('')
    // Clear the previous timeout
    if (usernameTimeout) {
      clearTimeout(usernameTimeout)
    }

    // Set a new timeout
    usernameTimeout = setTimeout(() => {
      validateUsername(e.target.value)
    }, 700)
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setMessage('')
    // Clear the previous timeout
    if (passwordTimeout) {
      clearTimeout(passwordTimeout)
    }

    // Set a new timeout
    passwordTimeout = setTimeout(() => {
      validatePassword(e.target.value)
    }, 700)
    setPassword(e.target.value)
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    validateUsername(username ?? '')
    validatePassword(password ?? '')

    if (isUsernameValid !== 'valid' || isPasswordValid !== 'valid') {
      setMessage('Las credenciales ingresadas son inválidas')
      return
    }

    setMessage('')

    try {
      const response = await fetch('http://localhost:8085/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      })
      console.log('🚀 ~ file: page.tsx:21 ~ consthandleLogin: ~ response:', response)
      const responseData: { token: string } = await response.json()
      console.log('🚀 ~ file: page.tsx:22 ~ consthandleLogin: ~ responseData:', responseData)

      if (!responseData?.token) {
        return
      }
      // console.log("navigate('/')")
      await fetchToken()
      navigate('/')
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <section className="from-chetwode-blue-300 to-chetwode-blue-200 mx-auto my-0 grid h-screen w-full place-items-center bg-gradient-to-r px-[15px] lg:w-full lg:grid-cols-[60%_40%] lg:items-center lg:justify-start lg:rounded-2xl lg:bg-white lg:bg-gradient-to-r lg:from-white lg:to-white lg:px-0 lg:py-0">
      <div className="from-chetwode-blue-300 to-chetwode-blue-200 hidden h-full w-full bg-gradient-to-r lg:grid lg:place-content-center">
        <figure className="w-[900px]">
          <img src={saly} alt="saly" width={2160} height={2160} loading="eager" />
        </figure>
      </div>
      <form
        className="shadow-full-sm flex w-full flex-col gap-4 rounded-[10px] bg-white px-[30px] py-[50px] md:max-w-[340px] lg:rounded-none lg:p-0 lg:shadow-none"
        onSubmit={handleLogin}
      >
        <div className="relative mx-auto">
          <img src={hero} className="max-w-full object-cover" width={360} height={360} alt="hero" />
        </div>
        <div>
          <div className="mb-2 block">
            <label htmlFor="username" className="font-bold">
              Usuario
            </label>
          </div>
          <input
            type="text"
            placeholder="Ingrese su usuario"
            id="username"
            name="username"
            required
            value={username ?? ''}
            onChange={handleUsernameChange}
            className={
              isUsernameValid === 'valid' || isUsernameValid === 'default'
                ? 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                : 'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-red-600'
            }
          />
        </div>
        <div>
          <div className="mb-2 block">
            <label htmlFor="password" className="font-bold">
              Contraseña
            </label>
          </div>
          <input
            id="password"
            name="password"
            placeholder="Ingrese su contraseña"
            required
            type="password"
            value={password ?? ''}
            onChange={handlePasswordChange}
            className={
              isPasswordValid === 'valid' || isPasswordValid === 'default'
                ? 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                : 'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-red-600'
            }
          />
        </div>
        <span className={message ? 'block text-red-600' : 'hidden'}>{message}</span>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white bg-chetwode-blue-600 hover:bg-chetwode-blue-500 h-10 px-4 py-2"
        >
          Iniciar sesión
        </button>
      </form>
    </section>
  )
}

export default Signin
