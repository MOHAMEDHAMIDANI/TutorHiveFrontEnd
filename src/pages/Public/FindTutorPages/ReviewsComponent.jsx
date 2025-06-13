import React from 'react'
import user from '../../../assets/tp1.png'
import { IoIosStar } from 'react-icons/io'

const ReviewsComponent = ({ reviews }) => {

    console.log('reviews', reviews);


    if (reviews?.length === 0) {
        return <h1 className='text-[16px] font-[600] mt-6'>No reviews found</h1>
    }

    const calculateAverageRating = (review) => {
        const total = 
          Number(review?.knowledgeAndExpertise) + 
          Number(review?.communicationSkills) + 
          Number(review?.preparednessAndOrganization) + 
          Number(review?.reliabilityAndPunctuality) + 
          Number(review?.professionalism);
        
        return (total / 5).toFixed(1);
      };
      

    return (
        <div>
            <div className='pb-20'>
                {reviews?.map((review, index) => {
                    const averageRating = calculateAverageRating(review);
                    const starCount = Math.min(Math.max(Math.round(averageRating), 0), 5); // Ensure starCount is between 0 and 5

                    return (
                        <div key={index} className='bg-gray-200 p-6 rounded-xl mt-6 '>
                            <div className="flex justify-between">
                                <div className="flex gap-2 items-center">
                                    <img src={review?.user?.photo?.path} className='w-[39px] h-[39px] rounded-full' alt="" />
                                    <div>
                                        <h1 className='text-[16px] font-[600]'>{review?.user?.firstName} {review?.user?.lastName}</h1>
                                        <h1 className='text-[12px] font-[600]'>{review?.user?.email}</h1>
                                    </div>
                                </div>
                                <div>
                                    <h1 className='flex items-center gap-[2px] text-[16px] font-[700] mt-4 '>
                                        {averageRating} {Array(starCount).fill().map((_, i) => <IoIosStar key={i} size={16} className={`text-primary1`} />)}
                                    </h1>
                                    <h1 className='text-[12px] font-[600]'>{new Date(review?.createdAt).toLocaleDateString()}</h1>
                                </div>
                            </div>
                            <p className='text-[16px] font-[400] mt-2'>{review?.summary}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ReviewsComponent
