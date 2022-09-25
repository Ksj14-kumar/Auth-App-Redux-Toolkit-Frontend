import React from 'react'
import Header from './Header'
import Axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useSelector } from 'react-redux'
import { Grid } from "react-loader-spinner";
import { redirect, useNavigate } from 'react-router-dom'
const fetch = async (d) => {
    try {
        const res = await Axios.get(`${process.env.REACT_APP_API_URL}/news`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        return res;
    } catch (err) {
        throw new Error(err)
    }
}
function Contact() {
    const { id, user } = useSelector(state => state.Auth)
    const fetchData = useQuery([id], fetch)
    const navigate = useNavigate()
    function __Withredirect(link) {
        window.location.replace(link)
    }
    if (fetchData.isError) {
        return (
            <>
                <Header />
                <div className="contact_container w-full bg-gradient-to-br from-gray-200 via-gray-200 to-gray-300 flex flex-col justify-center align-middle items-center  md:px-[10rem] xl:px-[15rem] bg-red-500 pt-[4rem] px-2 h-[calc(100vh-0rem)]">
                    <h1 className='w-full flex justify-center align-middle font-serif font-medium tracking-wide text-[1.4rem] flex-wrap items-center'>
                        Opps, Something error occured, reload page
                    </h1>
                </div>
            </>
        )
    }
    if (!user) {
        navigate("/")
    }
    return (
        <div>
            <Header />
            <div className="contact_container w-full bg-gradient-to-br from-gray-200 via-gray-200 to-gray-300 flex flex-col justify-center align-middle items-center  md:px-[10rem] xl:px-[15rem] bg-red-500 pt-[4rem] px-2">
                {
                    fetchData.isLoading ? <Loader /> :
                        fetchData.data.data.articles.map((item, index) => {
                            return (
                                <div className="card bg-[#fff] border border-solid border-slate-300 drop-shadow-md rounded-md cursor-pointer mb-[.7rem] w-full" key={index}
                                    onClick={() => {
                                        __Withredirect(item.url)
                                    }}
                                >
                                    <div className="title md:p-4 p-2 flex flex-wrap">
                                        <p className='text-[1rem] text-[#0f0e0e] font-sans tracking-wide font-bold break-all flex flex-wrap'>
                                            {item.title}
                                        </p>
                                        <p className='text-[1rem] font-sans des'>
                                            {item.description}
                                        </p>
                                        <div className="wra flex justify-between w-full mt-2 flex-wrap">
                                            <div className=" flex flex-[5] justify-between  mobile1:flex-col">
                                                <p className='text-base font-mono shadow-white shadow-md list-disc text-[#e30a0a] flex  truncate mobile:text-[.8rem]'>• {item.source.name}</p>
                                                <p className='text-base font-mono shadow-white shadow-md list-disc text-[#d71010]  flex truncate mobile:text-[.8rem] mobile1:ml-0 ml-8'>•{item.publishedAt}</p>
                                            </div>
                                            <div className="published flex flex-[5] justify-end align-middle">
                                                {item.auther ?
                                                    <>
                                                        <p className='text-base font-serif'>Published By: </p>
                                                        <em className='text-base font-semibold pl-2'>
                                                            {item.auther}
                                                        </em>
                                                    </> :
                                                    ""
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="image w-full h-[25rem] rounded-md">
                                        <img src={item.urlToImage} alt="image" className='w-full h-full rounded-t-none rounded-md' />
                                    </div>
                                    <div className="info">
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}
export default Contact;
function Loader() {
    return (
        <div className="contain flex justify-center w-full items-center align-middle h-[calc(100vh-4rem)]">
            <Grid
                height="80"
                width="80"
                color="#002B5B"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}