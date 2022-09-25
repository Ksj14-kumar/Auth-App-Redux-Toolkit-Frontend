import React from 'react'
import Header from './Header'
import { useCookies } from "react-cookie";
function About() {
    const name = localStorage.getItem("name")
    return (
        <div>
            <Header />
            <div className="about_container w-full bg-gradient-to-tr from-rose-700 to-pink-600 flex justify-center align-middle items-center h-[calc(100vh-0rem)]">
                <p className='text-[1.2rem] tracking-wider font-serif text-center flex justify-center align-middle'>
                    <div className="con">
                        <p className='text-[1.3rem]'>Hi,</p>
                        <i className='italic ml-2'>{name} 😀😀😀😸</i>
                    </div>
                </p>
            </div>
        </div>
    )
}
export default About;