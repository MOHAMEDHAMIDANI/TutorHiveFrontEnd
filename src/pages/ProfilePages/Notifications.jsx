import React, { useState } from 'react'
import { LuCalendarClock } from 'react-icons/lu'
import { PiUserSwitchFill } from 'react-icons/pi'
import { TbMessages } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { TbMessageFilled } from 'react-icons/tb'

const Notifications = () => {

    const [selectedIndex, setSelectedIndex] = useState(0)
    const navigate = useNavigate()

    const points = [
        'All',
        'New',
        'Unread',

    ]

    const notifications = [
        { icon: <LuCalendarClock className='text-primary1' size={24} />, name: 'Session Reminder', detail: `Don't forget your scheduled session today! We look forward to seeing you.`, date: 'Mar 1, 2023' },
        { icon: <TbMessageFilled className='text-primary1' size={24} />, name: 'New Messages ', detail: `Stay Updated with the Latest Notifications.`, date: 'Mar 1, 2023' },
        { icon: <PiUserSwitchFill className='text-primary1' size={24} />, name: 'Profile Updates ', detail: `Discover Your Professional Journey Highlighting Your Skills and Achievements.`, date: 'Mar 1, 2023' },
        { icon: <TbMessages className='text-primary1' size={24} />, name: 'Feedback ', detail: `Discover Your Professional Journey Highlighting Your Skills and Achievements.`, date: 'Mar 1, 2023' },
        { icon: <TbMessages className='text-primary1' size={24} />, name: 'Feedback ', detail: `Discover Your Professional Journey Highlighting Your Skills and Achievements.`, date: 'Mar 1, 2023' },
    ]

    return (
        <div>
            <h1 className='text-[20px] font-[700] mb-2'>Book Session</h1>
            <div className='bg-white   px-6 py-10 rounded-xl w-full'>
                <div className="flex gap-6">
                    {points.map((item, index) => (
                        <h1 className={`${selectedIndex === index ? 'text-primary1 ' : 'hover:text-primary1'} font-[600] text-[16px] max-md:text-[12px] cursor-pointer `} onClick={() => setSelectedIndex(index)}>
                            {item}
                        </h1>
                    ))}
                </div>
                <div className='px-4 my-2 m-auto bg-gray-300 h-[1.3px]' />

                {notifications.map((item, index) => (
                    <div className='flex max-md:flex-col justify-between items-center bg-gray-50 gap-6 mt-4 rounded-xl py-4 px-2'>
                        <div className="flex gap-2 max-md:flex-col items-center">
                            <div className='bg-white rounded-full p-[4px]'>
                                {item.icon}
                            </div>
                            <div>
                                <h1 className='text-[20px] font-[700]  '>{item.name}</h1>
                                <h1 className='text-[12px] font-[400]  '>{item.detail}</h1>
                            </div>
                        </div>
                        <div className='flex gap-6 items-center'>
                            <h1 className='text-[16px] font-[400]'>Mar 1, 2023</h1>
                            <button className='bg-primary1 text-white px-6 py-2 rounded-lg'>Delete</button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notifications
