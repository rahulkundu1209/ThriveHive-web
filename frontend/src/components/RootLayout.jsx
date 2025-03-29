import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuthContext } from '../App';

const RootLayout = () => {
  const { signedIn, isAdmin, userName } = useAuthContext();

  return (
    <div>
      <header className='mb-15'>
      <Navbar signedIn={signedIn} isAdmin={isAdmin} userName={userName} />
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default RootLayout
