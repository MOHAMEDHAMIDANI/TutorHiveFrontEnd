import React from 'react'
import TopBar from '../../../components/TopBar'
import paymentSuccess from '../../../assets/paymentSuccess.png'
import Footer from '../../../components/Footer'
import { useNavigate } from 'react-router-dom'

const PaymentSuccess = () => {
    const navigate = useNavigate()

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='pb-20'>
                <TopBar />
            </div>
            <div className='max-w-[1501px] m-auto bg-gray-300 h-[1.3px] ' />
            <div className='max-w-[1501px] m-auto pb-20 '>
                <section className='py-10 flex max-md:flex-col justify-between items-center'>
                    <div className=''>
                        <h1 className='text-[40px] font-[700] '>Thank You for <span className='text-primary1'>Your Purchase!</span></h1>
                        <p className='text-[16px] font-[400] xl:max-w-[595.646px] mt-2'>We're excited to have you on board! Your journey to mastering new skills starts now. Check your email for course details and get ready to dive in.</p>
                        <button onClick={() => navigate('/')} className='bg-primary1 px-10 py-2 rounded-xl text-white mt-4'>Done</button>
                    </div>
                    <div >
                        <img src={paymentSuccess} alt="" className='lg:max-w-[614.4px]  ' />
                    </div>

                </section>
            </div>

            <Footer />


        </div>
    )
}

export default PaymentSuccess
