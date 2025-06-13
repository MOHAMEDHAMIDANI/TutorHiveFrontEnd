import { Form, Input, Upload, message, Spin } from 'antd';
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { PlusOutlined } from '@ant-design/icons';

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const userDetail = JSON.parse(localStorage.getItem('tutor_user'));
    const [userInfo, setUserInfo] = useState();
    const [profileImage, setProfileImage] = useState(null);

    const fetchUserByEmail = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/users/${userDetail?.id}`)
            const userData = response?.data;
            console.log('userDatasdsdsds', userData);
            setUserInfo(userData);
            if (userData) {
                form.setFieldsValue({
                    name: userData.firstName || '',
                    middle_name: userData.middle_name || '',
                    last_name: userData.lastName || '',
                    phone: userData.phone || '',
                    interests: userData.interest || [],
                    university: userData.university || '',
                    email: userData.email || '',
                    goals: userData.goal || [],
                });
                setProfileImage(userData.photo?.path);
            }
            setLoading(false);
        } catch (error) {
            console.log('Error fetching user:', error);
            message.error('Failed to fetch user details');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserByEmail();
    }, []);

    if (loading) {
        return (
            <div className='flex justify-center items-center h-[70vh] bg-white px-20 max-md:px-4 py-10 rounded-xl w-full'>
                <Spin size='large' />
            </div>
        )
    }

    return (
        <div className='w-full flex-0.7'>
            <h1 className='text-[20px] font-[700] mb-2'>Profile</h1>
            <div className='bg-white px-20 max-md:px-4 py-10 rounded-xl w-full'>
                <div className='flex justify-center -mt-[4rem] '>
                    <div>
                    <Upload
                            name="avatar"
                            listType="picture-circle"
                            disabled={true}
                        >
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt={userInfo?.name}
                                    className='rounded-full object-cover w-[90px] h-[90px]'
                                />
                            ) : (
                                <PlusOutlined />
                            )}
                        </Upload>

                        <h1 className='text-[18px] font-[700] text-center mb-4 -ml-4'>{userInfo?.name}</h1>
                    </div>
                </div>

                <Form
                    form={form}
                    // onFinish={onFinish}
                    layout="vertical" // Makes the labels appear above the input fields
                >
                         <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>First Name</h1>

                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Please enter your first name' }]}
                            >
                                <Input className='border rounded-xl py-[15px]  pl-4 mt-[4px]' disabled placeholder="Enter First Name" />
                            </Form.Item>
                        </div>
                        
                   

                    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6 mt-2">
                        <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Last Name</h1>

                            <Form.Item
                                name="last_name"
                                rules={[{ required: true, message: 'Please enter your last name' }]}
                            >
                                <Input className='border rounded-xl py-[15px]  pl-4 mt-[4px]' disabled placeholder="Enter Last Name" />
                            </Form.Item>
                        </div>
                        <div>

                            <h1 className='text-[12px] text-gray-700 font-[500]'>Phone</h1>

                            <Form.Item
                                name="phone"
                                rules={[{ required: true, message: 'Please enter your phone number' }]}
                            >
                                <Input className='border rounded-xl py-[15px]  pl-4 mt-[4px]' disabled placeholder="Enter Phone Number" />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6 mt-2">
                        
                    <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Email</h1>

                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please enter your email', type: 'email' }]}
                            >
                                <Input className='border rounded-xl py-[15px]  pl-4 mt-[4px]' disabled placeholder="Enter Email" />
                            </Form.Item>
                        </div>
                        <div>

                            <h1 className='text-[12px] text-gray-700 font-[500]'>University</h1>

                            <Form.Item
                                name="university"
                                rules={[{ required: true, message: 'Please enter your university' }]}
                            >
                                <Input className='border rounded-xl py-[15px]  pl-4 mt-[4px]' disabled placeholder="Enter University" />
                            </Form.Item>
                        </div>
                    </div>

                     
                    {/* <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Update Profile
                        </Button>
                    </Form.Item> */}
                </Form>
            </div>
        </div>
    );
};

export default Profile;
