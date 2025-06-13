import { Button, Checkbox, Form, Input, Select } from 'antd'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { SiFacebook } from 'react-icons/si'
import { FaArrowLeft } from 'react-icons/fa'


const Signup2 = ({ setClicked , setFinalData , loading}) => {

    const [form] = Form.useForm()

    const handleDone = async () => {
        const data = form.getFieldsValue()
        console.log('data', data)
        setFinalData(data)
    }


    return (
        <div className='flex justify-center items-center min-h-screen bg-primary1'>
            <div className='bg-secondary2 px-10 py-6 rounded-xl shadow-md shadow-secondary2 max-w-[500px]'>
                <FaArrowLeft className="mt-2 cursor-pointer " onClick={() => setClicked(true)} />
                <div className='flex justify-between my-6'>
                    <div >
                        <h1 className='font-[700] text-black text-[1.5rem]'>Sign up for and Account </h1>
                        <p className='text-[13px] font-[500]'>Enter your details for sign up.</p>
                    </div>
                    <h1 className='font-[700] text-black text-[2rem]'>2<span className='text-[1rem]'>/2 </span></h1>
                </div>

                <Form form={form} onFinish={handleDone}>
                    <div>
                        <h1 className='text-[12px] text-gray-700 font-[500]'>Select Interest</h1>
                        <Form.Item name={'interests'} rules={[{ required: true, message: 'Please select your interest' }]} >
                            <Select
                                mode="multiple"
                                showSearch
                                placeholder="Select interest"
                                className="min-h-10 rounded-xl"
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
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
                    <div className='mt-[-5px]'>
                        <h1 className='text-[12px] text-gray-700 font-[500]'>Your Goal</h1>
                        <Form.Item name={'goals'} rules={[{ required: true, message: 'Please enter your goal' }]} >
                            <Select
                                mode="multiple"
                                showSearch
                                placeholder="Select goal"
                                className="min-h-10 rounded-xl"
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
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
                    <div>
                        <h1 className='text-[12px] text-gray-700 font-[500]'>Your Password</h1>
                        <Form.Item name={'password'} rules={[{ required: true, message: 'Please enter your password' } ,  { min: 7, message: 'Password must be at least 7 characters long' },]} >
                            <Input.Password className='border rounded-xl py-[10px] ] pl-4 mt-[4px]' placeholder='Enter your password' />
                        </Form.Item>
                    </div>
                    <div className='flex gap-2 max-w-[450px] mb-6'>
                        {/* <Form.Item name={'terms'} className='absolute ' rules={[{ required: true, message: 'Please accept terms and conditions' }]} > */}
                        <Checkbox />
                        {/* </Form.Item> */}

                        <h1 className='text-sm font-semibold max-md:text-[12px]'>Protected by reCAPTCHA and subject to the Google <span className='text-primary1'> Privacy Policy </span> and  <span className='text-primary1'>Terms of Service. </span></h1>


                    </div>

                    <div>
                        <Form.Item>
                            <Button loading={loading} className='w-full !bg-primary1 font-[600]   rounded-md py-2 ' htmlType='submit'>
                                <h1 className='text-white font-[600] '  >Sign up</h1>
                            </Button>
                        </Form.Item>
                    </div>
                </Form>


            </div>




        </div>
    )
}

export default Signup2
