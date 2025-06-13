import React, { useEffect, useState } from 'react';
import TopBar from '../../../components/TopBar';
import book from '../../../assets/bookCover.png';
import { IoIosStar } from 'react-icons/io';
import { FaInstagram, FaTwitter } from 'react-icons/fa';
import { IoLogoFacebook } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import Footer from '../../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';
import { Image } from 'antd';

const ServiceDetail = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');

    const [serviceData, setServiceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getServiceById = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`services/${id}`);
            setServiceData(response.data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to fetch service details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getServiceById();
    }, []);

    const [selectedTab, setSelectedTab] = React.useState(0);
    const tabs = ['One to One', 'Group Session'];

    const navigate = useNavigate();

    const shareUrl = `${window.location.origin}/service-detail?id=${id}`;
    const serviceTitle = serviceData?.title;

    const handleShare = (platform) => {
        switch (platform) {
            case 'facebook':
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                    '_blank'
                );
                break;
            case 'twitter':
                window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        `Check out this service: ${serviceTitle}`
                    )}&url=${encodeURIComponent(shareUrl)}`,
                    '_blank'
                );
                break;
            case 'instagram':
                alert('Instagram sharing is not supported via web. Share manually.');
                break;
            case 'email':
                window.location.href = `mailto:?subject=${encodeURIComponent(
                    `Check out this service: ${serviceTitle}`
                )}&body=${encodeURIComponent(shareUrl)}`;
                break;
            default:
                break;
        }
    };

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary1"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className="text-red-500 text-center">
                    <h2 className="text-xl font-bold">Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='pb-20'>
                <TopBar />
            </div>
            <div className='lg:max-w-[1501px] m-auto bg-gray-300 h-[1.3px] ' />

            <div className='lg:max-w-[1501px] m-auto pb-10'>
                <div className="flex gap-4 mt-10">
                    {tabs.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedTab(index)}
                            className={`text-[16px] font-[700] ${
                                selectedTab === index
                                    ? 'border-b-primary1 border-b-2 text-primary1 pb-2'
                                    : 'hover:border-b-primary1 border-b-2 pb-2 border-gray-100 text-black hover:text-primary1'
                            } cursor-pointer`}
                        >
                            {item}
                        </div>
                    ))}
                </div>

                <div className="flex justify-center max-md:flex-col gap-6 mt-10">
                    <div>
                        <Image
                            src={serviceData?.image || book}
                            className='rounded-xl w-[456.987px] max-w-[450px] h-[532.647px] object-cover'
                            alt={serviceData?.title}
                        />
                    </div>
                    <div>
                        <h1 className='max-w-[457px] font-[500] text-[34px]'>{serviceData?.title}</h1>
                        <h1 className='flex items-center gap-[2px] text-[16px] font-[300] mt-4 '>
                            {Array(4).fill().map((_, i) => (
                                <IoIosStar key={i} size={16} className={`text-primary1`} />
                            ))}{' '}
                            4.0
                        </h1>
                        <h1 className='text-[18px] font-[500] mt-4'>Description</h1>
                        <div
                            className='text-[16px] font-[600] mt-2 max-w-[675.246px]'
                            dangerouslySetInnerHTML={{ __html: serviceData?.description }}
                        />
                        <div className='mt-10'>
                            <h1 className='text-[18px] font-[500]'>Price</h1>
                            <h1 className='text-[18px] font-[500]'>{serviceData?.price} Pts</h1>
                        </div>

                        <button
                            onClick={() =>
                                navigate('/find-tutor/service/detail/calender', {
                                    state: { data: serviceData },
                                })
                            }
                            className='bg-primary1 px-10 font-[700] text-white rounded-xl py-2 mt-4 '
                        >
                            Book Session
                        </button>

                        <div className="flex gap-2 items-center mt-6">
                            <h1 className='text-[18px] font-[400] '>Share :</h1>
                             
                            <IoLogoFacebook
                                onClick={() => handleShare('facebook')}
                                className="cursor-pointer"
                                size={24}
                            />
                            <MdEmail
                                onClick={() => handleShare('email')}
                                className="cursor-pointer"
                                size={24}
                            />
                            <FaTwitter
                                onClick={() => handleShare('twitter')}
                                className="cursor-pointer"
                                size={24}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ServiceDetail;
