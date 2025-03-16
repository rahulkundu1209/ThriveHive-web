import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const RootLayout = () => {
  return (
    <div>
      <header>
        <Navbar/>
      </header>
      <main className='top-10 relative'>
        <Outlet/>
      </main>
    </div>
  )
}

export default RootLayout
