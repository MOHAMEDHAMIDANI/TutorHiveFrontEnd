import React, { useState } from 'react'
import TopBar from '../../components/TopBar'
import banner from '../../assets/bannerBack.png'
import bannerperson from '../../assets/BannerPerson.png'
import FilterCourse from '../../components/FilterCourse'
import p2 from '../../assets/p2.png'
import grid from '../../assets/grids.png'
import { FaCalendarAlt, FaFolder, FaUserFriends } from 'react-icons/fa'
import { GrCertificate } from 'react-icons/gr'
import { IoCheckmarkCircle, IoShieldCheckmarkSharp } from 'react-icons/io5'
import tperson1 from '../../assets/tp1.png'
import cp1 from '../../assets/cp1.png'
import cp2 from '../../assets/cp2.png'
import cp3 from '../../assets/cp3.png'
import cp4 from '../../assets/cp4.png'
import cp5 from '../../assets/cp5.png'
import cp6 from '../../assets/cp6.png'
import cp7 from '../../assets/cp7.png'
import cp8 from '../../assets/cp8.png'
import choosep from '../../assets/whyp.png'
import { MdLightbulb } from 'react-icons/md'
import AccordionItem from '../../components/Accordion'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'



const data = [
    { name: 'Courtney Henry', detail: 'World Literature', image: cp1 },
    { name: 'Jenny Wilson ', detail: 'Molecular Biology ', image: cp2 },
    { name: 'Kristin Watson ', detail: 'Astronomy ', image: cp3 },
    { name: 'Cody Fisher ', detail: 'Social Structures ', image: cp4 },
    { name: 'Courtney Henry ', detail: 'World Literature ', image: cp5 },
    { name: 'Jenny Wilson ', detail: 'Molecular Biology ', image: cp6 },
    { name: 'Kristin Watson ', detail: 'Astronomy ', image: cp7 },
    { name: 'Cody Fisher ', detail: 'Social Structures ', image: cp8 },

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

const LandingPage = () => {

    const navigate = useNavigate()

    const [openIndex, setOpenIndex] = useState(null);

    const handleClick = (index) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    const handleFilterSubmit = (filters) => {
        console.log('Filters submitted:', filters)
        navigate('/find-tutor', { state: { filters } })
    }

    return (
        <div className='bg-gray-100 '>
            <div className='pb-20'>
                <TopBar />
            </div>

            {/* hero banner  */}

            <div
                style={{
                    background: 'linear-gradient(to bottom, #7db9e8, #d0e7ff)',
                }}
                className='max-w-[1501px] m-auto rounded-xl relative'
            >
                <div
                    style={{ backgroundImage: `url(${banner})` }}
                    className='p-10 max-md:p-6 bg-cover bg-center rounded-xl'
                >
                    <div className='flex justify-between items-center relative'>
                        <div>
                            <h1 className='text-[57.498px] max-md:text-[27px]'>
                                Find the <span className='font-bold text-white'>Perfect Tutor</span>
                            </h1>
                            <h1 className='text-[50.498px] max-md:text-[27px] -mt-2'>
                                Your <b>Academic</b> Need
                            </h1>
                            <h1 className='text-[17px] font-regular lg:max-w-[593px] max-md:text-[14px] mt-2'>
                                Connect with qualified tutors from various universities and enhance your learning experience.
                            </h1>

                            <button onClick={() => navigate('/contact-us')} className='mt-6 bg-primary1 rounded-3xl px-6 py-2 font-semibold text-gray-800 mt-2'>
                                Contact Us
                            </button>
                        </div>
                        <div>
                            <img src={bannerperson} alt="" className='z-10 relative max-lg:hidden' />
                        </div>
                    </div>
                </div>
            </div>

            <div className='-mt-[8rem] relative z-30 max-w-[1350px] m-auto max-lg:mt-4 max-md:mt-4 max-md:mt-0'>
                <FilterCourse handleSubmit={handleFilterSubmit} />
            </div>

            {/* hero banner end  */}

            {/* second section */}

            <div className='bg-gray-100 py-20'>
                <div className='flex justify-between lg:max-w-[1400px] m-auto items-center'>
                    <div className=' '>
                        <h1 className='font-[600] text-[40px] lg:max-w-[531px]'>Build career by the best <span className='font-[300]'>
                            learning platform
                        </span>
                        </h1>
                        <p className='text-[16px] font-[400] lg:max-w-[551px]'>
                            Create custom landing pages with that converts more visitors than any website. With lots of unique blocks, you can easily build a page without the resong of this coding.
                        </p>
                        <button className='bg-primary1 text-white px-8 py-2 rounded-xl mt-4'>Contact us</button>

                    </div>

                    <div className='flex gap-2 max-lg:hidden'>
                        <div className="relative">
                            <img src={p2} alt="" className="rounded-xl relative z-20" />
                            <svg
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
                                xmlns="http://www.w3.org/2000/svg"
                                width="81"
                                height="80"
                                viewBox="0 0 81 80"
                                fill="none"
                            >
                                <circle cx="40.5894" cy="40" r="40" fill="white" />
                                <path
                                    d="M34.8988 30.8364C33.1817 29.8138 31.7896 30.6515 31.7896 32.7059V47.8667C31.7896 49.9232 33.1817 50.7598 34.8988 49.7382L47.6629 42.1387C49.3806 41.1157 49.3806 39.4584 47.6629 38.4358L34.8988 30.8364Z"
                                    fill="#12141D"
                                />
                            </svg>
                        </div>

                        <div className="relative mt-10">
                            <img src={p2} alt="" className="rounded-xl relative z-20" />
                            <svg
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
                                xmlns="http://www.w3.org/2000/svg"
                                width="81"
                                height="80"
                                viewBox="0 0 81 80"
                                fill="none"
                            >
                                <circle cx="40.5894" cy="40" r="40" fill="white" />
                                <path
                                    d="M34.8988 30.8364C33.1817 29.8138 31.7896 30.6515 31.7896 32.7059V47.8667C31.7896 49.9232 33.1817 50.7598 34.8988 49.7382L47.6629 42.1387C49.3806 41.1157 49.3806 39.4584 47.6629 38.4358L34.8988 30.8364Z"
                                    fill="#12141D"
                                />
                            </svg>
                        </div>
                    </div>

                </div>
            </div>

            {/* end of second section  */}



            {/* third section  */}

            <div style={{ backgroundImage: `url(${grid})` }}
                className='p-10 max-md:p-0 bg-cover bg-center rounded-xl'>
                <div className='flex justify-between max-lg:flex-col-reverse items-center lg:max-w-[1200px] m-auto'>
                    <div className='grid grid-cols-2 max-md:grid-cols-1 gap-6 max-lg:mt-10'>
                        <div className='bg-white rounded-xl px-4 pb-4 pt-6 pb-2'>
                            <div className='flex '>
                                <div className='bg-primary1 p-2 rounded-full'>
                                    <FaUserFriends size={25} className='text-[#0093CB]' />
                                </div>
                            </div>
                            <h1 className='text-[19.19px] font-[600] mt-2' >Tutoring</h1>
                            <p className='lg:max-w-[193.276px] text-[16.566px] mt-2 font-[400] '>Get personalized support from skilled instructors to help you excel in your studies.</p>
                        </div>
                        <div className='bg-white rounded-xl px-4 pb-4 pt-6 pb-2'>
                            <div className='flex '>
                                <div className='bg-[#FEF1D1] p-2 rounded-full'>
                                    <FaFolder size={25} className='text-[#FABB18]' />
                                </div>
                            </div>
                            <h1 className='text-[19.19px] font-[600] mt-2' >Sessions</h1>
                            <p className='lg:max-w-[193.276px] text-[16.566px] mt-2 font-[400] '>Explore various courses designed to boost your professional development.</p>
                        </div>
                        <div className='bg-white rounded-xl px-4 pb-4 pt-6 pb-2'>
                            <div className='flex '>
                                <div className='bg-[#FFDDE4] p-2 rounded-full'>
                                    <GrCertificate size={25} className='text-[#FF5576]' />
                                </div>
                            </div>
                            <h1 className='text-[19.19px] font-[600] mt-2' >Post</h1>
                            <p className='lg:lg:max-w-[193.276px] text-[16.566px] mt-2 font-[400] '>Students can post their academic problems on the website.</p>
                        </div>
                        <div className='bg-white rounded-xl px-4 pb-4 pt-6 pb-2'>
                            <div className='flex '>
                                <div className='bg-[#D0EFE6] p-2 rounded-full'>
                                    <IoShieldCheckmarkSharp size={25} className='text-[#14B082]' />
                                </div>
                            </div>
                            <h1 className='text-[19.19px] font-[600] mt-2' >Problem Solve</h1>
                            <p className='lg:lg:max-w-[193.276px] text-[16.566px] mt-2 font-[400] '>Relevant tutors can propose solutions to posted problems.</p>
                        </div>
                    </div>
                    <div className=' '>
                        <h1 className='font-[600] text-[40px] lg:max-w-[531px]'>Build career with  <span className='font-[300]'>
                            the Best Learning Platform
                        </span>
                        </h1>
                        <p className='text-[16px] font-[400] lg:max-w-[551px]'>
                            Create custom landing pages that attract more visitors than any other website. With numerous unique blocks, you can easily build a page without the need for coding.
                        </p>
                        <button className='bg-primary1 text-white px-8 py-2 rounded-xl mt-4'>Contact us</button>

                    </div>

                </div>
            </div>

            {/* third section end  */}

            {/* fourth section start */}

            <section>

                <div className='max-w-[1250px] m-auto py-20'>
                    <h1 className='max-w-[471.5px] m-auto text-center text-[40px] font-[700] '>Our Blessed client said <span className='font-[300]'> about us</span></h1>
                    <div className="flex justify-between max-md:flex-col gap-8 mt-10">
                        <div >
                            <div className='bg-white rounded-lg py-8 px-10 shadow-md shadow-gray-200'>
                                <h1 className='text-center text-primary1 text-[20px] font-[700]'>“Incredible Experience”</h1>
                                <p className='text-center text-[18px] max-w-[501px] m-auto mt-2'>
                                    We had an incredible experience working with Mixland and were impressed they made such a big difference in only three weeks. Our team is so grateful for the wonderful improvements they made and their ability to get familiar with the concept so quickly.
                                </p>
                            </div>
                            <div className="flex gap-2 items-center justify-center mt-4">
                                <img src={tperson1} className='rounded-full w-[62.222px] h-[62.222px]' alt="" />
                                <div className=''>
                                    <h1 className='text-[20px] font-[500]' > Wade Warren</h1>
                                    <p className='text-[15.556px] font-[400] mt-[1px]'>CEO, ABC Corporation</p>
                                </div>
                            </div>
                        </div>

                        <div >
                            <div className='bg-white rounded-lg py-8 px-10 shadow-md shadow-gray-200'>
                                <h1 className='text-center text-primary1 text-[20px] font-[700]'>“Dependable, Responsive, Professional”</h1>
                                <p className='text-center text-[18px] max-w-[501px] m-auto mt-2'>
                                    Fermin Apps has collaborated with Mixland team for several projects such as Photo Sharing Apps and Custom Social Networking Apps. The experience has been pleasant, professional and exceeding our expectations. The team is always thinking beyond.
                                </p>
                            </div>
                            <div className="flex gap-2 items-center justify-center mt-4">
                                <img src={tperson1} className='rounded-full w-[62.222px] h-[62.222px]' alt="" />
                                <div className=''>
                                    <h1 className='text-[20px] font-[500]' > Wade Warren</h1>
                                    <p className='text-[15.556px] font-[400] mt-[1px]'>CEO, ABC Corporation</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </section>


            {/* fourth section end */}

            <section>
                <div className='max-w-[1250px] m-auto py-20'>
                    <h1 className='max-w-[471.5px] m-auto text-center text-[40px] font-[700] '>Extra Ordinary Features <span className='font-[300]'> of TutorLink</span></h1>
                    <div className="flex justify-between max-md:flex-col gap-6 mt-10">

                        <div className='bg-white rounded-xl border-t-4 border-[#2B59FF]  '>
                            <div className='py-6 px-6'>
                                <h1 className='text-[19.619px] font-[700] '>Live Data Feeds</h1>
                                <div className="flex gap-2 items-center mt-4">
                                    <IoCheckmarkCircle color='#2B59FF' size={20} />
                                    <p className='text-[16.816px] font-[400] max-w-[300px] '>Real-Time Tutoring Sessions: Immediate access to live tutoring sessions.</p>
                                </div>
                                <div className="flex gap-2 items-center mt-4">
                                    <IoCheckmarkCircle color='#2B59FF' size={20} />
                                    <p className='text-[16.816px] font-[400] max-w-[300px] '>Resource Library: Explore a vast library of educational resources.</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white rounded-xl border-t-4 border-[#FABB18]  '>
                            <div className='py-6 px-6'>
                                <h1 className='text-[19.619px] font-[700] '>Technologies Support</h1>
                                <div className="flex gap-2 items-center mt-4">
                                    <IoCheckmarkCircle color='#FABB18' size={20} />
                                    <p className='text-[16.816px] font-[400] max-w-[300px] '>Advanced Scheduling Tools: Book and manage your tutoring sessions efficiently.</p>
                                </div>
                                <div className="flex gap-2 items-center mt-4">
                                    <IoCheckmarkCircle color='#FABB18' size={20} />
                                    <p className='text-[16.816px] font-[400] max-w-[300px] '>Interactive Whiteboards: Facilitate dynamic and  learning experiences.</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white rounded-xl border-t-4 border-[#14B082]  '>
                            <div className='py-6 px-6'>
                                <h1 className='text-[19.619px] font-[700] '>Analysis & Interpretation</h1>
                                <div className="flex gap-2 items-center mt-4">
                                    <IoCheckmarkCircle color='#14B082' size={20} />
                                    <p className='text-[16.816px] font-[400] max-w-[300px] '>Progress Tracking: Monitor your learning progress with detailed analytics.</p>
                                </div>
                                <div className="flex gap-2 items-center mt-4">
                                    <IoCheckmarkCircle color='#14B082' size={20} />
                                    <p className='text-[16.816px] font-[400] max-w-[300px] '>Performance Reports: Comprehensive reports on your performance.</p>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </section>


            {/* end of fourth section  */}

            {/* start of fifth section  */}

            <section>
                <div className='max-w-[1250px] m-auto py-20'>
                    <h1 className='max-w-[471.5px] m-auto text-center text-[40px] font-[700] '>Get Your <span className='font-[300]'> Coach</span></h1>
                    <div className='grid grid-cols-4 max-md:grid-cols-2 gap-6 mt-10'>
                        {data.map((item, index) => (
                            <div key={index} className="overflow-hidden rounded-xl cursor-pointer" onClick={() => navigate('/find-tutor/service')}>
                                <div className=''>
                                    <img
                                        src={item.image}
                                        alt=""
                                        className='object-cover rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105'
                                        
                                    />
                                    <div className='p-4'>
                                        <h1 className='text-[26px] max-md:text-[16px] font-[700] text-center'>{item.name}</h1>
                                        <p className='text-[16px] font-[400] max-md:text-[12px] text-center'>{item.detail}</p>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>

                </div>
            </section>

            {/* end of the fifth section  */}

            {/* start of the sixth section */}
            <section>
                <div className='lg:max-w-[1250px] m-auto py-20'>

                    <div className="flex justify-between items-center">
                        <div className='max-lg:hidden'>
                            <img src={choosep} alt="" className='rounded-xl' />
                        </div>
                        <div >
                            <h1 className='  m-auto text-left text-[40px] font-[700] '>Why <span className='font-[300]'> Choose Us?</span></h1>
                            <p className='lg:max-w-[666px]  text-[16px] font-[600] mt-4'>
                                At Tutorhive , we make learning easy and accessible. Whether you're looking to excel in academics or gain new skills, our platform offers everything you need.
                            </p>
                            <div className='flex gap-4 items-center mt-4'>
                                <div className='bg-[#FEF1D1] p-2 rounded-full'>
                                    <FaUserFriends size={25} className='text-[#FABB18]' />
                                </div>
                                <div>
                                    <h1 className='text-[19.19px] font-[600]'> Expert Tutors</h1>
                                    <p className='text-[12px] font-[400] lg:w-[446px]'>Learn from qualified professionals with extensive experience in their respective fields.Expand your knowledge and achieve your goals.</p>
                                </div>
                            </div>
                            <div className='flex gap-4 items-center mt-4'>
                                <div className='bg-[#CCE9F5] p-2 rounded-full'>
                                    <FaCalendarAlt size={25} className='text-[#0093CB]' />
                                </div>
                                <div>
                                    <h1 className='text-[19.19px] font-[600]'>Flexible Scheduling</h1>
                                    <p className='text-[12px] font-[400] lg:w-[446px]'>Schedule sessions at your convenience, with options for online or in-person tutoring.Learn at your own pace and on your own time.</p>
                                </div>
                            </div>
                            <div className='flex gap-4 items-center mt-4'>
                                <div className='bg-[#D0EFE6] p-2 rounded-full'>
                                    <MdLightbulb size={25} className='text-[#14B082]' />
                                </div>
                                <div>
                                    <h1 className='text-[19.19px] font-[600]'> Expert Tutors</h1>
                                    <p className='text-[12px] font-[400] lg:w-[446px]'>Learn from qualified professionals with extensive experience in their respective fields.Expand your knowledge and achieve your goals.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </section>

            {/* end of the sixth section  */}

            {/* start of the seventh section  */}

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

            <Footer />



        </div>


    )
}

export default LandingPage
