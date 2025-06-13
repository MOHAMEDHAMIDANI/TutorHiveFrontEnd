import { Button, Form, Input, message } from 'antd'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { SiFacebook } from 'react-icons/si'
import book from '../../assets/books.png'
import { LuUser2 } from 'react-icons/lu'
import { RiKey2Line } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance'
import { signInWithGoogle } from '../../firebase'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';


const Login = () => {

    const [step, setStep] = useState(1)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    // const handleSignIn = async () => {
    //     try {
    //         const result = await signInWithGoogle();
    //         //   setUser(result.user);
    //         console.log('her eis the result', result);

    //         if (result?.user) {
    //             const response = await axiosInstance.post('/auth/google/login', { idToken: result.user?.uid })
    //             console.log('responsesdsd', response)
    //             // if (response?.data?.token) {
    //             //     localStorage.setItem('tutor_token', response.data?.token)
    //             //     localStorage.setItem('tutor_refreshToken', response.data?.refreshToken)
    //             //     localStorage.setItem('tutor_user', JSON.stringify(response.data?.user))

    //             //     navigate(response?.data?.user?.role?.name === 'Tutor' ? '/how-works' : '/')
    //             //     localStorage.setItem('login', 'true')
    //             //     message.success('Login Successful')
    //             //     setLoading(false)
    //             // }
    //             // else {
    //             //     message.error('Login failed')
    //             //     setLoading(false)
    //             // }
    //         }

    //     } catch (error) {
    //         console.error(error);
    //     }
    // };


    const handleSignIn = useGoogleLogin({
        onSuccess: async (tokenResponse) => {

            console.log('token response', tokenResponse);

            try {
                // Send ID token to your backend for authentication
                const response = await axiosInstance.post('/auth/google/login', {
                    idToken: tokenResponse.access_token, // Use access_token as idToken
                });

                console.log("Server Response:", response.data);
                if (response?.data?.token) {
                    localStorage.setItem('tutor_token', response.data?.token)
                    localStorage.setItem('tutor_refreshToken', response.data?.refreshToken)
                    localStorage.setItem('tutor_user', JSON.stringify(response.data?.user))
    
                    navigate(response?.data?.user?.role?.name === 'Tutor' ? '/how-works' : '/')
                    localStorage.setItem('login', 'true')
                    message.success('Login Successful')
                    setLoading(false)
                }
            } catch (error) {
                console.error("Error sending token to backend:", error);
            }
        },
        onError: (error) => console.error("Login Failed:", error),
    });


    const responseFacebook = async (fbResponse) => {
        console.log('Facebook login response:', fbResponse);
      
        try {
          // Send ID token to your backend for authentication
          const backendResponse = await axiosInstance.post('/auth/facebook/login', {
            accessToken: fbResponse.accessToken,
          });

          if (backendResponse?.data?.token) {
            localStorage.setItem('tutor_token', backendResponse.data?.token)
            localStorage.setItem('tutor_refreshToken', backendResponse.data?.refreshToken)
            localStorage.setItem('tutor_user', JSON.stringify(backendResponse.data?.user))

            navigate(backendResponse?.data?.user?.role?.name === 'Tutor' ? '/how-works' : '/')
            localStorage.setItem('login', 'true')
            message.success('Login Successful')
            setLoading(false)
        }
      
          console.log("Server Response:", backendResponse.data);
        } catch (error) {
          console.error("Error sending token to backend:", error);
        }
      };
      


    const saveChatUser = async (chatUser) => {
        try {
            // Save chat user info to localStorage
            localStorage.setItem('chat_user', JSON.stringify(chatUser));
            
            // Register user with WebSocket server
            const ws = new WebSocket('ws://localhost:8000');
            
            ws.onopen = () => {
                ws.send(JSON.stringify({
                    type: "register",
                    userId: chatUser.id,
                    username: chatUser.username
                }));
            };
            
            // Close WebSocket after registration
            setTimeout(() => ws.close(), 1000);
            
        } catch (error) {
            console.error('Error saving chat user:', error);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await axiosInstance.post('/auth/google/login', {
                idToken: credentialResponse.credential,
            });
            
            if (response?.data?.token) {
                // Save auth data
                localStorage.setItem('tutor_token', response.data?.token);
                localStorage.setItem('tutor_refreshToken', response.data?.refreshToken);
                localStorage.setItem('tutor_user', JSON.stringify(response.data?.user));
                localStorage.setItem('login', 'true');

                // Save chat user if available
                if (response.data?.chatUser) {
                    await saveChatUser(response.data.chatUser);
                }

                navigate(response?.data?.user?.role?.name === 'Tutor' ? '/how-works' : '/');
                message.success('Login Successful');
                setLoading(false);
            }
        } catch (error) {
            console.error("Error sending token to backend:", error);
            message.error('Login failed');
            setLoading(false);
        }
    };

    const onFinish = async () => {
        setLoading(true);
        const data = form.getFieldsValue();

        try {
            const response = await axiosInstance.post('/auth/email/login', data);
            
            if (response?.data?.token) {
                // Save auth data
                localStorage.setItem('tutor_token', response.data?.token);
                localStorage.setItem('tutor_refreshToken', response.data?.refreshToken);
                localStorage.setItem('tutor_user', JSON.stringify(response.data?.user));
                localStorage.setItem('login', 'true');

                // Save chat user if available
                if (response.data?.chatUser) {
                    await saveChatUser(response.data.chatUser);
                }

                navigate(response?.data?.user?.role?.name === 'Tutor' ? '/how-works' : '/');
                message.success('Login Successful');
            } else {
                message.error('Login failed');
            }
        } catch (error) {
            console.log('error', error);
            message.error('Login failed');
        } finally {
            setLoading(false);
        }
    };

    // Helper function to get chat user by email
    const getChatUserByEmail = async (email) => {
        try {
            const response = await axios.post(`${process.env.CHAT_APP_BACKEND_URL}/auth/users`, {
                email: email
            });
            return response.data;
        } catch (error) {
            console.error('Error getting chat user:', error);
            return null;
        }
    };

    // Function to send chat message
    const sendChatMessage = (receiverId, content) => {
        const chatUser = JSON.parse(localStorage.getItem('chat_user'));
        if (!chatUser) {
            console.error('Chat user not found in localStorage');
            return;
        }

        const ws = new WebSocket('ws://localhost:8000');
        
        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "chat message",
                senderId: chatUser.id,
                receiverId: receiverId,
                content: content
            }));
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Close connection after sending message
        ws.onmessage = () => {
            ws.close();
        };
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-primary1'>

            <div className='bg-secondary2 px-10 py-6 rounded-xl shadow-md shadow-secondary2 lg:min-w-[500px]'>
                <div className='flex justify-between my-6'>
                    <div >
                        <h1 className='font-[700] text-black text-[1.5rem]'>Sign you in.</h1>
                        <p className='text-[13px] font-[500]'>Access your personalize learning dashboard</p>
                        <p className='text-[13px] font-[500]'>and course materials</p>
                    </div>
                </div>

                <Form onFinish={onFinish} form={form}
                // initialValues={{email: 'abubakar.4983763@gmail.com', password: 'password'}}
                >
                    <div>
                        <h1 className='text-[12px] text-gray-700 font-[500]'>Email Address</h1>
                        <Form.Item name={'email'} rules={[{ required: true, message: 'Please enter your email' }, {
                            type: 'email',
                            message: 'Please enter a valid email',
                        }]} >
                            <Input prefix={<LuUser2 size={23} className='text-gray-700 pr-2' />} className='border rounded-xl py-[10px] pl-4 mt-[4px]' placeholder='Enter your email' />
                        </Form.Item>
                    </div>
                    <div>
                        <h1 className='text-[12px] text-gray-700 font-[500]'>Password</h1>
                        <Form.Item name={'password'} rules={[{ required: true, message: 'Please enter your password' }]} >
                            <Input.Password prefix={<RiKey2Line size={23} className='text-gray-700 pr-2' />} className='border rounded-xl py-[10px] pl-4 mt-[4px]' placeholder='Enter your password' />
                        </Form.Item>
                    </div>


                    <div>
                        <Form.Item>

                            <Button loading={loading} className='w-full !bg-primary1 hover:!bg-sky-400 font-[600]   rounded-md py-[10px]' htmlType='submit'>
                                <h1 className='text-white font-[600] '  >Login</h1>
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
                <h1 className='!text-left text-[14px] mt-6 text-primary1 font-semibold cursor-pointer' onClick={() => navigate('/auth/forgot')}>Forgot Password?</h1>
                <h1 className='!text-left text-[14px] mt-2 text-black    font-semibold cursor-pointer'>Don't have account? <span className='text-primary1' onClick={() => navigate('/auth/signup')}>Sign up</span></h1>

                {/* <div className='flex justify-center gap-4 mt-4 items-center bg-white py-2 rounded-xl cursor-pointer hover:bg-gray-200'>
                    <SiFacebook color='#1877F2' size={26} />
                    <h1 className='text-sm font-semibold '>Sign in with Facebook</h1>
                </div> */}

                <FacebookLogin
                    appId="1310888433462008" // Replace with your actual Facebook App ID
                    autoLoad={false}             // Set to true if you want to auto-trigger the login prompt
                    fields="name,email,picture"  // Request the user's name, email, and picture
                    callback={responseFacebook}  // Callback function when login is complete
                    scope="public_profile,email"  // Explicitly request both public_profile and email
                    textButton={<p className='mr-auto text-sm text-gray-800 '>Login with Facebook</p>} // Custom button text
                    icon={ <SiFacebook color='#1877F2' size={20} className='mr-auto' />}    
                    cssClass="flex justify-center gap-4 mt-4 items-center bg-white py-2 rounded-[6px] mb-2 p-2 cursor-pointer border hover:bg-sky-50 hover:border-blue-100 w-full"      // Optional: add an icon if you have FontAwesome loaded
                />

                {/* <div onClick={() => handleSignIn()} className='flex justify-center gap-4 mt-4 items-center bg-white py-2 rounded-xl cursor-pointer hover:bg-gray-200'>
                    <FcGoogle size={26} />
                    <h1 className='text-sm font-semibold '>Sign in with Google</h1>
                </div> */}
                
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    useOneTap
                />

            </div>

            <img src={book} className='absolute hidden lg:block bottom-0 right-0' alt="" />


        </div>
    )
}

export default Login
