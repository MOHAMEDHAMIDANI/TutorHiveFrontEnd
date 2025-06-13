import { Form, Input, message, Modal } from 'antd';
import React from 'react';
import { FaLock } from 'react-icons/fa';
import axiosInstance from '../api/axiosInstance';

const NewPasswordModal = ({ open, handleDone, handleCancel }) => {
    const [form] = Form.useForm();
    const [loading , setLoading] = React.useState(false);

    const userInfo = JSON.parse(localStorage.getItem('tutor_user'));


    // Function to handle form submission
    const handleSubmit = async () => {
        setLoading(true)
        
        const data = form.getFieldsValue()
        console.log('data', data);
        try {
            const response = await axiosInstance.post('/users/update-password', { ...data, email: userInfo.email })
            console.log('response', response);
            setLoading(false)
            message.success('Password updated successfully')
            handleCancel()
        } catch (errorInfo) {
            console.error('Failed:', errorInfo);
            message.error('Please enter correct old password')
            setLoading(false)
        }
    };

    return (
        <Modal
            centered
            footer={false}
            open={open}
            onCancel={handleCancel}
            width={'548px'}
        >
            <div className='p-6'>
                <div className='flex justify-center'>
                    <div className='bg-sky-200 p-[4px] rounded-full'>
                        <div className='bg-sky-300 p-[4px] rounded-full'>
                            <div className='bg-primary1 p-4 rounded-full'>
                                <FaLock size={30} color='white' />
                            </div>
                        </div>
                    </div>
                </div>

                <h1 className='text-[24px] font-[700] mt-2 text-center'>Password Change</h1>
                <h1 className='text-[12px] text-gray-700 font-[500] text-center'>
                    Please enter your new password to get started.
                </h1>

                {/* Ant Design Form */}
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <div>
                        <h1 className='text-[12px] text-gray-700 font-[500]'>Old Password</h1>
                        <Form.Item
                            name="oldPassword"
                            rules={[{ required: true, message: 'Please enter your old password' }]}
                        >
                            <Input.Password className='border rounded-xl py-[15px]  pl-4 mt-[4px]'
                                placeholder="Enter Old Password" />
                        </Form.Item>
                    </div>

                    <h1 className='text-[16px] font-[600] my-6 '>Create New Password</h1>

                    <div>
                        <h1 className='text-[12px] text-gray-700 font-[500]'>New Password</h1>

                        <Form.Item
                            name="newPassword"
                            rules={[
                                { required: true, message: 'Please enter your new password' },
                                { min: 6, message: 'Password must be at least 6 characters long' },
                            ]}
                        >
                            <Input.Password className='border rounded-xl py-[15px]  pl-4 mt-[4px]'
                                placeholder="Enter New Password" />
                        </Form.Item>
                    </div>
                    <div>
                        <h1 className='text-[12px] text-gray-700 font-[500]'>Confirm Password</h1>


                        <Form.Item
                            name="confirmPassword"
                            dependencies={['newPassword']}
                            rules={[
                                { required: true, message: 'Please confirm your new password' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Passwords do not match'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password className='border rounded-xl py-[15px]  pl-4 mt-[4px]'
                                placeholder="Confirm New Password" />
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <button
                            className='bg-primary1 py-2 rounded-lg w-full text-white mt-6'
                            htmlType="submit"
                        >
                            Change Password
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default NewPasswordModal;
