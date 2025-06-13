import { Button, Form, Input, message } from 'antd'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { SiFacebook } from 'react-icons/si'
import book from '../../assets/books.png'
import TutorSignup2 from './TutorSignup2'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance'
const TutorSignup = () => {

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
        const finalData = { ...formData, ...data , role:'Tutor' }
        
        try {
            const response = await axiosInstance.post('/auth/signup', finalData)
            console.log('response', response)
            setLoading(false)
            navigate('/auth/login')  
            message.success('Signup successful')
        }
        catch (error) {
            console.log('error', error)
            setLoading(false)
            message.error(error?.response?.data?.message)
        }

    }



    return (
        <div className='flex justify-center items-center min-h-screen bg-primary1'>

            {step ?
                <div className='bg-secondary2 px-10 py-6 rounded-xl shadow-md shadow-secondary2 lg:min-w-[500px]'>
                    <div className='flex justify-between my-6'>
                        <div >
                            <h1 className='font-[700] text-black text-[1.5rem]'>Sign up as Tutor </h1>
                            <p className='text-[13px] font-[500]'>Enter your details for sign up.</p>
                        </div>
                        <h1 className='font-[700] text-black text-[2rem]'>1<span className='text-[1rem]'>/2 </span></h1>
                    </div>

                    <Form form={form} onFinish={handleSubmit}>
                        <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Your Name</h1>
                            <Form.Item name={'name'} rules={[{ required: true, message: 'Please enter your name' }]} >
                                <Input className='border rounded-xl py-[10px] pl-4 mt-[4px]' placeholder='Enter your name' />
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
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Your Qualifications</h1>
                            <Form.Item name={'university'} rules={[{ required: true, message: 'Please enter your qualifications' }]} >
                                <Input className='border rounded-xl py-[10px] pl-4 mt-[4px]' placeholder='Enter your qualifications' />
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

                <TutorSignup2 setClicked={handlGetClicked} setFinalData={handlSignup} loading={loading} />
            }

            <img src={book} className='absolute hidden lg:block bottom-0 right-0' alt="" />


        </div>
    )
}

export default TutorSignup
