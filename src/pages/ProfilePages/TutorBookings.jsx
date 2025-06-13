import { Button, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RatingModal from '../../components/RatingModal';
import axiosInstance from '../../api/axiosInstance';
import moment from 'moment';



const TutorBooking = () => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const navigate = useNavigate()
    const [ratingModal, setRatingModal] = useState(false)
    const toggleRatingModal = () => setRatingModal(!ratingModal)
    const [loading, setLoading] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [submitLoading, setSubmitLoading] = useState(false)


    // const points = [
    //     'All',
    //     'Upcoming',
    //     'Cancel',
    //     'Completed'
    // ]
    const [bookSessionData, setBookSessionData] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [showNextPage, setShowNextPage] = useState(false)

    const handleChangePage = async (value) => {
        try {
            setLoading(true)
            const response = await axiosInstance.get(`/bookings/booked-by-others?page=${value ? currentPage + 1 : currentPage - 1}`)
            setBookSessionData(response?.data?.data)

            setShowNextPage(response?.data?.hasNextPage)
            setCurrentPage(value ? currentPage + 1 : currentPage - 1)
        }
        catch (error) {
            console.error('Error fetching bookings:', error)
        } finally {
            setLoading(false)
        }
    }



    const getBookSessionData = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get('/bookings/booked-by-others')
            setBookSessionData(response?.data?.data)
        } catch (error) {
            console.error('Error fetching bookings:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getBookSessionData()
    }, [])

    const filteredData = () => {
        if (selectedIndex === 0) return bookSessionData

        const statusMap = {
            1: 'upcoming',
            2: 'cancelled',
            3: 'completed'
        }

        return bookSessionData.filter(item =>
            item.bookingStatus.toLowerCase() === statusMap[selectedIndex]
        )
    }


    const handleCompleteSession = async (id) => {
        console.log(id)
        setSubmitLoading(true)
        try {
            const response = await axiosInstance.get(`bookings/${id}/complete`)
            console.log('response' , response)
            getBookSessionData()
            setSubmitLoading(false)
            
        } catch (error) {
            console.error('Error completing session:', error)
            setSubmitLoading(false)
        }

    }

    const columns = [
        {
            title: 'Student',
            render: (data) => <div >
                <div className='flex items-center gap-2'>
                    <img src={data?.bookedBy?.photo?.path} alt='tutor' className='w-[40px] h-[40px] rounded-full' />
                    <div>
                        <h1>{data?.bookedBy?.firstName} {data?.bookedBy?.lastName}</h1>
                        <h1 className='text-gray-400'>{data?.bookedBy?.email}</h1>
                    </div>
                </div>
            </div>,
        },
        {
            title: 'Date',
            render: (data) => <h1>{moment(data?.date).format('DD/MM/YYYY')}</h1>
        },
        {
            title: 'Time',
            render: (data) => <h1>{data?.fromTime} - {data?.toTime}</h1>
        },
        {
            title: 'Subject',
            render: (data) => <h1>{data?.service?.title || '-'}</h1>
        },
        {
            title: 'Session Type',
            render: (data) => <h1>{data?.type}</h1>
        },
        {
            title: 'Booking Status',
            render: (data) => {
                
                return (
                    <div className='flex items-center gap-2'>
                        <button onClick={() => {
                            data?.bookingStatus !== 'completed' && handleCompleteSession(data?.id)
                        }} className={`  border-[1px] rounded-full px-6 py-2 hover:bg-primary1 hover:text-white hover:border-primary1`}>
                             {data?.bookingStatus === 'completed' ? 'Completed' : 'Complete Session'}
                        </button>

                    </div>
                )
            },
        },
    ];


    return (
        <div className='w-full flex-0.7'>



            <div className='bg-white px-6 py-10 rounded-xl w-full'>
                {/* <div className="flex gap-6">
                    {points.map((item, index) => (
                        <h1 className={`${selectedIndex === index ? 'text-primary1 ' : 'hover:text-primary1'} font-[600] text-[16px] max-md:text-[12px] cursor-pointer `} onClick={() => setSelectedIndex(index)}>
                            {item}
                        </h1>
                    ))}
                </div> */}
                <div className='mt-6'>
                    <Table
                        size='small'
                        scroll={{ x: 920 }}
                        columns={columns}
                        dataSource={filteredData()}
                        loading={loading || submitLoading}
                        pagination={false}
                    />
                </div>

                <div className='flex mt-4 justify-end gap-2'>
                        {currentPage > 1 &&
                        
                            <Button type='default' onClick={() =>  handleChangePage(false)} >
                                Previous
                            </Button>
                        }
                        {showNextPage &&
                            <Button type='primary' onClick={() => handleChangePage(true) }>
                                Next
                            </Button>
                        }

                    </div>

            </div>

        </div>
    )
}

export default TutorBooking
