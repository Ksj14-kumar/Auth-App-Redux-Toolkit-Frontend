import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Logout, reset } from "../features/authSlice"
function Header() {
    const dispatch = useDispatch()
    const location = useLocation()
    const { user } = useSelector(state => state.Auth)
    const navigate = useNavigate()
    const handleLogout = () => {
        // window.location.reload()
        dispatch(Logout())
        dispatch(reset())
        navigate("/")
    }
    const headerLinks = [
        {
            id: 1,
            name: "Home",
            path: "/"
        },
        {
            id: 2,
            name: "About",
            path: "/about"
        },
        {
            id: 3,
            name: "News",
            path: "/news"
        },
    ]
    const notLoggedIn = [
        {
            id: 1,
            name: "Sign-Up",
            path: "/register"
        },
        {
            id: 2,
            name: "Login",
            path: "/login"
        },
    ]
    return (
        <div className="top-wrapper bg-[#f1f0f0] absolute w-full  justify-between">
            <header className='top-navigation-header flex p-3 px-2 drop-shadow-md fixed w-full bg-[#f0f0f0] z-[2]'>
                <div className="logo md:flex-[6] flex-[3] flex font-serif text-[.9rem] mobile:text-[1.1rem]  cursor-pointer text-[#f31550]">
                    <Link to="/">
                        Auth App
                    </Link>
                </div>
                <ul className='unorder-link  flex md:flex-[6] flex-[9] w-full justify-evenly'>
                    {!user ? (
                        <>
                            {
                                notLoggedIn.map((item, index) => {
                                    return (
                                        <NavLink
                                            key={index}
                                            className={`links1 Home text-[.9rem] mobile:text-[1rem] font-serif space-x-1 hover:underline hover:underline-offset-1 cursor-pointer decoration-[#494a6c] decoration-[2px] tracking-wider 
                                                ${location.pathname === item.path && "underline decoration-2 underline-offset-2 decoration-[#f92840]"}
                                                `} to={item.path}
                                        >{item.name}</NavLink>
                                    )
                                })
                            }
                        </>
                    ) : (
                        <>
                            {
                                headerLinks.map((item, index) => {
                                    return (
                                        <>
                                            <NavLink to={item.path}
                                                key={index}
                                                className={`links1 Home text-[.9rem] mobile:text-[1rem] font-serif space-x-1 hover:underline hover:underline-offset-1 cursor-pointer decoration-[#494a6c] decoration-[2px] tracking-wider 
                                                ${location.pathname === item.path && "underline decoration-2 underline-offset-2 decoration-[#f92840]"}
                                                `}
                                            >{item.name}</NavLink>
                                        </>
                                    )
                                })
                            }
                            <NavLink className="links3 Contact text-[.9rem] mobile:text-[1rem] font-serif space-x-1 hover:underline hover:underline-offset-1 cursor-pointer decoration-[#494a6c] decoration-[2px] tracking-wider"
                                onClick={handleLogout}
                            >Logout</NavLink>
                        </>
                    )
                    }
                </ul>
            </header>
        </div >
    )
}
export default Header;