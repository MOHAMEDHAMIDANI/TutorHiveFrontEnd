import React from 'react'
import TopBar from '../components/TopBar'
import grids from '../assets/contact-grid.png'
import contactImage from '../assets/contact.png'
import { Input } from 'antd'
import Footer from '../components/Footer'

const ContactUs = () => {
    return (
        <div className='bg-gray-100 '>
            <div className='pb-20'>
                <TopBar />
            </div>
            <div className='max-w-[1501px] m-auto bg-gray-300 h-[1.3px] ' />
            <div style={{ backgroundImage: `url(${grids})` }} className='py-20 max-h-[1353px]'>
                <div className='lg:max-w-[1201px] m-auto'>
                    <div className="grid grid-cols-2  max-md:grid-cols-1 gap-10">
                        <div className='relative'>
                            <div className="flex justify-end  h-full ">
                                <div className='bg-white rounded-xl p-6 w-full lg:w-[275.825px] mt-auto h-[230.773px] px-8 z-20'>
                                    <h1 className='text-[23px] font-[600]'>Get in Touch</h1>
                                    <div className='ml-6 max-md:ml-0'>
                                        <h1 className='text-[14px] font-[500] mt-4'>+23-3333 4444</h1>
                                        <h1 className='text-[14px] font-[500] mt-2'>infor@gmail.com</h1>
                                        <h1 className='text-[14px] font-[500] mt-2'>Egypt,Cairo,6 October</h1>
                                    </div>
                                    <div className='m-auto bg-primary1 px-4 h-[1.3px] mt-4 mb-10' />
                                </div>
                            </div>
                            <div className='border-8 max-md:hidden border-primary1 rounded-full absolute top-2 z-10'>
                                <img src={contactImage} alt="" className='max-w-[420px] h-[420px]' />
                            </div>
                        </div>

                        <div className='bg-white rounded-xl p-6 px-10 ml-20 max-md:ml-0'>
                            <h1 className='text-[23px] font-[600]'>Send us Message</h1>
                            <div className='mt-6'>
                                <h1 className='text-[12px] text-gray-700 font-[500]'>Name</h1>
                                <Input className='border rounded-xl py-[10px] ] pl-4 mt-[4px]' placeholder='Enter Name' />
                            </div>
                            <div className='mt-2'>
                                <h1 className='text-[12px] text-gray-700 font-[500]'>Email</h1>
                                <Input className='border rounded-xl py-[10px] ] pl-4 mt-[4px]' placeholder='Enter Email' />
                            </div>
                            <div className='mt-2'>
                                <h1 className='text-[12px] text-gray-700 font-[500]'>Subject</h1>
                                <Input className='border rounded-xl py-[10px] ] pl-4 mt-[4px]' placeholder='Enter Subject' />
                            </div>
                            <div className='mt-2'>
                                <h1 className='text-[12px] text-gray-700 font-[500]'>Message</h1>
                                <textarea className='border rounded-xl py-[10px] ] pl-4 mt-[4px] w-full min-h-[143.841px]' placeholder='Enter Message' />
                            </div>
                            <button className='mt-6 py-2 bg-primary1 text-white w-full rounded-xl font-[500] items-center'>
                                Send
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />

        </div>
    )
}

export default ContactUs
