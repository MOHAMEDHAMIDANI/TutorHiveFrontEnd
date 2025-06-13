import React, { useEffect, useState } from 'react';
import TopBar from './TopBar';
import Footer from './Footer';
import { SlCalender, SlGraph } from 'react-icons/sl';
import { useLocation, useNavigate } from 'react-router-dom';
import NewPasswordModal from './NewPasswordModal';
import LogoutModal from './LogoutModal';
import { FaRegUser } from 'react-icons/fa';
import { TbUserEdit } from 'react-icons/tb';
import { CiLock } from 'react-icons/ci';
import { IoIosLogOut, IoIosNotificationsOutline } from 'react-icons/io';
import { BsChatDots } from 'react-icons/bs';
import { FaPersonChalkboard } from 'react-icons/fa6';
import { BiWallet } from 'react-icons/bi';
import { Drawer } from 'antd';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdOutlineSubject } from 'react-icons/md';


const data = [
    { icon: <FaRegUser />, name: 'Profile', route: '/profile' },
    { icon: <TbUserEdit className='text-lg' />, name: 'Edit Profile', route: '/profile/update' },
    // { icon: <CiLock />, name: 'Change Password', route: 'password-change' },
    { icon: <SlCalender />, name: 'Book Session ', route: '/profile/book-session' },
    // { icon: <IoIosNotificationsOutline />, name: 'Notifications', route: '/profile/notifications' },
    { icon: <BsChatDots />, name: 'Chat', route: '/profile/chat' },
    { icon: <FaPersonChalkboard />, name: 'Become a Tutor', route: '/profile/become-tutor' },
    // { icon: <BiWallet />, name: 'My Balance', route: '/profile/balance' },
    { icon: <IoIosLogOut />, name: 'Logout', route: 'logout' },
];

const tutorData = [
    // { icon: <FaRegUser />, name: 'Profile', route: '/profile' },
    { icon: <TbUserEdit className='text-lg' />, name: 'Edit Profile', route: '/profile/update-tutor' },
    { icon: <MdOutlineSubject className='text-lg' />, name: 'Subjects', route: '/profile/subjects' },
    // { icon: <CiLock />, name: 'Change Password', route: 'password-change' },
    { icon: <SlCalender />, name: 'Book Session ', route: '/profile/tutor-bookings' },
    // { icon: <IoIosNotificationsOutline />, name: 'Notifications', route: '/profile/notifications' },
    { icon: <BsChatDots />, name: 'Chat', route: '/profile/chat' },
    // { icon: <BiWallet />, name: 'My Balance', route: '/profile/balance' },
    { icon: <IoIosLogOut />, name: 'Logout', route: 'logout' },
];


const Layout = ({ children }) => {
    const userInfo = JSON.parse(localStorage.getItem('tutor_user'));
    const [selectedIndex, setSelectedIndex] = useState(0);
    const location = useLocation();
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [routes, setRoutes] = useState([])


    const [openNewPassword, setOpenNewPassword] = useState(false)
    const toggleOpenNewPassword = () => setOpenNewPassword(!openNewPassword)

    const [logoutModa, setLogoutModa] = useState(false)
    const toggleLogoutModal = () => setLogoutModa(!logoutModa)

    const isProfilePage = location.pathname.startsWith("/profile");

    const handleClick = (index, route) => {
        setSelectedIndex(index);
        navigate(route)
    };

    

    useEffect(() => {
        if (userInfo?.role?.name === "Tutor") {
            console.log('tutorData', tutorData);
            setRoutes(tutorData)
            console.log('tutorData', tutorData);
            
        } else {
            setRoutes(data)
            console.log('data1221', data);
        }

    }, [userInfo])

    console.log('userInfo', userInfo);
    

    return isProfilePage ? (
        <div className='bg-gray-100 min-h-screen'>
            <NewPasswordModal open={openNewPassword} handleCancel={toggleOpenNewPassword} />
            <LogoutModal open={logoutModa} handleCancel={toggleLogoutModal} />
            <div className='pb-20'>
                <TopBar />
            </div>
            <Drawer placement="left" width={250} onClose={() => setOpen(!open)} open={open}>
                <div>
                    {routes.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                if (item.route === 'password-change') {
                                    toggleOpenNewPassword()
                                    setOpen(!open)
                                } else if (item.route === 'logout') {
                                    toggleLogoutModal()
                                    setOpen(!open)
                                } else {
                                    handleClick(index, item.route)
                                    setOpen(!open)
                                }
                            }}
                            className={`${location.pathname === item.route ? 'bg-primary1 text-white' : 'hover:bg-primary1 hover:text-white text-black'
                                } cursor-pointer rounded-lg flex items-center mt-4 gap-2 px-6 py-2`}
                        >
                            {item.icon}
                            {item.name}
                        </div>
                    ))}
                </div>
            </Drawer>
            <div className='max-w-[1501px] m-auto bg-gray-300 h-[1.3px]' />

            <div className=" m-4 hidden max-lg:block">
                <RxHamburgerMenu onClick={() => setOpen(!open)} />
            </div>
            <div className='flex gap-4 flex-1 max-md:mt-2 my-20 max-md:px-2 lg:max-w-[1500px] m-auto'>

                <div className='bg-white max-lg:hidden rounded-xl flex-0.3 px-6 pt-10 pb-6 lg:min-w-[268px]'>
                    <h1 className='text-[16px] font-[700] select-none'>My Account</h1>
                    <div>
                        {routes.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    if (item.route === 'password-change') {
                                        toggleOpenNewPassword()
                                    } else if (item.route === 'logout') {
                                        toggleLogoutModal()
                                    } else {
                                        handleClick(index, item.route)
                                    }
                                }}
                                className={`${location.pathname === item.route ? 'bg-primary1 text-white' : 'hover:bg-primary1 hover:text-white text-black'
                                    } cursor-pointer rounded-lg flex items-center mt-4 gap-2 px-6 py-2`}
                            >
                                {item.icon}
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full max-lg:mx-4 select-none'>
                    {children}
                </div>
            </div>

            <Footer />
        </div>
    ) : (
        <div className={`${location.pathname.startsWith('/auth') ? 'bg-primary1' : location.pathname === '/my-balance' ? 'bg-white' : 'bg-gray-100'} px-6 select-none	 `}>{children}</div>
    );
};

export default Layout;
