import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { SvgProvider } from '../Components/context/svgContext'

const Layout = (props) => {
  return (
    <>
    {/* <SvgProvider>   */}
    <Navbar/>

    <main style={{marginTop:"8rem"}}>
        {props.children}
    </main>
    <Footer/>
    {/* </SvgProvider> */}
    </>
  )
}

export default Layout
