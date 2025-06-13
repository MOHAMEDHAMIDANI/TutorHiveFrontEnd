import React from 'react'
import subject1 from '../../../assets/sub1.png'
import subject2 from '../../../assets/sub2.png'
import subject3 from '../../../assets/sub3.png'
import subject4 from '../../../assets/sub4.png'
import { IoIosStar } from 'react-icons/io'
import user from '../../../assets/tp1.png'
import { useNavigate } from 'react-router-dom'

const subjects = [
    {
        name: 'SQL and Relational Theory', detail: 'It is a long established fact that a reader will be distracted by the readable It is a long established fact that a reader will be distracted by the readable It is a long established.',
        image: subject1,
    },
    {
        name: 'Database Management Systems', detail: 'It is a long established fact that a reader will be distracted by the readable It is a long established fact that a reader will be distracted by the readable It is a long established.',
        image: subject2,
    },
    {
        name: 'The Master and Margarita', detail: 'It is a long established fact that a reader will be distracted by the readable It is a long established fact that a reader will be distracted by the readable It is a long established.',
        image: subject3,
    },
    {
        name: 'Pride and Prejudice', detail: 'It is a long established fact that a reader will be distracted by the readable It is a long established fact that a reader will be distracted by the readable It is a long established.',
        image: subject4,
    },
]

const AllPost = () => {

    return (
        <div>

            <div className="grid grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 gap-6 mt-10 pb-20">
                {subjects.map((item, index) => (
                    <div className={` bg-white rounded-xl    shadow-md shadow-gray-100 relative`}>
                        <div className=' '>
                            <img src={item.image} alt="" className=' object-cover w-full   rounded-xl m-auto rounded-xl  ' />

                            <div className='p-4'>
                                <div className='flex gap-2'>
                                    <img src={user} alt="" className='w-[39.7px] h-[39.7px] rounded-full' />
                                    <div>
                                        <h1 className='text-[16px] font-[600]'>Alex John</h1>
                                        <h1 className='text-[10px] font-[200]'>Alex John</h1>
                                    </div>
                                </div>
                                <h1 className={`text-black text-[16px] font-[600] my-2`}>Description</h1>
                                <p className={`text-black text-[14px]   font-[400]`}>{item.detail}</p>
                                {/* <div className='border-[1px] rounded-l-full rounded-r-full border-gray-400 max-w-[293px] my-4 m-auto' /> */}
                                <div className="flex justify-between mt-4">
                                    <div>
                                        <h1 className='text-[16px] font-[600]'>Subject </h1>
                                        <h1 className='text-[10px] font-[400]'>Speaking English</h1>
                                    </div>
                                    <div>
                                        <h1 className='text-[16px] font-[600]'>Availability </h1>
                                        <h1 className='text-[10px] font-[400]'>Evening</h1>
                                    </div>
                                    <div>
                                        <h1 className='text-[16px] font-[600]'>Grade Level </h1>
                                        <h1 className='text-[10px] font-[400]'>1+</h1>
                                    </div>
                                </div>
                                {/* <div className="flex justify-center">
                                    <button className='bg-primary1 text-white px-6 py-2 rounded-xl mt-4'>
                                        Chat now
                                    </button>

                                </div> */}

                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default AllPost
