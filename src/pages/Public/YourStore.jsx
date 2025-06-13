import { useEffect, useState } from 'react';
import TopBar from '../../components/TopBar'
import banner from '../../assets/bannerBack.png'
import Footer from '../../components/Footer'
import axiosInstance from '../../api/axiosInstance'
import { Spin } from 'antd';



const YourStore = () => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const userData = JSON.parse(localStorage.getItem('tutor_user'))

    const getStore = async () => {
        setLoading(true)

        try {
            const response = await axiosInstance.get(`/users/${userData?.id}`)
            console.log('response of get store ', response);
            setData(response.data?.services)
            setLoading(false)
        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
    }

    useEffect(() => {
        getStore()
    }, [])

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Spin size='large' />
            </div>
        )
    }


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
                            <h1 className='text-[56px] font-[600] max-md:text-[37px]  text-center'>
                                Your <span className='font-[400]'> Store</span>
                            </h1>
                            <p className='text-[16px] max-md:text-[14px] font-[300] text-center'>A Comprehensive, Step-by-Step Process Designed to Effortlessly Connect You with</p>
                            <p className='text-[16px] max-md:text-[14px] font-[300] text-center'> Your Ideal Tutor, Tailored to Help You Achieve Your Unique Academic Goals
                            </p>
                        </div>

                    </div>

                </div>
            </div>

            <div className='max-w-[1401px] m-auto'>


                <h1 className='text-[34px] font-[600] mt-10'>Services</h1>

                <div className="grid grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 gap-6 mt-10 pb-20">
                    {data?.map((item, index) => (
                        <div className={` bg-white rounded-xl    shadow-md shadow-gray-100 relative`}>
                            <div className=' '>
                                <img src={item.image} alt="" className=' object-cover w-full  max-h-[200px] m-auto rounded-xl  ' />

                                <div className='p-4'>
                                   
                                    <h1 className={`text-black text-[16px] font-[600] my-2`}>Description</h1>
                                    <p className={`text-black text-[14px]   font-[400]`} dangerouslySetInnerHTML={{ __html: item.description }} />
                                    {/* <div className='border-[1px] rounded-l-full rounded-r-full border-gray-400 max-w-[293px] my-4 m-auto' /> */}
                                    <div className="flex justify-between mt-4">
                                        <div>
                                            <h1 className='text-[16px] font-[600]'>Subject </h1>
                                            <div className='flex gap-2'>
                                                {item?.subjects?.map((sub, index) => (
                                                    <p className='text-[14px] font-[400]'>{sub}</p>
                                                ))}
                                            </div>
                                        </div>

                                    </div>

                                    
                                  
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

           


            </div>
            <Footer />
        </div>
    )
}

export default YourStore
