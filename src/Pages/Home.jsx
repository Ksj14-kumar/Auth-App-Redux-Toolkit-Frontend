import React from 'react'
import Header from './Header'
import { useSelector } from 'react-redux'
function Home() {
    const { user } = useSelector(state => state.Auth)
    return (
        <div>
            <Header />
            {user ?
                <div className="home_container w-full bg-gradient-to-r from-gray-100 to-gray-300 flex justify-center align-middle items-center h-[calc(100vh-0rem)]">
                    <p className='text-[1.2rem] tracking-wider font-serif text-center flex justify-center align-middle'>
                        Welcome to Account
                    </p>
                </div> :
                <div className="home_container w-full bg-gradient-to-t from-red-500 to-green-500 flex justify-center align-middle items-center h-[calc(100vh-0rem)]">
                    <p className='text-[1.2rem] tracking-wider font-serif text-center flex justify-center align-middle'>
                        Auth App
                    </p>
                </div>
            }
        </div>
    )
}
export default Home