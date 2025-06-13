import React from 'react'
import footerperson from '../assets/footerperson.png'
import { FaLocationDot } from 'react-icons/fa6'
import { IoCall } from 'react-icons/io5'
import { RiRecordCircleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='relative max-w-[1501px] m-auto'>
            <div className='bg-[#C1E3F3] rounded-3xl  -rotate-7 max-w-[1200px] max-lg:max-w-[300px] max-lg:-top-2 m-auto absolute  -top-6 w-[700px] h-[100px] right-4' />

            <div className='bg-[#51C1F3]   relative w-full rounded-xl'>
                <div className="flex flex-1 items-center ">
                    <div className='max-lg:hidden'>
                        <img src={footerperson} alt="" />
                    </div>

                    <div className='flex-col  w-full  px-10 max-lg:py-10 '>
                        <div className='flex    max-lg:flex-col max-md:justify-center max-lg:gap-10 ml-auto justify-between  '>


                            <div>
                                <h1 className='text-[30.467px] font-[300] text-white    '> Tutorhive</h1>
                                <p className='text-[15px] font-[300] text-white  max-w-[286.9px]   '>Our Dealership is founded on trust, integrity, and respect. We are proud to offer these values in our sales and business practices , so our customers keep coming back. </p>
                            </div>


                            <div>
                                <h1 className='text-[18px] font-[600] text-white  '> Contact Info</h1>

                                <div>
                                    <div className=' flex gap-2 items-center text-white mt-4'>
                                        <FaLocationDot />
                                        <p className='text-white text-[15px] font-[400] max-w-[193.867px]'>  2633 S Padre Island Dr. ,
                                            Corpus Christi , TX 78415</p>

                                    </div>
                                    <div className=' flex gap-2 items-center text-white mt-4'>
                                        <IoCall />
                                        <p className='text-white text-[15px] font-[400] max-w-[193.867px]'>  SALES: (361) 235-4943</p>
                                        <p className='text-white text-[15px] font-[400] max-w-[193.867px]'>  MAIN: (361) 257-2012
                                        </p>


                                    </div>
                                    <div className=' flex gap-2 items-center text-white mt-4'>
                                        <RiRecordCircleFill />
                                        <p className='text-white text-[15px] font-[400] max-w-[193.867px]'>  CUSTOMER SERVICE: (361) 257-2012 ext 3
                                        </p>

                                    </div>
                                </div>
                            </div>


                            <div>
                                <h1 className='text-[18px] font-[600] text-white '> Quick Links</h1>

                                <Link to={'/'} className='text-white text-[15px] font-[400] max-w-[193.867px] mt-2 cursor-pointer'>  Home
                                </Link>
                                <br />
                                <Link to={'/contact-us'} className='text-white text-[15px] font-[400] max-w-[193.867px] mt-2 cursor-pointer'>  Contact Us
                                </Link>

                            </div>

                        </div>
                        <div className='border-[1.2px] border-gray-400  mt-10 rounded-full ' />
                        <div className="flex justify-between mt-6 max-md:flex-col max-md:gap-6">
                            <h1 className='text-white text-[14.706px] font-[700]'>© 2024 Tutorhive   All rights reserved.</h1>
                            <div className='ml-auto flex gap-6 '>
                            <h1 className='text-white text-[14.706px] font-[700] cursor-pointer'>Terms of Service</h1>
                            <h1 className='text-white text-[14.706px] font-[700] cursor-pointer'>Privacy Policy</h1>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer
