import { Button, Form, Input, message } from 'antd'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { SiFacebook } from 'react-icons/si'
import book from '../../assets/books.png'
import Signup2 from './Signup2'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance'
const Signup = () => {

    const [step, setStep] = useState(true)
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [formData, setFormData] = useState()
    const [loading , setLoading] = useState(false)

    const handlGetClicked = (value) => {
        setStep(value)
        console.log('value of the clicked', value)
    }

    const handleSubmit = () => {
        const data = form.getFieldsValue()
        console.log('data', data)
        setFormData(data)
        handlGetClicked(false)


    }

    const handlSignup = async (data) => {
        setLoading(true)
        console.log('final data', data)
        const finalData = { ...formData, ...data, sendVerification: true , verificationType: 'otp' }

        
        try {
            const response = await axiosInstance.post('/auth/email/register', finalData)
            console.log('response', response)
            setLoading(false)
            console.log('response?.data?.id', response?.data?.user?.id);
            
            // navigate('/auth/login')
            navigate(`/auth/otp/?id=${response?.data?.user?.id}`)
            message.success('Signup successful')
            console.log('response', response)
        }
        catch (error) {
            console.log('error', error)
            setLoading(false)
            const errorMessages = {
                email: "Email already exists. Please use a different email address.",
                phone: "Phone number already registered. Please use a different number.", 
                firstName: "Invalid first name provided.",
                lastName: "Invalid last name provided.",
                university: "Invalid university name provided."
                
            };

            const errors = error?.response?.data?.errors;
            let hasDisplayedError = false;

            for (const field in errorMessages) {
                if (errors?.[field]) {
                    message.error(field === 'email' && errors[field] !== 'emailExists' 
                        ? error?.response?.data?.message 
                        : errorMessages[field]);
                    hasDisplayedError = true;
                    break;
                }
            }

            if (!hasDisplayedError) {
                message.error(error?.response?.data?.message || "Something went wrong. Please try again.");
            }
        }

    }



    return (
        <div className='flex justify-center items-center min-h-screen bg-primary1'>

            {step ?
                <div className='bg-secondary2 px-10 py-6 rounded-xl shadow-md shadow-secondary2 lg:min-w-[500px]'>
                    <div className='flex justify-between my-6'>
                        <div >
                            <h1 className='font-[700] text-black text-[1.5rem]'>Sign up for and Account </h1>
                            <p className='text-[13px] font-[500]'>Enter your details for sign up.</p>
                        </div>
                        <h1 className='font-[700] text-black text-[2rem]'>1<span className='text-[1rem]'>/2 </span></h1>
                    </div>

                    <Form form={form} onFinish={handleSubmit}>
                        <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Your Name</h1>
                            <Form.Item name={'firstName'} rules={[{ required: true, message: 'Please enter your first name' }]} >
                                <Input className='border rounded-xl py-[10px] pl-4 mt-[4px]' placeholder='Enter your first name' />
                            </Form.Item>
                        </div>
                        <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Your Last Name</h1>
                            <Form.Item name={'lastName'} rules={[{ required: true, message: 'Please enter your last name' }]} >
                                <Input className='border rounded-xl py-[10px] pl-4 mt-[4px]' placeholder='Enter your last name' />
                            </Form.Item>
                        </div>
                        <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Your Email</h1>
                            <Form.Item name={'email'} rules={[{ required: true, message: 'Please enter your email' }, {
                                type: 'email',
                                message: 'Please enter a valid email',
                            }]} >
                                <Input className='border rounded-xl py-[10px] pl-4 mt-[4px]' placeholder='Enter your email' />
                            </Form.Item>
                        </div>
                        <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Your university</h1>
                            <Form.Item name={'university'} rules={[{ required: true, message: 'Please enter your university' }]} >
                                <Input className='border rounded-xl py-[10px] pl-4 mt-[4px]' placeholder='Enter your university' />
                            </Form.Item>
                        </div>
                        <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Your Phone Number</h1>
                            <Form.Item name={'phone'} rules={[{ required: true, message: 'Please enter your phone number' }]} >
                                <Input className='border rounded-xl py-[10px] pl-4 mt-[4px]' type='number' placeholder='Enter your phone number' />
                            </Form.Item>
                        </div>

                        <div>
                            <Form.Item>
                                <button className='w-full !bg-primary1 hover:!bg-sky-400 font-[600]   rounded-md py-2 ' htmlType='submit'>
                                    <h1 className='text-white font-[600] '  >Next</h1>
                                </button>
                            </Form.Item>
                        </div>
                    </Form>

                    <h1 className='text-center font-semibold mt-4'>Already have account? <span className='text-primary1 cursor-pointer' onClick={() => navigate('/auth/login')}>Log in </span></h1>

                    <div className='flex justify-center gap-4 mt-4 items-center bg-white py-2 rounded-xl cursor-pointer hover:bg-gray-200'>
                        <SiFacebook color='#1877F2' />
                        <h1 className='text-sm font-semibold '>Sign in with Facebook</h1>
                    </div>
                    <div className='flex justify-center gap-4 mt-4 items-center bg-white py-2 rounded-xl cursor-pointer hover:bg-gray-200'>
                        <FcGoogle />
                        <h1 className='text-sm font-semibold '>Sign in with Google</h1>
                    </div>
                </div> :

                <Signup2 setClicked={handlGetClicked} setFinalData={handlSignup} loading={loading} />
            }

            <img src={book} className='absolute hidden lg:block bottom-0 right-0' alt="" />


        </div>
    )
}

export default Signup
