import { useState, useEffect } from 'react';
import TopBar from '../../../components/TopBar'
import banner from '../../../assets/bannerBack.png'
import ItemsSlider from '../../../components/ItemsSlider'
import { HiDotsVertical } from 'react-icons/hi'
import { Dropdown, Menu } from 'antd'
import { MdDelete, MdModeEditOutline } from 'react-icons/md'
import PostModal from '../../../components/PostModal'
import axiosInstance from '../../../api/axiosInstance'

import Footer from '../../../components/Footer'
import { useNavigate } from 'react-router-dom'
import { Spin } from 'antd';

const StudentPost = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [postModal, setPostModal] = useState(false)
    const [editPost, setEditPost] = useState(false)
    const [postId, setPostId] = useState(null)
    const userInfo = JSON.parse(localStorage.getItem('tutor_user'))
    const [loading, setLoading] = useState(false)

    const togglePostModal = () => setPostModal(!postModal)

    const fetchPosts = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get('/jobs/my-jobs')

            console.log('response of my jobs', response.data)
            if (response.data?.data) {
                setPosts(response.data.data)
            }
            setLoading(false)
        } catch (error) {
            console.error('Error fetching posts:', error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const handleOpenPostModal = () => {
        setEditPost(false)
        setPostId(null)
        togglePostModal()
    }


    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Spin size="large" />
            </div>
        )
    }

    const generateMenuItems = (id) => (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <div className='flex gap-2 text-blue-600 items-center' onClick={() => handleEdit(id)}>
                            <MdModeEditOutline />
                            Edit
                        </div>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <div className='flex gap-3 text-red-600 items-center' onClick={() => handleDelete(id)}>
                            <MdDelete />
                            Delete
                        </div>
                    ),
                },
            ]}
        />
    )

    const handleEdit = (id) => {
        setEditPost(true)
        setPostId(id)
        togglePostModal()
    }

    const handleDelete = async (id) => {
        try {
            const response = await axiosInstance.delete(`jobs/${id}`)
            if (response.status === 200) {
                setPosts(posts.filter(post => post.id !== id))
            }
        } catch (error) {
            console.error('Error deleting post:', error)
        }
    }

    const updatePostLists = (data) => {
        setPosts([...posts, data])
    }

    const handleEditPost = (data) => {
        setPosts(posts.map(post => post.id === data.id ? data : post))
    }

    return (
        <div className='bg-gray-100 min-h-screen'>
            <PostModal
                open={postModal}
                handleCancel={togglePostModal}
                handleComplete={updatePostLists}
                edit={editPost}
                id={postId}
                handleEdit={handleEditPost}
            />
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

            <div className='max-w-[1400px] m-auto'>
                <h1 className='text-[22px] font-[500] mt-4 mb-4'>Announcements</h1>
                <ItemsSlider />
                <h1 className='text-[22px] font-[500] mt-4 mb-4'>Recent Post</h1>

                <div>
                    <div className="flex justify-end">
                        <button onClick={handleOpenPostModal} className='bg-primary1 px-6 py-[5px] rounded-xl font-[16px] text-white'>
                            New Post
                        </button>
                    </div>

                    <div className='pb-20'>
                        {posts?.length > 0 ? (
                            posts.map((value, index) => (
                                <div key={index} className='bg-gray-200 p-6 rounded-xl mt-6'>
                                    <div className="flex max-md:flex-col justify-between">
                                        <div className='flex gap-6 max-md:flex-col items-center'>
                                            <img src={value?.image} className='lg:max-w-[181.777px] max-h-[211.872px] rounded-xl' alt="" />
                                            <div className='max-w-[682.484px]'>
                                                <h1 className='text-[24px] font-[600]'>{value?.title}</h1>
                                                <h1 className='text-[20px] font-[500]'>{value?.subject}</h1>
                                                <h1 className='text-[14px] font-[400]' dangerouslySetInnerHTML={{ __html: value?.description }} />
                                            </div>
                                        </div>
                                        <div className="flex gap-2 max-md:ml-auto max-md:mt-10">
                                            <button onClick={() => navigate(`bid/?id=${value?.id}`)} className='bg-primary1 px-10 mb-auto rounded-xl py-[5px] font-[600]  text-white'>
                                                Bids
                                            </button>
                                            {/* {userInfo?.id === value?.user_id && ( */}
                                            <Dropdown overlay={generateMenuItems(value?.id)} trigger={['click']} placement="bottomLeft">
                                                <HiDotsVertical className='mt-2 cursor-pointer' />
                                            </Dropdown>
                                            {/* )} */}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='flex justify-center items-center h-[50vh]'>
                                <h1 className='text-[24px] font-[600] text-center mt-10'>No Posts Found</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default StudentPost
