import { Button, Form, Input, message } from 'antd';
import password from '../../assets/password.png'
import { FaLock } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

const ChangePassword = () => {

    const navigate = useNavigate()
    const [form] = Form.useForm()
    const location = useLocation()

    const params = new URLSearchParams(location.search)
    const email = params.get('email')

    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        const data = form.getFieldsValue()
        try {
            const response = await axiosInstance.post('/auth/reset/password', { password:data?.confirm_password, email: email, verificationCode4:data?.verificationCode4 , verificationType:'otp', hash:'string' })
            console.log('response of change password', response.data);
            if (response.data?.done) {
                navigate('/auth/login')
                setLoading(false)
                message.success('Password changed successfully')
            }
            setLoading(false)
        }
        catch (error) {
            console.error('Error sending change password:', error.response  );
            setLoading(false)
            message.error(error.response ? error.response.data.message : error.message)
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-primary1'>

            <div className='bg-secondary2 px-10 py-6 rounded-xl shadow-md shadow-secondary2 lg:min-w-[500px]'>
                <div className='flex justify-center'>
                    <div className='bg-sky-200 p-[4px]  rounded-full' >
                        <div className='bg-sky-300 p-[4px] rounded-full'>
                            <div className='bg-primary1 p-4 rounded-full'>
                                <FaLock size={30} color='white' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mb-6'>
                    <h1 className='font-semibold text-2xl text-center mt-4 '>Here you Go!</h1>
                    <p className='text-center  text-sm font-semibold '>please enter your new password to get started</p>
                </div>

                <Form form={form} onFinish={handleSubmit}>
                    <div>
                        <h1 className='text-[12px] text-gray-700 font-[500]'>Enter OTP</h1>
                        <Form.Item name={'verificationCode4'} rules={[{ required: true, message: 'Please enter your OTP' }]} >
                            <Input.OTP
                                length={4}
                                className='border rounded-xl py-[10px] pl-4 mt-[4px]' />
                        </Form.Item>
                    </div>
                    <div>
                        <h1 className='text-[12px] text-gray-700 font-[500]'>New password</h1>
                        <Form.Item name={'password'} rules={[{ required: true, message: 'Please enter your password' }]} >
                            <Input.Password
                                className='border rounded-xl py-[10px] pl-4 mt-[4px]' placeholder='Enter your email' />
                        </Form.Item>
                    </div>
                    <div>
                        <h1 className='text-[12px] text-gray-700 font-[500]'>Confirm password</h1>
                        <Form.Item name={'confirm_password'} dependencies={['password']}
                            rules={[
                                { required: true, message: 'Please confirm your password' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords do not match!'));
                                    },
                                }),
                            ]}>
                            <Input.Password
                                className='border rounded-xl py-[10px] pl-4 mt-[4px]' placeholder='Enter confirm password' />
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item>
                            <Button loading={loading} className='w-full !bg-primary1 hover:!bg-sky-400 font-[600]   rounded-xl py-[10px]' htmlType='submit'>
                                <h1 className='text-white font-[600] '  >Change Password</h1>
                            </Button>
                        </Form.Item>
                    </div>
                </Form>

            </div>

            <img src={password} className='absolute hidden lg:block bottom-0 right-0' alt="" />


        </div>
    )
}

export default ChangePassword
