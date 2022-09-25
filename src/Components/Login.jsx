import React, { useState, useEffect } from 'react'
import Header from '../Pages/Header'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { LoginAsyn } from "../features/authSlice"
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from "react-cookie"
function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [loginValidData, setLoginValidData] = useState({ email: { value: "", isValid: null, message: "" }, password: { value: "", isValid: null, message: "" } })
    const { isSuccess, user, isLoading, isError, message } = useSelector(state => state.Auth)
    const dispatch = useDispatch()
    const [cookie, setCookie] = useCookies()
    // const user = localStorage.getItem("access_token")
    const navigate = useNavigate()
    const inputHandle = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value })
    }
    const submitFormData = () => {
        if (!formData.email || !formData.password) {
            toast.error('all fields are required.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return
        }
        dispatch(LoginAsyn(formData))
    }
    useEffect(() => {
        if (user) {
            setCookie("access_token", user?.access_token, {
                path: "/",
                domain: process.env.PROXY
            })
            setCookie("agent", user?.cookies, {
                path: "/",
                domain: process.env.PROXY
            })
            navigate("/")
        }
    }, [user])
    useEffect(() => {
        if (isError) {
            toast.error(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }, [isError, message])
    return (
        <>
            <div>
                <Header />
                <div className="login_container bg-gradient-to-tl from-gray-200 via-gray-400 to-gray-600 w-full md:px-[7rem] px-1 py-[5rem]  h-[calc(100vh-0rem)] flex justify-center align-middle" >
                    <div className="wrapper_login bg-gradient-to-tr from-gray-400 via-gray-600 to-blue-800 px-3  w-full rounded-md drop-shadow-md">
                        <div className="login text-center md:py-4 py-3">
                            <h3 className='md:text-[1.5rem] text-[1.4rem] font-serif tracking-wider '>Login</h3>
                        </div>
                        <div className="email w-full mb-4">
                            <div className="wrapper_email">
                                <input type="email" name="email" placeholder='Email' id="email"
                                    onChange={inputHandle}
                                    value={formData.email}
                                    onBlur={(e) => {
                                        const value = e.target.value;
                                        const pattern = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i
                                        const isValid = pattern.test(value)
                                        setLoginValidData({ ...loginValidData, email: { message: !e.target.value ? "can't  empty" : isValid === true ? "" : "Invalid Email", value, isValid } })
                                    }}
                                    className={`p-2 pl-4 rounded-md focus:outline-none w-full ${loginValidData.email?.isValid === true ? "border border-solid border-[#19e82a]" : loginValidData.email?.isValid === false && "border-2 border-solid border-[#ef2d1b]"}`}
                                />
                            </div>
                            <span className='text-[1rem] font-serif tracking-wider text-[#d90a0a]'>{loginValidData.email?.message}</span>
                        </div>
                        <div className="password w-full mb-4">
                            <div className="wrapper_password">
                                <input type="password" name="password" placeholder='Password' id="password"
                                    onChange={inputHandle}
                                    value={formData.password}
                                    onBlur={(e) => {
                                        const value = e.target.value;
                                        const pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
                                        const isValid = pattern.test(value)
                                        setLoginValidData({ ...loginValidData, password: { message: !e.target.value ? "can't  empty" : isValid === true ? "" : "Invalid password", value, isValid } })
                                    }}
                                    className={`p-2 pl-4 rounded-md focus:outline-none w-full ${loginValidData.password?.isValid === true ? "border border-solid border-[#19e82a]" : loginValidData.password?.isValid === false && "border-2 border-solid border-[#ef2d1b]"}`}
                                />
                            </div>
                            <span className='text-[1rem] font-serif tracking-wider text-[#d90a0a]'>{loginValidData.password?.message}</span>
                        </div>
                        <button
                            disabled={
                                isLoading ? (true) : (
                                    loginValidData.email.isValid === true &&
                                        loginValidData.password.isValid === true ? false : true
                                )
                            }
                            className='px-4 py-2 bg-blue-500 rounded-md w-full text-[1.2rem] font-serif tracking-wider'
                            onClick={submitFormData}
                        >{isLoading ? "loading..." : "Login"}</button>
                    </div>
                </div >
            </div >
        </>
    )
}
export default Login