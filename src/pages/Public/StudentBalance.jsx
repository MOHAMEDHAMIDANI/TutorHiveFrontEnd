import { useState, useEffect } from 'react';
import TopBar from '../../components/TopBar'
import banner from '../../assets/bannerBack.png'
import { Spin } from 'antd';
import axiosInstance from '../../api/axiosInstance'

import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'
import { FaRegDotCircle } from 'react-icons/fa'
import AddPointsModal from '../../components/AddPointsModal'
import LowPointsModal from '../../components/LowPointsModal'
import { IoIosArrowUp } from 'react-icons/io'
import moment from 'moment'
import { MdArrowOutward } from 'react-icons/md';
import { GoArrowDownLeft } from 'react-icons/go';

const StudentBalance = () => {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [lowPointsOpen, setLowPointsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [totalPoints, setTotalPoints] = useState(0)


    const getTotalPoints = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get(`/transactions`)
            if (response.data) {
                setTransactions(response.data.transactions?.data)
                setTotalPoints(response.data.total)
            }
        } catch (error) {
            console.error('Error fetching transactions:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getTotalPoints()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spin size="large" />
            </div>
        )
    }

    return (
        <div>
            <div className='min-h-screen'>
                <AddPointsModal open={open} handleCancel={() => setOpen(false)} />
                <LowPointsModal open={lowPointsOpen} handleCancel={() => setLowPointsOpen(false)} pointsNeeded={10000} handleAdd={() => setOpen(true)} />
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
                                    Balance
                                </h1>
                                <p className='text-[16px] max-md:text-[14px] font-[300] text-center'>A Comprehensive, Step-by-Step Process Designed to Effortlessly Connect You with</p>
                                <p className='text-[16px] max-md:text-[14px] font-[300] text-center'> Your Ideal Tutor, Tailored to Help You Achieve Your Unique Academic Goals
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='max-w-[1501px] m-auto mb-12'>
                    <div className=' bg-[#F0FAFF] p-20 rounded-xl mt-10'>
                        <div className='flex flex-col items-center justify-center'>
                            <p className='  text-[24px]  flex items-center gap-2'><FaRegDotCircle /> Points</p>
                            <h1 className='text-[40px] font-[600]  '>{totalPoints}/PTS</h1>

                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center'>

                        <p className='text-gray-400 text-sm mt-4'>You can add more points from your team account</p>
                        <button onClick={() => setOpen(true)} className='bg-[#F0FAFF] text-[#69CBF7] w-[80px] h-[80px] rounded-full mt-4 text-2xl'>
                            +
                        </button>
                    </div>

                </div>

                <div className='max-w-[1501px] m-auto mb-12'>
                    <div className=' p-10 rounded-xl'>
                        <h1 className='text-[20px] font-[600] mb-6'>Recent Transactions</h1>

                        {transactions?.map((item, index) => (
                            <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#E8F7FF] p-2 rounded-lg">
                                        {item.amount.includes('-') ?
                                            <MdArrowOutward className="text-[#69CBF7] text-xl" />
                                            :
                                            <GoArrowDownLeft className="text-[#69CBF7] text-xl" />
                                        }
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{item.title}</p>
                                        <p className="text-xs text-gray-400">{moment(item?.createdAt).format('DD/MM/YYYY')}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">${item?.amount}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default StudentBalance
