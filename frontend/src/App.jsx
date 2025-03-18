import { createContext, useContext, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './components/RootLayout'
import Home from './components/Home/Home'
import Worksheet from './components/Worksheet/Worksheet'

const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout/>,
      children: [
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '/worksheet',
          element: <Worksheet/>
        }
      ]
    }
  ])

  const [signedIn, setSignedIn] = useState(false);

  return (
    <AuthContext.Provider value={[signedIn, setSignedIn]}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  )
}

export default App
