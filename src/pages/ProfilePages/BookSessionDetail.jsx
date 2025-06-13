import React, { useEffect, useState } from 'react'
import { BsShieldFillCheck } from 'react-icons/bs'
import { IoIosStar } from 'react-icons/io'
import tutor from '../../assets/tp1.png'
import { FaInstagram } from 'react-icons/fa'
import book from '../../assets/bookCover.png'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import axiosInstance from '../../api/axiosInstance'
import { Spin } from 'antd'
import BookingGoogleMeet from '../../components/BookingGoogleMeet'

const BookSessionDetail = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const [loading, setLoading] = useState(false)

    const [state, setState] = useState()

    const params = new URLSearchParams(location.search)

    const id = params.get('id')


    const getBookSessionData = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get(`/bookings/${id}`)
            console.log('response', response);
            
            setState(response?.data)
        } catch (error) {
            console.error('Error fetching bookings:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getBookSessionData()
    }, [])

    if (loading) {
        return <div className='flex justify-center items-center h-[50dvh]'>
            <Spin size='large' />
        </div>
    }

    return (
        <div className='py-20'>
            <div className='max-w-[1200px] mx-auto px-4'>
                <h1 className='text-[20px] font-[700] mb-2'>Session History</h1>
                <div className='bg-white px-6 py-10 rounded-xl w-full'>
                    <div className="flex max-md:flex-wrap items-center gap-6 justify-between mb-4 p-6 border-[1px] rounded-lg ">
                        <div className="flex max-md:flex-wrap items-center gap-6">
                            <div>
                                <img src={state?.service?.user?.photo?.path} className='rounded-full w-[75.376px] h-[75.376px]' alt="" />
                            </div>
                            <div>
                                <h1 className='font-[600] text-[18px] flex items-center'>{state?.service?.user?.firstName} {state?.service?.user?.lastName}
                                </h1>
                                <p className='text-[14px] font-[400]'>Joined In {moment(state?.service?.user?.createdAt).format('YYYY')}
                                </p>
                            </div>
                        </div>
                        <div className='border-l-[1.5px] border-gray-400 h-10' />
                        <div>
                            <h1 className='flex items-center gap-[2px] text-[16px] font-[700]'>Session</h1>
                            <h1 className='text-[14px] font-[400] mt-2'>
                                {state?.type}
                            </h1>
                        </div>
                        <div className='border-l-[1.5px] border-gray-400 h-10' />
                        <div>
                            <h1 className='text-[16px] font-[700]'>
                                Price
                            </h1>
                            <h1 className='text-[14px] font-[400]'>{state?.service?.price}</h1>
                        </div>
                        <div className='border-l-[1.5px] border-gray-400 h-10' />
                        <div>
                            <h1 className='text-[16px] font-[700]'>
                                Time
                            </h1>
                            <h1 className='text-[14px] font-[400]'>{state?.fromTime} to {state?.toTime}</h1>
                        </div>
                        <div className='border-l-[1.5px] border-gray-400 h-10' />
                        <div>
                            <h1 className='text-[16px] font-[700]'>
                                Date
                            </h1>
                            <h1 className='text-[14px] font-[400]'>{moment(state?.date).format('DD/MM/YYYY')}</h1>
                        </div>
                    </div>

                    <div className="flex max-md:flex-col gap-6 mt-10">
                        <div>
                            <img src={state?.service?.image?.path || book} className='rounded-xl lg:max-w-[379.494px] lg:max-h-[377.494px]' alt="" />
                        </div>
                        <div>
                            <h1 className='max-w-[457px] font-[500] text-[34px]'>{state?.service?.title}</h1>
                            <h1 className='flex items-center gap-[2px] text-[16px] font-[300] mt-4 '>{Array(4).fill().map((_, index) => <IoIosStar key={index} size={16} className={`text-primary1`} />)} 4.0</h1>
                            <h1 className='text-[18px] font-[500] mt-4'>Description</h1>
                            <h1 className='text-[16px] font-[600] mt-2 max-w-[675.246px]' dangerouslySetInnerHTML={{ __html: state?.service?.description }} />
                            
                            {/* Google Meet Component */}
                            <BookingGoogleMeet 
                                bookingId={id} 
                                tutorId={state?.tutorId}
                            />
                            
                            <div className="flex max-md:flex-col-reverse max-md:gap-0 gap-6 mt-4">
                                <button className='bg-white border-[1px] border-primary1 px-10 font-[700] text-primary1 rounded-xl py-2 mt-4'>
                                    Cancel Booking
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookSessionDetail
