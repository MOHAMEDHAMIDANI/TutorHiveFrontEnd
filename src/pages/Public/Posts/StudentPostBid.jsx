import { useState, useEffect } from 'react';
import TopBar from '../../../components/TopBar'
import Footer from '../../../components/Footer'
import axiosInstance from '../../../api/axiosInstance'
import { useLocation, useNavigate } from 'react-router-dom'
import { Spin, message } from 'antd';
import moment from 'moment'
import axios from 'axios';

const StudentPostBid = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const params = new URLSearchParams(location.search)
    const id = params.get('id')
    const [data, setData] = useState([]) // Changed initial state to array
    const [loading, setLoading] = useState(false)

    const fetchBids = async () => {
        setLoading(true)
        try {
            const response = await axiosInstance.get(`/bids?filters={"jobId":${id}}`)
            if (response?.status === 200) {
                setData(response.data?.data)
            }
        }
        catch (error) {
            console.error('Error fetching bids:', error);
            message.error('Failed to load bids')
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) {
            fetchBids()
        }
    }, [id]) // Added id as dependency

    if(loading){
        return (
            <div className='flex justify-center items-center h-screen'>
                <Spin />
            </div>
        )
    }

    const handleAcceptBid = async (bidId) => {
     
            navigate(`/student-post/bid/booking`, {
                state: { 
                    data:  bidId
                }
            })
       
    }

    const handleRejectBid = async (bidId) => {
        try {
            await axiosInstance.patch(`/bids/${bidId}`, {
                status: 'rejected'
            })
            message.success('Bid rejected successfully')
            fetchBids() // Refresh bids after rejection
        } catch (error) {
            console.error('Error rejecting bid:', error)
            message.error('Failed to reject bid')
        }
    }

    const getChatUserByEmail = async (email) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_CHAT_APP_BACKEND_URL}/auth/get-user`, {
                email: email
            });
            return response.data;
        } catch (error) {
            console.error('Error getting chat user:', error);
            return null;
        }
    };

    const handleChatWithTutor = async (tutorEmail) => {
        try {
            const currentChatUser = JSON.parse(localStorage.getItem('chat_user'));
            if (!currentChatUser) {
                message.error('Please login first to chat with tutors');
                return;
            }

            const tutorChatUser = await getChatUserByEmail(tutorEmail);
            if (!tutorChatUser) {
                message.error('Unable to connect with tutor at the moment');
                return;
            }

            localStorage.setItem('selected_chat_user', JSON.stringify(tutorChatUser));
            navigate('/profile/chat');

            // Use the WebSocket URL from environment variables
            const ws = new WebSocket(process.env.REACT_APP_CHAT_WS_URL);
            
            ws.onopen = () => {
                ws.send(JSON.stringify({
                    type: "chat message",
                    senderId: currentChatUser.id,
                    receiverId: tutorChatUser.id,
                    content: "Hi, I'm interested in your tutoring services!"
                }));
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                message.error('Error connecting to chat');
            };

            // Close connection after sending initial message
            ws.onmessage = () => {
                ws.close();
            };

        } catch (error) {
            console.error('Error initiating chat:', error);
            message.error('Failed to start chat');
        }
    };

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='pb-20'>
                <TopBar />
            </div>
            <div className='max-w-[1501px] m-auto bg-gray-300 h-[1.3px]' />
            <div className='max-w-[1501px] m-auto'>
                {data[0]?.job && (
                    <div className='bg-gray-200 p-6 rounded-xl mt-6'>
                        <div className="flex max-md:flex-col justify-between">
                            <div className='flex gap-6 max-md:flex-col items-center'>
                                <img 
                                    src={data[0].job.image} 
                                    className='max-w-[181.777px] max-h-[211.872px] rounded-xl' 
                                    alt={data[0].job.title || "Job image"}
                                />
                                <div className='max-w-[682.484px]'>
                                    <h1 className='text-[24px] font-[600]'>{data[0].job.title}</h1>
                                    <h1 className='text-[20px] font-[500]'>{data[0].job.subject}</h1>
                                    <div 
                                        className='text-[14px] font-[400]' 
                                        dangerouslySetInnerHTML={{ __html: data[0].job.description }} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className='py-10'>
                    <h1 className='text-[20px] font-[600] mb-6'>Bids</h1>
                    {data.length === 0 && !loading && (
                        <p className='text-center text-gray-500'>No bids found</p>
                    )}
                    {data?.map((value, index) => (
                        <div key={value.id || index}>
                            <div className='mt-4 flex gap-6'>
                                <img 
                                    src={value?.tutor?.photo?.path} 
                                    className='w-[39px] h-[39px] rounded-full' 
                                    alt={`${value?.tutor?.firstName || 'Tutor'}'s profile`}
                                />
                                <div className='w-full'>
                                    <div className="flex gap-4 items-center justify-between w-full">
                                        <h1 className='text-[18px] font-[600]'>
                                            {value?.tutor?.firstName} {value?.tutor?.lastName}
                                        </h1>
                                        <h1 className='text-[15px] font-[400] max-md:text-[12px]'>
                                            {moment(value?.createdAt).format('MMM DD, YYYY at hh:mm a')}
                                        </h1>
                                        <h1 className='text-[15px] font-[400] max-md:text-[12px] ml-auto'>
                                            Bid Price: <b>{value?.price}</b>
                                        </h1>
                                    </div>
                                    <p className='text-[14px] font-[400] mt-2'>{value?.proposal}</p>
                                    <div className='flex justify-end gap-4'>
                                        <button 
                                            onClick={() => handleChatWithTutor(value?.tutor?.email)}
                                            className='bg-primary1 px-6 py-[5px] rounded-xl font-[16px] text-white'
                                        >
                                            Chat
                                        </button>
                                        <button 
                                            onClick={() => handleAcceptBid(value)} 
                                            className='bg-primary1 px-6 py-[5px] rounded-xl font-[16px] text-white'
                                        >
                                            Accept
                                        </button>
                                        <button 
                                            onClick={() => handleRejectBid(value?.id)}
                                            className='bg-red-600 px-6 py-[5px] rounded-xl font-[16px] text-white'
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='border-[1px] border-gray-200 px-10 mt-4' />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default StudentPostBid
