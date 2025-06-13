import { useEffect, useState } from 'react';
import TopBar from '../../components/TopBar'
import banner from '../../assets/bannerBack.png'
import FilterCourse from '../../components/FilterCourse'
import ItemsSlider from '../../components/ItemsSlider'

import user from '../../assets/tp1.png'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance'
import { Spin } from 'antd'




const RecentPost = () => {

    const navigate = useNavigate()

    const [recentPosts, setRecentPosts] = useState([])
    const [loading, setLoading] = useState(false)

    const getRecentPosts = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get('/jobs/new');
            if (response.status === 200) {
                setRecentPosts(response.data.data)
            }
        } catch (error) {
            console.error('Error fetching recent posts:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (value) => {
        console.log('handle search', value);
    }


    useEffect(() => {
        getRecentPosts();
    }, [])


    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Spin spinning={loading} size='large' />
            </div>
        )
    }

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='pb-20'>
                <TopBar />
            </div>
            <div
                style={{
                    background: 'linear-gradient(to bottom, #7db9e8, #d0e7ff)',
                }}
                className='max-w-[1501px] m-auto rounded-xl relative'
            >
                <div
                    style={{ backgroundImage: `url(${banner})` }}
                    className='p-10 bg-cover bg-center rounded-xl '
                >
                    <div className='flex justify-center items-center min-h-[367.038px]'>
                        <div>
                            <h1 className='text-[56px] font-[600] max-md:text-[37px] text-center'>
                                Recent <span className='font-[400]'> Post</span>
                            </h1>
                            <p className='text-[16px] max-md:text-[14px] font-[300] text-center'>A Comprehensive, Step-by-Step Process Designed to Effortlessly Connect You with</p>
                            <p className='text-[16px] max-md:text-[14px] font-[300] text-center'> Your Ideal Tutor, Tailored to Help You Achieve Your Unique Academic Goals
                            </p>
                        </div>

                    </div>

                </div>
            </div>
            <div className='-mt-[5rem] max-md:mt-4 relative z-30 lg:max-w-[1350px] m-auto'>
                <FilterCourse fitlerPost={true} handleSubmit={handleSearch} />
            </div>

            <div className='max-w-[1400px] m-auto'>
                <h1 className='text-[22px] font-[500] mt-4 mb-4'>Announcements</h1>
                <ItemsSlider />
                <h1 className='text-[22px] font-[500] mt-4 mb-4'>Recent Post</h1>

                {recentPosts?.length === 0 && (
                    <div className='flex justify-center items-center py-12'>
                        <h1 className='text-[16px] font-[600]'>No Recent Post</h1>
                    </div>
                )}

                <div className="grid grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 gap-6 mt-10 pb-20">
                    {recentPosts.map((item, index) => (
                        <div className={` bg-white rounded-xl    shadow-md shadow-gray-100 relative`}>
                            <div className=' '>
                                <img src={item.image} alt="" className=' object-cover w-full max-h-[172px]    m-auto rounded-xl  ' />

                                <div className='p-4'>
                                    <div className='flex gap-2'>
                                        <img src={item.postedBy?.photo?.path} alt="" className='w-[39.7px] h-[39.7px] rounded-full' />
                                        <div>
                                            <h1 className='text-[16px] font-[600]'>{item.postedBy?.firstName} {item.postedBy?.lastName}</h1>
                                            <h1 className='text-[10px] font-[200]'>{item.postedBy?.role?.name}</h1>
                                        </div>
                                    </div>
                                    <h1 className={`text-black text-[16px] font-[600] my-2`}>Description</h1>
                                    <p className={`text-black text-[14px]   font-[400]`} dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                    {/* <div className='border-[1px] rounded-l-full rounded-r-full border-gray-400 max-w-[293px] my-4 m-auto' /> */}
                                    <div className="flex justify-between mt-4">
                                        <div>
                                            <h1 className='text-[16px] font-[600]'>Subject </h1>
                                            <h1 className='text-[10px] font-[400]'>{item.subject}</h1>
                                        </div>
                                        <div>
                                            <h1 className='text-[16px] font-[600]'>Availability </h1>
                                            <div className='text-[10px] font-[400] flex flex-col gap-1'>
                                                {item.availableTimes.map((time, index) => (
                                                    <span key={index}>{time}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h1 className='text-[16px] font-[600]'>Grade Level </h1>
                                            <h1 className='text-[10px] font-[400]'>{item.gradeLevel}</h1>
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <button onClick={() => navigate(`bids/?id=${item.id}`)} className='bg-primary1 text-white px-6 py-2 rounded-xl mt-4'>
                                            Bid Now
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>



            </div>
            <Footer />


        </div>
    )
}

export default RecentPost
