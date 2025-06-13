import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RatingModal from '../../components/RatingModal';
import axiosInstance from '../../api/axiosInstance';
import moment from 'moment';



const BookSession = () => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const navigate = useNavigate()
    const [ratingModal, setRatingModal] = useState(false)
    const toggleRatingModal = () => setRatingModal(!ratingModal)
    const [loading, setLoading] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)

    console.log('currentPage', currentPage);
    


    const points = [
        'All',
        'Upcoming',
        'Cancel',
        'Completed'
    ]
    const [bookSessionData, setBookSessionData] = useState([])
    const [showNextPage, setShowNextPage] = useState(false)


    const getBookSessionData = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get('/bookings/booked-by-me')
            setBookSessionData(response?.data?.data)
            setShowNextPage(response?.data?.hasNextPage)

        } catch (error) {
            console.error('Error fetching bookings:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleChangePage = async (value) => {
        try {
            setLoading(true)
            const response = await axiosInstance.get(`/bookings/booked-by-me?page=${value ? currentPage + 1 : currentPage - 1}`)
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

    const columns = [
        {
            title: 'Tutor',
            render: (data) => <div className='cursor-pointer' onClick={() => navigate(`detail?id=${data?.id}`)}>
                <div className='flex items-center gap-2'>
                    <img src={data?.tutor ?  data?.tutor?.photo?.path : data?.service?.user?.photo?.path} alt='tutor' className='w-[40px] h-[40px] rounded-full' />
                    <div>
                        <h1>{data?.tutor ? data?.tutor?.firstName : data?.service?.user?.firstName} {data?.tutor ?  data?.tutor?.lastName : data?.service?.user?.lastName}</h1>
                        <h1 className='text-gray-400'>{data?.tutor ? data?.tutor?.email : data?.service?.user?.email}</h1>
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
            title: 'Status',
            render: (data) => {
                const statusColors = {
                    upcoming: 'text-blue-500 border-blue-500',
                    completed: 'text-green-500 border-green-500',
                    cancelled: 'text-red-500 border-red-500',
                    pending: 'text-yellow-500 border-yellow-500'
                }
                const status = data?.bookingStatus.toLowerCase()
                return (
                    <div className='flex items-center gap-2'>
                        <button className={`${statusColors[status]} border-[1px] rounded-full px-6 py-2`}>
                            {data?.bookingStatus}
                        </button>
                        {data?.bookingStatus === 'completed' && (
                            <button onClick={() => {
                                setSelectedBooking(data)
                                toggleRatingModal()
                            }} className='bg-primary1 text-white rounded-full px-6 py-2'>
                                Review
                            </button>
                        )}
                    </div>
                )
            },
        },
    ];


    return (
        <div className='w-full flex-0.7'>
            <RatingModal open={ratingModal} handleCancel={toggleRatingModal} data={selectedBooking} />



            <div className='bg-white px-6 py-10 rounded-xl w-full'>
                <div className="flex gap-6">
                    {points.map((item, index) => (
                        <h1 className={`${selectedIndex === index ? 'text-primary1 ' : 'hover:text-primary1'} font-[600] text-[16px] max-md:text-[12px] cursor-pointer `} onClick={() => setSelectedIndex(index)}>
                            {item}
                        </h1>
                    ))}
                </div>
                <div className='mt-6'>
                    <Table
                        size='small'
                        scroll={{ x: 920 }}
                        columns={columns}
                        dataSource={filteredData()}
                        loading={loading}
                        pagination={false}
                    />
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

        </div>
    )
}

export default BookSession
