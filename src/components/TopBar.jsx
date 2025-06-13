import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SolutionOutlined } from "@ant-design/icons";
import { RxHamburgerMenu } from "react-icons/rx";
import { Drawer, Dropdown } from "antd";
import { IoMdNotifications } from "react-icons/io";
import profile from "../assets/tp1.png";
import { FaCircleUser } from "react-icons/fa6";

const TopBar = () => {

    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const location = useLocation()
    // const [login, setLogin] = useState(true)
    const [data, setData] = useState([])

    const login = localStorage.getItem('login')

    const userinfo = JSON.parse(localStorage.getItem('tutor_user'))

    console.log('userinfo', userinfo?.photo?.path)


    const menu1 = [
        {
            name: 'Home',
            path: '/'
        },
        { name: 'Find Tutor', path: '/find-tutor' },
        { name: 'How it Works', path: '/how-works' },
        { name: 'Become a Tutor', path: '/auth/signup' },
        // { name: 'Post', path: '/recent-post' },
    ]

    const menu2 = [
        { name: 'Home', path: '/' },
        { name: 'Find Tutor', path: '/find-tutor' },
        { name: 'How it Works', path: '/how-works' },
        { name: 'Posts', path: '/student-post' },
        { name: 'Become a Tutor', path: '/profile/become-tutor' },
        { name: 'My Balance', path: '/my-balance' },
        // { name: 'Store', path: '/store' },
        // { name: 'Recent Post', path: '/recent-post' },
        { name: 'Chat', path: '/profile/chat' },
        { name: 'Google Meet', path: '/google-meet' },
    ]

    const TutorMenu = [
        // { name: 'Home', path: '/' },
        { name: 'How it Works', path: '/how-works' },
        { name: 'Posts', path: '/posts' },
        { name: 'My Balance', path: '/my-balance' },
        { name: 'Chat', path: '/profile/chat' },
        { name: 'Google Meet', path: '/profile/tutor-google-meet' },
    ]

    useEffect(() => {
        if (login === 'true') {
            if (userinfo?.role?.name === 'Tutor') {
                setData(TutorMenu)
            } else {
                setData(menu2)
            }
        } else {
            setData(menu1)
        }
    }, [login])


    const handleProfile = () => {
        if (userinfo?.role?.name === 'Tutor') {
            navigate('/profile/update-tutor')
        } else {
            navigate('/profile')
        }
    }






    return (
        <div>
            <div
                className={`
        fixed
        z-[100]
        flex-col w-full  left-0  py-5   max-md:px-[2%]
        ${location.pathname === '/my-balance' ? 'bg-white' : 'bg-gray-100'}
        
    `}
            >

                <Drawer placement="left" width={250} onClose={() => setOpen(!open)} open={open}>
                    {data.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => { navigate(item.path); setOpen(!open) }}
                            className={`${location.pathname === item.path ? 'bg-primary1 text-white' : 'hover:bg-primary1 hover:text-white text-black'
                                } cursor-pointer rounded-lg flex items-center mt-4 gap-2 px-6 py-2`}
                        >
                            {item.name}
                        </div>
                    ))}
                    <hr className="my-10" />
                    <div
                        onClick={() => { navigate('/profile'); setOpen(!open) }}
                        className={`${location.pathname === '/profile' ? 'bg-primary1 text-white' : 'hover:bg-primary1 hover:text-white text-black'
                            } cursor-pointer rounded-lg flex items-center mt-4 gap-2 px-6 py-2`}
                    >
                        Profile
                    </div>
                </Drawer>

                <div className="flex md:flex-row justify-between items-center max-w-[1501px] m-auto">
                    <Link to={userinfo?.role?.name === 'Tutor' ? '' : '/'}>
                        <div className="logo cursor-pointer flex flex-row items-center">
                            <span className="ml-2 font-bold text-xl">Tutor<span className="text-primary1">hive</span></span>
                        </div>
                    </Link>
                    <div className="ml-auto mr-4 hidden max-lg:block">
                        <RxHamburgerMenu onClick={() => setOpen(!open)} />
                    </div>
                    <div className="gap-6  hidden lg:flex justify-center ml-auto ">

                        {data.map((item, index) => (
                            <div className="flex-col " onClick={() => navigate(item.path)}>
                                <h1 className={` ${location.pathname === item.path ? 'text-primary1' : 'hover:text-primary1'} text-sm cursor-pointer text-black font-semibold`}>{item.name}</h1>
                                {location.pathname === item.path && <div className="w-2 h-2 bg-primary1 rounded-full m-auto"></div>}
                            </div>
                        ))}
                        {login ? (
                            <div className="flex ml-20 gap-2 items-center -mt-2">
                                <button className="text-sm text-black font-semibold border rounded-lg   px-6 py-[4px] border-black  " onClick={() => navigate('/contact-us')}>Contact us</button>
                                {/* <div className="bg-primary1 p-2 rounded-full cursor-pointer" onClick={() => navigate('/profile/notifications')}>
                                    <IoMdNotifications color="white" size={16} />
                                </div> */}
                                <Dropdown

                                    menu={{
                                        items: [
                                            {
                                                key: '1',
                                                label: (
                                                    <div className="flex items-center gap-4 w-[250px]">
                                                        {userinfo?.photo?.path ? (
                                                            <img src={userinfo.photo?.path} className="w-10 h-10 rounded-full" alt="Profile" />
                                                        ) : (
                                                            <FaCircleUser className="w-10 h-10" />
                                                        )}
                                                        <div >
                                                            <div className="font-medium ">{userinfo?.firstName || "Student"}</div>
                                                            <div className="text-gray-500 text-sm">{userinfo?.role?.name}</div>
                                                        </div>
                                                    </div>
                                                )
                                            },
                                            {
                                                key: '2',
                                                label: (
                                                    <button onClick={handleProfile} className="text-sky-500 w-full bg-sky-100 font-medium py-2 px-4 hover:bg-sky-50 rounded-full cursor-pointer" >
                                                        My Account
                                                    </button>
                                                )
                                            },
                                            {
                                                key: '3',
                                                label: (
                                                    <div onClick={() => navigate('/my-balance')} className={`${userinfo?.role?.name === 'Tutor' ? 'hidden' : 'block'} py-2 px-4 hover:bg-gray-50 rounded-lg cursor-pointer`}>
                                                        Balance
                                                    </div>
                                                )
                                            },
                                            {
                                                key: '4',
                                                label: (
                                                    <div onClick={() => navigate('/how-works')} className={`${userinfo?.role?.name === 'Tutor' ? 'hidden' : 'block'} py-2 px-4 hover:bg-gray-50 rounded-lg cursor-pointer`}>
                                                        How it Works
                                                    </div>
                                                )
                                            },
                                            {
                                                key: '5',
                                                label: (
                                                    <div onClick={() => navigate('/profile/chat')} className={`${userinfo?.role?.name === 'Tutor' ? 'hidden' : 'block'} py-2 px-4 hover:bg-gray-50 rounded-lg cursor-pointer`}>
                                                        Chats
                                                    </div>
                                                )
                                            },
                                            {
                                                key: '6',
                                                label: (
                                                    <div className="text-red-500 py-2 px-4 hover:bg-red-50 rounded-lg cursor-pointer" onClick={() => {
                                                        localStorage.clear();
                                                        navigate('/auth/login');
                                                    }}>
                                                        Log Out
                                                    </div>
                                                )
                                            }
                                        ]
                                    }}
                                    placement="bottomRight"
                                    trigger={['click']}
                                    overlayClassName="custom-dropdown"
                                >
                                    {userinfo?.photo?.path ? (
                                        <img
                                            src={userinfo.photo.path}
                                            className="w-[32px] h-[32px] cursor-pointer rounded-full object-cover"
                                            alt="Profile"
                                        />
                                    ) : (
                                        <FaCircleUser color="black" className="w-[32px] h-[32px] rounded-full object-cover cursor-pointer" />
                                    )}
                                </Dropdown>
                            </div>
                        ) :
                            <div className="ml-20 flex gap-6   ">
                                <h1 className="text-sm text-black font-semibold cursor-pointer" onClick={() => navigate('/auth/login')}>Login</h1>
                                <button className="text-sm text-black font-semibold border rounded-lg -mt-[5px] px-6 py-[4px] border-black  " onClick={() => navigate('/auth/signup')}>Register</button>
                            </div>
                        }

                    </div>

                </div>

            </div>
        </div>
    );
};

export default TopBar;
