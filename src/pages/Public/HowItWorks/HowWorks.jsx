import React, { useState } from 'react'
import TopBar from '../../../components/TopBar'
import banner from '../../../assets/bannerBack.png'
import FilterCourse from '../../../components/FilterCourse'
import { FaFolder } from 'react-icons/fa6'
import AccordionItem from '../../../components/Accordion'
import Footer from '../../../components/Footer'


const data = [
    { background: '#FEF7E3', color: '#FBC331', name: 'Discover Tutors', description: 'Find the perfect tutor by browsing through our extensive list, tailored to meet your specific learning needs.' },
    { background: '#E0F2F9', color: '#0093CB', name: 'View Tutor Profiles', description: 'Find the perfect tutor by browsing through our extensive list, tailored to meet your specific learning needs.' },
    { background: '#E3F6F0', color: '#14B082', name: 'Book Your Session', description: 'Find the perfect tutor by browsing through our extensive list, tailored to meet your specific learning needs.' },

    { background: '#FEF7E3', color: '#FBC331', name: 'Post Tutoring Request', description: 'Find the perfect tutor by browsing through our extensive list, tailored to meet your specific learning needs.' },
    { background: '#E0F2F9', color: '#0093CB', name: 'Chat with Tutors', description: 'Find the perfect tutor by browsing through our extensive list, tailored to meet your specific learning needs.' },
    { background: '#E3F6F0', color: '#14B082', name: 'Manage Your Learning', description: 'Find the perfect tutor by browsing through our extensive list, tailored to meet your specific learning needs.' },
]


const items = [
    {
        title: 'How Do I Sign Up For A Tutoring Session?',
        content: 'You can sign up for a tutoring session by clicking on the "Sign Up" button on the homepage.',
    },
    {
        title: 'What Subjects Are Offered On Your Platform?',
        content: 'We offer a wide range of subjects, including Mathematics, Science, Languages, and more. You can use our search and filter options to find tutors for specific subjects.',
    },
    {
        title: 'How Do I Pay For The Sessions?',
        content: 'Payments can be made using credit cards, PayPal, or bank transfer. Payment options will be displayed at checkout.',
    },
    {
        title: 'Can I Cancel Or Reschedule A Session?',
        content: 'Yes, you can cancel or reschedule a session through your dashboard up to 24 hours before the session start time.',
    },
    {
        title: 'How Do I Contact My Tutor?',
        content: 'You can contact your tutor through the messaging feature on our platform or via email provided in the confirmation email.',
    },
    {
        title: 'What If I\'m Not Satisfied With My Tutor?',
        content: 'If you\'re not satisfied with your tutor, you can request a change through our support team. We will help you find a better match.',
    },
];

const HowWorks = () => {


    const [openIndex, setOpenIndex] = useState(null);

    const handleClick = (index) => {
        setOpenIndex(index === openIndex ? null : index);
    };
    return (
        <div className='bg-gray-100 '>
            <div className='pb-20'>
                <TopBar />
            </div>


            <div
                style={{
                    background: 'linear-gradient(to bottom, #7db9e8, #d0e7ff)',
                }}
                className='max-w-[1501px] m-auto rounded-xl relative'
            >
                <div
                    style={{ backgroundImage: `url(${banner})` }}
                    className='p-10 bg-cover bg-center rounded-xl '
                >
                    <div className='flex justify-center items-center min-h-[367.038px]'>
                        <div>
                            <h1 className='text-[56px] font-[600] max-md:text-[37px] text-center'>
                                How It <span className='font-[400]'> Works</span>
                            </h1>
                            <p className='text-[16px] max-md:text-[14px] font-[300] text-center'>A Comprehensive, Step-by-Step Process Designed to Effortlessly Connect You with</p>
                            <p className='text-[16px] max-md:text-[14px] font-[300] text-center'> Your Ideal Tutor, Tailored to Help You Achieve Your Unique Academic Goals
                            </p>
                        </div>

                    </div>

                </div>
            </div>


            <div className='max-w-[1301px] m-auto py-20    '>
                <div className="grid grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 gap-6">
                    {data.map((item) => (
                        <div>
                            <div className='bg-gray-50 rounded-xl px-4 pb-4 pt-6'>
                                <div className='flex '>
                                    <div className={`  p-2 rounded-xl w-[83.791px] h-[83.791px] items-center flex justify-center`} style={{ background: item.background, justifyContent: 'center' }}>
                                        <FaFolder size={25} color={item.color} />
                                    </div>
                                </div>
                                <h1 className='text-[19.19px] font-[600] mt-2' >{item.name}</h1>
                                <p className='  text-[16.566px] mt-2 font-[400] '>{item.description}</p>
                            </div>
                        </div>

                    ))}

                </div>


                <section>
                    <div className='max-w-[1250px] m-auto py-20'>
                        <h1 className='max-w-[471.5px] m-auto text-center text-[40px] font-[700] '>Frequently Asked <span className='font-[300]'> Questions</span></h1>
                        {items.map((item, index) => (
                            <AccordionItem
                                key={index}
                                title={item.title}
                                content={item.content}
                                isOpen={index === openIndex}
                                onClick={() => handleClick(index)}
                            />
                        ))}
                    </div>
                </section>

            </div>
            <Footer />
        </div>
    )
}

export default HowWorks
