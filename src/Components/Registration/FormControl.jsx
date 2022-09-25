import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registration, reset } from "../../features/authSlice"
import { useNavigate } from "react-router-dom"
import { HiCheckCircle } from "react-icons/hi";
import { MdOutlineError } from "react-icons/md";
import { toast } from "react-toastify"
import Home from '../../Pages/Header';
function FormControl() {
    const [UserSignUpData, setUserSignUpData] = useState({ name: "", email: "", password: "", cPassword: "" })
    const { isError, isLoading, isSuccess, user, message } = useSelector(state => state.Auth)
    const [ValidFormData, setValidFormData] = useState({
        name: { isValid: null, message: "", value: "" },
        email: { isValid: null, message: "", value: "" },
        password: { isValid: null, message: "", value: "" },
        Cpassword: { isValid: null, message: "", value: "" },
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
            dispatch(reset())
        }
        else if (isSuccess) {
            toast.success("Sing-up Successfull, now login", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            navigate("/login")
            dispatch(reset())
            setUserSignUpData({ name: "", email: "", password: "", cPassword: "" })
            setValidFormData({
                name: { isValid: null, message: "", value: "" },
                email: { isValid: null, message: "", value: "" },
                password: { isValid: null, message: "", value: "" },
                Cpassword: { isValid: null, message: "", value: "" },
            })
        }
        else if (user) {
            navigate("/login")
            dispatch(reset())
        }
    }, [isError, isLoading, isSuccess, user, dispatch, message])
    const inputHandle = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserSignUpData({ ...UserSignUpData, [name]: value })
    }
    const handleSubmitForm = async () => {
        if (UserSignUpData.cPassword !== UserSignUpData.password) {
            toast.error('Password must be same.', {
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
        try {
            dispatch(registration(UserSignUpData))
        } catch (err) {
            console.warn(err)
        }
    }
    const handleResetForm = () => {
        setUserSignUpData({ name: "", email: "", password: "", cPassword: "" })
        setValidFormData({
            name: { isValid: null, message: "", value: "" },
            email: { isValid: null, message: "", value: "" },
            password: { isValid: null, message: "", value: "" },
            Cpassword: { isValid: null, message: "", value: "" },
        })
    }
    return (
        <>
            <Home />
            <div className='form-control bg-[#e6e6e6] h-[calc(100vh-0rem)] md:px-[10rem] flex flex-col align-middle justify-center'>
                <div className="form-Container  rounded-md drop-shadow-md bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600">
                    <h3 className="lable  text-center text-[1.5rem] font-serif text-[#413d69] py-2  tracking-wider">SignUp</h3>
                    <div className="wrapper_container_form px-2">
                        <div className="name">
                            <div className="wrapper_name rounded-md mt-4  relative flex border-1 border-[#e41111]">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder='Full-Name...'
                                    value={UserSignUpData.name}
                                    onChange={inputHandle}
                                    onBlur={(e) => {
                                        const regex = /^[a-zA-Z ]{3,30}$/
                                        setValidFormData({ ...ValidFormData, name: { isValid: regex.test(e.target.value), value: e.target.value, message: e.target.value === "" ? "can't empty" : regex.test(e.target.value) === false ? "Invalid name" : "" } })
                                    }
                                    }
                                    className={`w-full text-serif py-2 focus:outline-none rounded-md pl-2 mb-1
                            text-serif text-[1rem] tracking-wider
                            pr-[3.1rem ${ValidFormData.name?.isValid === false ? "border-2 border-solid border-[#e41111]" :
                                            ValidFormData.name?.isValid === true && "border border-solid border-green-400"
                                        }`}
                                    required
                                />
                                <div className="icons absolute flex justify-end items-center h-full right-1">
                                    {ValidFormData.name?.isValid === false ? <MdOutlineError className='text-[1.5rem] text-[#da0f0f]' /> :
                                        ValidFormData.name?.isValid === true && <HiCheckCircle className='text-[1.5rem] text-[#0ae247]' />
                                    }
                                </div>
                            </div>
                            <span className='text-sm font-sans tracking-wider pl-4 text-red-600'>{ValidFormData.name?.message}</span>
                        </div>
                        <div className="email">
                            <div className="wrapper_email  relative flex">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder='Email...'
                                    value={UserSignUpData.email}
                                    onChange={inputHandle}
                                    onBlur={(e) => {
                                        const pattern = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i
                                        setValidFormData({
                                            ...ValidFormData, email: {
                                                isValid: pattern.test(e.target.value),
                                                value: e.target.value,
                                                message: e.target.value === "" ? "can't empty" : pattern.test(e.target.value) === false ? "invalid email" : ""
                                            }
                                        })
                                    }}
                                    className={`w-full text-serif py-2 focus:outline-none border border-solid border-[#f0f0f0] rounded-md pl-2 mb-1
                            text-serif text-[1rem] tracking-wider 
                            ${ValidFormData.email?.isValid === false ? "border-2 border-solid border-[#e41111]" :
                                            ValidFormData.email?.isValid === true && "border border-solid border-green-400"
                                        }
                            `}
                                    required
                                />
                                <div className="icons absolute flex justify-end items-center  h-full right-1">
                                    {ValidFormData.email?.isValid === false ? <MdOutlineError className='text-[1.5rem] text-[#da0f0f]' /> :
                                        ValidFormData.email?.isValid === true && <HiCheckCircle className='text-[1.5rem] text-[#0ae247]' />
                                    }
                                </div>
                            </div>
                            <span className='text-sm font-sans tracking-wider pl-4 text-red-600'>{ValidFormData.email?.message}</span>
                        </div>
                        <div className="password">
                            <div className="wrapper_password  relative flex">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={UserSignUpData.password}
                                    onChange={inputHandle}
                                    onBlur={(e) => {
                                        const value = e.target.value
                                        const pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
                                        const isValid = pattern.test(value)
                                        setValidFormData({
                                            ...ValidFormData,
                                            password: { isValid: isValid, value: value, message: value === "" ? "can't empty" : isValid === false ? "password must contain at least one uppercase, one lowercase, one numeric and special character" : "" }
                                        })
                                    }}
                                    placeholder='Password...'
                                    className={`w-full text-serif py-2 focus:outline-none  rounded-md pl-2 mb-1
                            text-serif text-[1rem] tracking-wider 
                            ${ValidFormData.password?.isValid === false ? "border-2 border-solid border-[#e41111]" :
                                            ValidFormData.password?.isValid === true && "border border-solid border-green-400"
                                        }
                            `}
                                    required
                                />
                                <div className="icons absolute flex justify-end items-center  h-full right-1">
                                    {ValidFormData.password?.isValid === false ? <MdOutlineError className='text-[1.5rem] text-[#da0f0f]' /> :
                                        ValidFormData.password?.isValid === true && <HiCheckCircle className='text-[1.5rem] text-[#0ae247]' />
                                    }
                                </div>
                            </div>
                            <span className='text-sm font-sans tracking-wider text-red-600'>{ValidFormData.password?.message}</span>
                        </div>
                        <div className="confirmPassword">
                            <div className="_wrapper_confirm mt-4  relative flex">
                                <input
                                    type="password"
                                    name="cPassword"
                                    id="ConfirmPassword"
                                    value={UserSignUpData.cPassword}
                                    onChange={inputHandle}
                                    onBlur={(e) => {
                                        const value = e.target.value
                                        const pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
                                        const isValid = pattern.test(value)
                                        setValidFormData({
                                            ...ValidFormData,
                                            Cpassword: { isValid: isValid, value, message: value === "" ? "can't empty" : isValid === false ? "Invalid password" : ValidFormData.Cpassword.value === ValidFormData.password.value ? "" : "password must be same" }
                                        })
                                    }}
                                    placeholder='Re-enter Password...'
                                    className={`w-full text-serif py-2 focus:outline-none border border-solid border-[#f0f0f0] rounded-md pl-2 mb-1
                            text-serif text-[1rem] tracking-wider
                            ${ValidFormData.Cpassword?.isValid === false ? "border-2 border-solid border-[#e41111]" :
                                            ValidFormData.Cpassword?.isValid === true && "border border-solid border-green-400"
                                        }
                            `
                                    }
                                    required
                                />
                                <div className="icons absolute flex justify-end items-center  h-full right-1">
                                    <div className="icons absolute flex justify-end items-center  h-full right-1">
                                        {ValidFormData.Cpassword?.isValid === false ? <MdOutlineError className='text-[1.5rem] text-[#da0f0f]' /> :
                                            ValidFormData.Cpassword?.isValid === true && <HiCheckCircle className='text-[1.5rem] text-[#0ae247]' />
                                        }
                                    </div>
                                </div>
                            </div>
                            <span className='text-sm font-sans tracking-wider  text-red-600'>{ValidFormData.Cpassword.message}</span>
                        </div>
                        <div className="btn-group-reg flex justify-evenly mb-2 mt-2">
                            <button
                                className='Signup-btn-submit
                             py-2 md:px-6 px-4 bg-blue-200 rounded-md
                             text-[1.1rem] font-serif tracking-wider'
                                disabled={ValidFormData.name.isValid === true && ValidFormData.email.isValid === true && ValidFormData.password.isValid === true && ValidFormData.Cpassword.isValid === true ? false : isLoading ? true : false}
                                onClick={handleSubmitForm}
                            >
                                {isLoading ? <Loader /> : "Sign Up"}</button>
                            <button
                                className='Signup-btn-submit py-2 md:px-6 px-4 bg-blue-200 rounded-md
                            text-[1.1rem] font-serif tracking-wider'
                                onClick={handleResetForm}
                            >
                                Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FormControl;
function Loader() {
    return <div className="">
        loading...
    </div>
}