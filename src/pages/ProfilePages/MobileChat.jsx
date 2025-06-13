import { Input } from 'antd'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaVideo } from 'react-icons/fa6'
import { IoIosArrowBack, IoIosArrowDown, IoIosSend } from 'react-icons/io'
import { IoCall, IoSearchOutline } from 'react-icons/io5'
import person from '../../assets/tp1.png'

const MobileChat = ({ selectedChat , setSelectedPoint , setSelectedChat , chat , selectePoint , points }) => {
    return (
        <div>
            <div className='md:hidden block'>
                {!selectedChat ?
                    <div className='bg-white rounded-xl px-6 py-10 lg:min-w-[313px] w-full' >
                        <Input prefix={<IoSearchOutline />} className='w-full py-2 focus:outline-none py-2' placeholder='Search People' />
                        <div className="flex gap-2 mt-4">
                            {points.map((item, index) => (
                                <button onClick={() => setSelectedPoint(index)} className={`${selectePoint === index ? 'bg-primary1 text-white ' : 'bg-transparent '}  rounded-lg px-4 py-[5px] text-[9.671px]`}>
                                    {item}
                                </button>
                            ))}
                        </div>
                        <div className='mt-6'>

                            {Array(5).fill().map((item, index) => (
                                <div onClick={() => setSelectedChat(index)} className={`${selectedChat === index ? 'bg-primary1 text-white' : 'bg-white'} rounded-xl cursor-pointer mt-2 py-2 px-4 flex justify-between`}>
                                    <div className="flex items-center gap-2">
                                        <div className='relative border-[2px] border-white rounded-full'>
                                            <img src={person} className='max-w-[39px] max-h-[39px] rounded-full' alt="" />
                                            <div className='bg-[#25B003] w-2 h-2 rounded-full ml-auto -mt-2' />
                                        </div>
                                        <div>
                                            <h1 className='text-[14px] font-[500]'>Natali Craig</h1>
                                            <h1 className='text-[9.91px] font-[400]'>Lorem Ipsum is simply dummy...</h1>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    :

                    <div className='bg-white rounded-xl px-6 py-4 w-full'>

                        <div onClick={() => setSelectedChat(null)} className='flex gap-2 items-center mb-4'>
                            <IoIosArrowBack className='cursor-pointer' />
                            Back

                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <h1 className='text-[16px] font-[700]'>Natali Craig</h1>
                                <IoIosArrowDown />
                                <div className="flex items-center gap-[5px]">
                                    <div className='w-2 h-2 rounded-full bg-[#25B003]' />
                                    <h1 className='text-[9.25px] font-[400]'>Acitve Now</h1>
                                </div>
                            </div>

                            <div className='flex gap-2'>
                                <div className='bg-gray-50 rounded-lg p-[5px]'>
                                    <IoCall className='text-primary1' />
                                </div>
                                <div className='bg-gray-50 rounded-lg p-[5px]'>
                                    <FaVideo className='text-primary1' />
                                </div>
                                <div className='bg-primary1 rounded-lg p-[5px]'>
                                    <BsThreeDotsVertical className='text-white' />
                                </div>

                            </div>
                        </div>

                        <div className='mt-4 max-h-[500px] overflow-y-auto'>

                            {chat.map((item, index) => (
                                <div>
                                    {item.icon ?
                                        <div className='flex gap-2 mt-2'>
                                            <img src={person} className='max-w-[39px] max-h-[39px] rounded-full' alt="" />
                                            <div className='bg-gray-100  rounded-xl px-4 py-2'>
                                                <h1 className='text-right text-[7.333px] font-[700]'>8:12</h1>
                                                <p className='text-[12px] font-[400] max-w-[451px]' >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, wLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown. </p>
                                            </div>
                                        </div>
                                        :
                                        <div className='flex  mt-2 justify-end'>

                                            <div className='bg-primary1  rounded-xl px-4 py-2'>
                                                <h1 className='text-right text-[7.333px] text-white font-[700]'>8:12</h1>
                                                <p className='text-[12px] font-[400] max-w-[451px] text-white' >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, wLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown. </p>
                                            </div>
                                        </div>
                                    }

                                </div>
                            ))}

                        </div>
                        <div className='border-[1px] border-gray-200 px-10 mt-10' />
                        <div className="flex justify-between my-4 items-center">
                            <input type="text" placeholder='Type your message' className='focus:outline-none border-none w-full bg-transparent' />
                            <IoIosSend className='cursor-pointer hover:text-primary1' />
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}

export default MobileChat
