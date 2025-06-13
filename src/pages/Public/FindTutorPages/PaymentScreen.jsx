import React from 'react'
import TopBar from '../../../components/TopBar'
import visa from '../../../assets/visa.png'
import master from '../../../assets/master.png'
import { Form, Input } from 'antd'
import cartItem from '../../../assets/sub3.png'
import Footer from '../../../components/Footer'
import PaymentForm from './PaymentForm'

import { useNavigate } from 'react-router-dom'

const PaymentScreen = () => {
    const navigate = useNavigate()


    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='pb-20'>
                <TopBar />
            </div>
            <div className='max-w-[1501px] m-auto bg-gray-300 h-[1.3px] ' />

            <div className='max-w-[1301px] m-auto pb-10'>
                <div className="grid grid-cols-2 max-md:grid-cols-1  gap-6 mt-10">
                   <PaymentForm/>
                    <section>
                        <div className='bg-primary1 p-6 rounded-xl text-white'>
                            <h1 className='text-[22px] font-[700] text-white'>Cart</h1>
                            <div className="flex justify-between items-center mt-4">
                                <div className="flex gap-2 items-center">
                                    <img src={cartItem} className='w-[84px] h-[84px] rounded-xl' alt="" />
                                    <div>
                                        <h1 className='text-[16px] font-[700]'>Data Structures algorithms</h1>
                                        <h1 className='text-[14px] font-[400]'>It is a long established fact...</h1>
                                    </div>
                                </div>
                                <div>
                                    <h1 className='text-[16px] font-[700]'>120$</h1>
                                </div>

                            </div>

                            <div className='border-[1px] border-white mt-4' />
                            <div>
                                <h1 className='text-[22px] font-[700] text-white mt-4'>Order Summary</h1>
                                <div className="flex justify-between mt-4">
                                    <h1 className='text-[16px] font-[500]'>Sab Total:</h1>
                                    <h1 className='text-[16px] font-[500]'>120$</h1>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <h1 className='text-[16px] font-[500]'>Estimeted Text:</h1>
                                    <h1 className='text-[16px] font-[500]'>--</h1>
                                </div>

                                <div className='border-[1px] border-white mt-4' />

                                <div className="flex justify-between mt-4">
                                    <h1 className='text-[22px] font-[700] text-white'>Estimated Order Total:</h1>
                                    <h1 className='text-[22px] font-[700] text-white'>120$</h1>
                                </div>
                            </div>

                            {/* <button className='w-full bg-white rounded-md py-2 text-primary1 font-[500] text-[16px] text-primary1 mt-4'>
                                Schedule Meeting
                            </button> */}


                        </div>

                        {/* <div className='bg-white border-[1px]  p-6 rounded-xl text-black mt-6'>
                            <h1 className='text-[22px] font-[700] '>Order Summary</h1>


                            <div>
                                <div className="flex justify-between mt-4">
                                    <h1 className='text-[16px] font-[500]'>Sab Total:</h1>
                                    <h1 className='text-[16px] font-[500]'>120$</h1>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <h1 className='text-[16px] font-[500]'>Estimeted Shipping Handle:</h1>
                                    <h1 className='text-[16px] font-[500]'>--</h1>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <h1 className='text-[16px] font-[500]'>Estimeted Text:</h1>
                                    <h1 className='text-[16px] font-[500]'>--</h1>
                                </div>

                                <div className='border-[1px] border-black mt-4' />

                                <div className="flex justify-between mt-4">
                                    <h1 className='text-[22px] font-[700] '>Estimated Order Total:</h1>
                                    <h1 className='text-[22px] font-[700] '>120$</h1>
                                </div>
                            </div>

                            <button onClick={() => navigate('success')} className='w-full bg-primary1 rounded-md py-2 text-white font-[500] text-[16px]  mt-4'>
                                Continue
                            </button>


                        </div> */}


                    </section>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default PaymentScreen
