import { Button, Form, Input } from 'antd';
import forgot from '../../assets/forgot.png'
import { FaLock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance';
import { useState } from 'react';

const Forgot = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [form] = Form.useForm()

    const handleSubmit = async () => {
        setLoading(true)
        const data = form.getFieldsValue()
        try {
            const response = await axiosInstance.post('/auth/forgot/password', {...data , sendVerification:true , verificationType:'otp' })
            console.log('response of forgot password', response.data);
            if (response.data.done) {
                navigate('success/?email=' + data.email)
                setLoading(false)
            }
            setLoading(false)
        }
        catch (error) {
            console.error('Error sending forgot password:', error.response ? error.response.data : error.message);
            setLoading(false)
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
                    <h1 className='font-semibold text-2xl text-center mt-4 '>Forgot Password</h1>
                    <p className='text-center font-[400] text-lg '>Enter your email address for get password</p>
                </div>

                <Form form={form} onFinish={handleSubmit}>
                    <div>
                        <h1 className='text-[12px] text-gray-700 font-[500]'>Email Address</h1>
                        <Form.Item name={'email'} rules={[{ required: true, message: 'Please enter your name' }, {
                            type: 'email',
                            message: 'Please enter a valid email',
                        }]} >
                            <Input
                                // prefix={<LuUser2 size={23} className='text-gray-700 pr-2' />}
                                className='border rounded-xl py-[10px] pl-4 mt-[4px]' placeholder='Enter your email' />
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item>
                            <Button loading={loading} className='w-full !bg-primary1 hover:!bg-sky-400 font-[600]   rounded-xl py-[10px]' htmlType='submit'>
                                <h1 className='text-white font-[600] '  >Next</h1>
                            </Button>
                        </Form.Item>
                    </div>
                </Form>

            </div>

            <img src={forgot} className='absolute hidden lg:block bottom-0 right-0' alt="" />


        </div>
    )
}

export default Forgot
