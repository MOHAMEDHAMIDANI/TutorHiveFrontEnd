import { Button, Form, Input, Select, Spin, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { MdEdit } from 'react-icons/md';
import { PlusOutlined } from '@ant-design/icons';

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const userDetail = JSON.parse(localStorage.getItem('tutor_user'));
    const [userInfo, setUserInfo] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [finishLoading, setFinishLoading] = useState(false);
    const [uploadLoading, setUplodingLoading] = useState(false);

    const fetchUserByEmail = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/users/${userDetail?.id}`)
            const userData = response?.data;
            setUserInfo(userData);
            if (userData) {
                form.setFieldsValue({
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                    phone: userData.phone || '',
                    interests: userData.interests || [],
                    university: userData.university || '',
                    email: userData.email || '',
                    goals: userData.goals || [],
                });
                setImageUrl(userData.photo?.path);
            }
            setLoading(false);
        } catch (error) {
            message.error('Failed to fetch user details');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserByEmail();
    }, []);

    const handleImageChange = async ({ file }) => {
        setUplodingLoading(true)
        try {
            // Preview image immediately
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);

            // Upload image immediately
            const formData = new FormData();
            formData.append('file', file);

            const uploadResponse = await axiosInstance.post('/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (uploadResponse.status === 201) {
                setUploadedImage(uploadResponse.data);
                const response = await axiosInstance.patch(`/users`, {
                    photo: {
                        id: uploadResponse?.data?.file?.id
                    }
                });
                console.log('response', response);
                
                message.success('Image uploaded successfully');
                setUplodingLoading(false)
            }
        } catch (error) {
            message.error('Failed to upload image only jpg, jpeg, png files are allowed');
            console.error('Upload error:', error);
            setUplodingLoading(false)
        }
    };

    const onFinish = async () => {
        const data = form.getFieldsValue();
        setFinishLoading(true);

        console.log('uploadedImage', uploadedImage);


        try {
            const response = await axiosInstance.patch(`/users`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                localStorage.setItem('tutor_user', JSON.stringify(response.data));
                message.success('Profile updated successfully');
            }
        } catch (error) {
            message.error('Failed to update profile');
            console.error('Update error:', error);
        } finally {
            setFinishLoading(false);
        }
    };

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
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={handleImageChange}

                        >
                            {imageUrl ? (
                                <div className='relative'>
                                    <img
                                        src={imageUrl}
                                        alt={userInfo?.name}
                                        className='rounded-full object-cover w-[90px] h-[90px]'
                                    />
                                    {uploadLoading ? (
                                        <div className='absolute top-0 left-0  bg-black bg-opacity-50 rounded-full w-[90px] h-[90px] flex justify-center items-center'>
                                            <Spin />
                                        </div>
                                    ) : null}
                                </div>
                            ) : (
                                <PlusOutlined />
                            )}
                        </Upload>
                        <h1 className='text-[18px] font-[700] text-center mb-4 -ml-6'>{userInfo?.name}</h1>
                    </div>
                </div>

                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <div>
                        <h1 className='text-[12px] text-gray-700 font-[500]'>First Name</h1>
                        <Form.Item
                            name="firstName"
                            rules={[{ required: true, message: 'Please enter your first name' }]}
                        >
                            <Input className='border rounded-xl py-[15px]  pl-4 mt-[4px]' placeholder="Enter First Name" suffix={<MdEdit />} />
                        </Form.Item>
                    </div>


                    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6 mt-2">
                        <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Last Name</h1>
                            <Form.Item
                                name="lastName"
                                rules={[{ required: true, message: 'Please enter your last name' }]}
                            >
                                <Input className='border rounded-xl py-[15px]  pl-4 mt-[4px]' placeholder="Enter Last Name" suffix={<MdEdit />} />
                            </Form.Item>
                        </div>
                        <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Phone</h1>
                            <Form.Item
                                name="phone"
                                rules={[{ required: true, message: 'Please enter your phone number' }]}
                            >
                                <Input className='border rounded-xl py-[15px]  pl-4 mt-[4px]' placeholder="Enter Phone Number" suffix={<MdEdit />} />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6 mt-2">
                        <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Interest</h1>
                            <Form.Item
                                name="interests"
                                rules={[{ required: true, message: 'Please select your interests' }]}
                            >
                                <Select
                                    mode="multiple"
                                    className='rounded-xl mt-[4px] h-14'
                                    placeholder="Select Interests"
                                    options={[
                                        { value: 'mathematics', label: 'Mathematics' },
                                        { value: 'physics', label: 'Physics' },
                                        { value: 'chemistry', label: 'Chemistry' },
                                        { value: 'biology', label: 'Biology' },
                                        { value: 'computer_science', label: 'Computer Science' },
                                        { value: 'literature', label: 'Literature' },
                                        { value: 'history', label: 'History' },
                                        { value: 'geography', label: 'Geography' }
                                    ]}
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>University</h1>
                            <Form.Item
                                name="university"
                                rules={[{ required: true, message: 'Please enter your university' }]}
                            >
                                <Input className='border rounded-xl py-[15px]  pl-4 mt-[4px]' placeholder="Enter University" suffix={<MdEdit />} />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6 mt-2">
                        <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Email</h1>
                            <Form.Item
                                name="email"
                            >
                                <Input className='border rounded-xl py-[15px]  pl-4 mt-[4px]' disabled placeholder="Enter Email" suffix={<MdEdit />} />
                            </Form.Item>
                        </div>
                        <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Goal</h1>
                            <Form.Item
                                name="goals"
                                rules={[{ required: true, message: 'Please select your goals' }]}
                            >
                                <Select
                                    mode="multiple"
                                    className='rounded-xl mt-[4px] h-14'
                                    placeholder="Select Goals"
                                    options={[
                                        { value: 'improve_grades', label: 'Improve Grades' },
                                        { value: 'exam_preparation', label: 'Exam Preparation' },
                                        { value: 'skill_development', label: 'Skill Development' },
                                        { value: 'homework_help', label: 'Homework Help' },
                                        { value: 'concept_clarity', label: 'Concept Clarity' },
                                        { value: 'career_guidance', label: 'Career Guidance' }
                                    ]}
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6 items-center">
                        <div className='flex gap-6 items-center'>
                            {/* <button className='border border-primary1 px-8 py-2 rounded-xl text-primary1'>
                                Cancel
                            </button> */}
                            <button
                                htmlType="submit"
                                disabled={finishLoading}
                                className="bg-primary1 text-white px-8 py-2 rounded-xl"
                            >
                                {finishLoading ? <Spin /> : 'Change Save'}
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Profile;
