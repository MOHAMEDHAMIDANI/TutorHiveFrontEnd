import React, { useEffect, useState } from 'react'
import TopBar from '../../../components/TopBar'
import cover from '../../../assets/bookCover.png'
import { HiDotsVertical } from 'react-icons/hi'
import Footer from '../../../components/Footer'
import PostModal from '../../../components/PostModal'
import AllPost from './AllPost'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../../api/axiosInstance'
import { Dropdown, Menu } from 'antd'
import { MdDelete, MdModeEditOutline } from 'react-icons/md'



const Posts = () => {
    const navigate = useNavigate()
    const userInfo = JSON.parse(localStorage.getItem('tutor_user'));
    const [editPost, setEditPost] = useState(false)
    const [postId, setPostId] = useState(null)

    const [selectedTab, setSelectedTab] = React.useState(userInfo?.role === 'Tutor' ? 1 : 0)
    const tabs = [
        { name: 'All Posts', value: 'all' },
        { name: 'My Posts', value: 'my' },
    ]



    const [postModal, setPostModal] = useState(false)
    const togglePostModal = () => setPostModal(!postModal)


    const [myPosts, setMyPosts] = useState([])
    const userId = Number(userInfo?.id);


    const fetchMyPosts = async () => {
        try {
            const response = await axiosInstance.get(`/posts/get-posts/${userId}`);
            if (response.status === 200) {
                setMyPosts(response.data);
            } else {
                console.error('Failed to fetch posts', response.status);
            }

            console.log('response of get posts', response.data); // Log the data

        } catch (error) {
            console.error('Error fetching posts:', error.response ? error.response.data : error.message);
        }
    };

    const updatePostLists = (data) => {
        setMyPosts([...myPosts, data])

    }


    useEffect(() => {
        fetchMyPosts()
    }, [])


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
    );


    const handleEdit = (id) => {
        console.log('Edit clicked for item with id:', id);
        setEditPost(true)
        setPostId(id)
        togglePostModal()


    };

    const handleDelete = async (id) => {
        console.log('Delete clicked for item with id:', id);
        try {
            const response = await axiosInstance.delete(`/posts/delete-post/${id}`);
            if (response.status === 200) {
                setMyPosts(myPosts.filter(item => item.id !== id));
            } else {
                console.error('Failed to delete post', response.status);
            }

            console.log('response of delete post', response.data); // Log the data

        } catch (error) {
            console.error('Error deleting post:', error.response ? error.response.data : error.message);
        }


    };

    const handleEditPost = (data) => {
        console.log('Edit post data:', data);
        setMyPosts(myPosts.map(item => item.id === data.id ? data : item))
    }

    const handleOpenPostModal = () => {
        setEditPost(false)
        setPostId(null)
        togglePostModal()
    }


    return (
        <div className='bg-gray-100 min-h-screen'>
            <PostModal open={postModal} handleCancel={togglePostModal} handleComplete={updatePostLists} edit={editPost} id={postId} handleEdit={handleEditPost} />
            <div className='pb-20'>
                <TopBar />
            </div>
            <div className='max-w-[1501px] m-auto bg-gray-300 h-[1.3px] ' />
            <section className='max-w-[1501px] m-auto '>

                <div className="flex gap-4 mt-10">
                    {tabs.map((item, index) => (
                        <div onClick={() => setSelectedTab(index)} className={` text-[16px] font-[700] ${selectedTab === index ? 'border-b-primary1 border-b-2 text-primary1 pb-2' : 'hover:border-b-primary1 border-b-2 pb-2 border-gray-100 text-black hover:text-primary1  '} cursor-pointer `}>{item.name}</div>
                    ))}
                </div>

                {selectedTab === 0 ?
                    <AllPost />
                    :
                    <div>

                        <div className="flex justify-end">
                            <button onClick={() => handleOpenPostModal()} className='bg-primary1 px-6 py-[5px] rounded-xl font-[600] font-[16px] text-white'>
                                New Post
                            </button>
                        </div>

                        <div className='pb-20'>

                            {myPosts?.length > 0 ? (
                                myPosts.map((value, index) => (
                                    <div className='bg-gray-200 p-6 rounded-xl mt-6 '>
                                        <div className="flex max-md:flex-col justify-between">
                                            <div className='flex  gap-6 max-md:flex-col items-center'>
                                                <img src={value?.image} className='lg:max-w-[181.777px] max-h-[211.872px] rounded-xl' alt="" />
                                                <div className='max-w-[682.484px]'>
                                                    <h1 className='text-[24px] font-[600]'> {value?.subject}</h1>
                                                    <h1 className='text-[14px] font-[400]' dangerouslySetInnerHTML={{ __html: value?.description }} />
                                                </div>
                                            </div>
                                            <div className="flex gap-2 max-md:ml-auto max-md:mt-10">
                                                <button onClick={() => navigate(`comments/?id=${value?.id}`)} className='bg-primary1 px-10 mb-auto rounded-xl py-[5px] font-[600] font-[16px] text-white'>
                                                    {value?.comments?.length} comments
                                                </button>
                                                <Dropdown overlay={generateMenuItems(value?.id)} trigger={['click']} placement="bottomLeft">
                                                    <HiDotsVertical className='mt-2 cursor-pointer' />
                                                </Dropdown>


                                            </div>

                                        </div>

                                    </div>
                                ))
                            )
                                :
                                <div className=' flex justify-center items-center h-[50vh] ' >
                                    <h1 className='text-[24px] font-[600] text-center mt-10'>No Posts Found</h1>

                                </div>


                            }

                        </div>
                    </div>
                }

            </section>
            <Footer />
        </div>
    )
}

export default Posts
