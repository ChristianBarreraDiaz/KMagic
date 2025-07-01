import { createHashRouter, RouterProvider } from 'react-router-dom'
import Error from './pages/error-page'
import Sigin from './pages/signin/page'
import HomePage from './pages/home/page'
// import { ProtectedRoute } from './components/protectedRoutes'
// import { AuthProvider } from './context/authContext'

// Use createHashRouter instead of createBrowserRouter
const router = createHashRouter([
  {
    path: '/signin',
    element: <Sigin />,
    errorElement: <Error />
  },
  {
    path: '/',
    element: (
      // Adjust the ProtectedRoute component to work with HashRouter
      // <ProtectedRoute redirectPath="/signin">
      //   <HomePage />
      // </ProtectedRoute>
      <HomePage />
    ),
    errorElement: <Error />
  }
])

function App(): JSX.Element {
  return (
    // <AuthProvider>
    //   <RouterProvider router={router} />
    // </AuthProvider>
    <RouterProvider router={router} />
  )
}

export default App
