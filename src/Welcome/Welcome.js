import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from "./Footer.js"
import Carousel from './Carousel'

function Welcome() {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Welcome
