import React from 'react'
import tutor from '../assets/tp1.png'
import { BsShieldFillCheck } from 'react-icons/bs'
import { IoIosStar } from 'react-icons/io'
import { RiTimeFill } from 'react-icons/ri'
import { PiChatTeardropTextFill } from 'react-icons/pi'
import axiosInstance from '../api/axiosInstance'
import { createConversation } from '../api/useChat'
const TutorStates = ({data, reviews,onClickFunction}) => {


    const calculateOverallRating = (reviews) => {
        if (!reviews || reviews.length === 0) return 0;

        const totalRatings = reviews.reduce((acc, review) => {
            const total = 
                Number(review?.knowledgeAndExpertise) + 
                Number(review?.communicationSkills) + 
                Number(review?.preparednessAndOrganization) + 
                Number(review?.reliabilityAndPunctuality) + 
                Number(review?.professionalism);
            return acc + (total / 5);
        }, 0);

        return (totalRatings / reviews.length).toFixed(1);
    };

    const overallRating = calculateOverallRating(reviews);
 

    return (
        <div className=' lg:max-w-[1501px]  m-auto'>
            <div className="flex max-md:flex-wrap items-center gap-6 justify-between pt-10 pb-4">
                <div className="flex items-center  gap-6">
                    <div>
                        <img src={data?.photo?.path} className='rounded-full w-[75.376px] h-[75.376px]' alt="" />
                    </div>
                    <div>
                        <h1 className='font-[600] text-[18px] flex items-center'>{data?.firstName} {data?.lastName} <span><BsShieldFillCheck className='text-primary1 ml-2' /></span></h1>
                        <p className='text-[14px] font-[400]'>Joined In {data?.createdAt.split('T')[0].split('-')[0]}</p>
                    </div>
                </div>
                <div className='border-l-[1.5px] border-gray-400 h-10' />
                <div>
                    <h1 className='flex items-center gap-[2px] text-[16px] font-[700]'>{overallRating} {Array(Math.round(overallRating)).fill().map(() => <IoIosStar size={16} />)}  </h1>
                    <h1 className='text-[14px] font-[400] mt-2'>
                        {`(${reviews?.length}) Reviews`}
                    </h1>
                </div>
                <div className='border-l-[1.5px] border-gray-400 h-10' />
                <div>
                    <h1 className='text-[16px] font-[700]'>
                        Price
                    </h1>
                    <h1 className='text-[14px] font-[400]'>{data?.hourlyRate}/hr</h1>
                </div>
                <div className='border-l-[1.5px] border-gray-400 h-10' />
                <div>
                    <h1 className='text-[16px] font-[700]'>
                        Availability
                    </h1>
                    <div className='text-[14px] font-[400] flex flex-col gap-1'>
                        {data?.availableDays.map((time, index) => (
                            <div>
                            <h1 key={index}>{time?.day}  </h1>
                            {/* <div>{time?.timeSlots?.[0]?.from} - {time?.timeSlots?.[0]?.to} </div> */}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='border-l-[1.5px] border-gray-400 h-10' />
                <div>
                    <h1 className='text-[16px] font-[700]'>
                        Policy
                    </h1>
                    <h1 className='text-[14px] font-[400]'>1:Good fit guarantee </h1>
                    <h1 className='text-[14px] font-[400]'>2:Checked Background </h1>
                </div>

                <div className="flex max-md:flex-col items-center gap-6 max-md:gap-2 ">
                    {/* <button className='flex text-white  bg-primary1 border-2 border-gray-100 items-center px-6 py-[5px] rounded-xl gap-2 font-[500] '>
                        <RiTimeFill />
                        Schedule Meeting
                    </button> */}
                    <button onClick={()=>onClickFunction(data.email)} className='flex text-primary1 bg-white border-2 border-primary1 items-center px-6 py-[5px] rounded-xl gap-2 font-[500]' >
                        <PiChatTeardropTextFill />
                        Chat
                    </button>


                </div>


            </div>

            <div className='pb-4'>
                <h1 className='text-[16px] font-[500] '>Description</h1>
                <p className='max-w-[1285.387px]  font-[400]' dangerouslySetInnerHTML={{ __html: data?.description }}> 
                </p>
            </div>
        </div>
    )
}

export default TutorStates
