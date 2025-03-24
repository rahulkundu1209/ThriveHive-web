import React, { useContext } from 'react';
import { useAuthContext } from '../../App';
import Hero from './Hero/Hero'
import Problem from './Problem/Problem'
import Solution from './Solution/Solution'
import Testimonials from './Testimonials/Testimonials'
import ContactUs from './ContactUs/ContactUs'
import Footer from './Footer/Footer'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Problem/>
      <Solution/>
      <Testimonials/>
      <ContactUs/>
      <Footer/>
    </div>
  )
}

export default Home
