import { Button, Form, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { SiFacebook } from 'react-icons/si'
import otp from '../../assets/otp.png'
import { LuUser2 } from 'react-icons/lu'
import { RiKey2Line } from 'react-icons/ri'
import { FaLock } from 'react-icons/fa'
import { TbMessageDots } from 'react-icons/tb'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance'

const OTP = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [otpValue, setOtpValue] = useState('')
    const [loading, setLoading] = useState(false)

    const params = new URLSearchParams(location.search)
    const email = params?.get('email')
    const id = params?.get('id')
    console.log('id', id);

    const [userData, setUserData] = useState({})

    const onChange = (text) => {
        console.log('onChange:', text);
        setOtpValue(text)
    };

    const sharedProps = {
        onChange,
    };

    // const fetchUserByEmail = async () => {

    //     try {
    //         const response = await axiosInstance.post(`/users/fetch-user-by-email`, { email: email })
    //         console.log('response of get user by email', response.data);
    //         setUserData(response.data)
    //     }
    //     catch (error) {
    //         console.error('Error fetching user by email:', error.response ? error.response.data : error.message);
    //     }
    // }

    // useEffect(() => {
    //     fetchUserByEmail()
    // }, [])

    console.log('otpValue', otpValue);


    const handleSubmit = async () => {
        setLoading(true)
        if (otpValue.length < 4) {
            message.error('Please enter a valid OTP')
            setLoading(false)
            return
            
        }
        try {
            const response = await axiosInstance.post('/auth/email/confirm', { verificationCode4: otpValue, userId: id })
            // navigate(`/auth/change-password/?email=${email}`)
            console.log('response asdfsdf', response);
            if (response?.data?.token) {
                localStorage.setItem('tutor_token', response.data?.token)
                localStorage.setItem('tutor_refreshToken', response.data?.refreshToken)
                localStorage.setItem('tutor_user', JSON.stringify(response.data?.user))
                localStorage.setItem('login', 'true')

                navigate('/')
            }

            setLoading(false)
        }
        catch (error) {
            console.error('Error verifying otp:', error.response);
            setLoading(false)
            message.error(error.response ? error.response.data.error : error.message)
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-primary1'>

            <div className='bg-secondary2 px-10 py-6 rounded-xl shadow-md shadow-secondary2 lg:min-w-[500px]'>
                <div className='flex justify-center'>
                    <div className='bg-sky-200 p-[4px]  rounded-full' >
                        <div className='bg-sky-300 p-[4px] rounded-full'>
                            <div className='bg-primary1 p-4 rounded-full'>
                                <TbMessageDots size={30} color='white' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mb-6'>
                    <h1 className='font-semibold text-2xl text-center mt-4 '>Enter OTP</h1>
                    <p className='text-center font-semibold text-sm  '>We sent the code to the email in {email}</p>
                </div>

                <div className='flex justify-center w-full'>
                    <Input.OTP className='w-full' length={4} size='large' formatter={(str) => str.toUpperCase()} {...sharedProps} />
                </div>
                {/* <h1 className='text-sm cursor-pointer text-primary1 font-regular text-right mt-4'>Didn't receive your code?</h1> */}


                <Button loading={loading} onClick={() => handleSubmit()} className='w-full !bg-primary1 hover:!bg-sky-400 font-[600]   rounded-xl py-[10px] mt-6' htmlType='submit'>
                    <h1 className='text-white font-[600] '  >Next</h1>
                </Button>


            </div>

            <img src={otp} className='absolute hidden lg:block bottom-0 right-0' alt="" />


        </div>
    )
}

export default OTP
