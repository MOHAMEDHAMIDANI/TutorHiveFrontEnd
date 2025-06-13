import { Input, message, Modal, Select, Upload } from 'antd'
import JoditEditor from 'jodit-react';
import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai';
import { FaLock } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';

const { Dragger } = Upload;

const LogoutModal = ({ open, handleDone, handleCancel }) => {

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('login')
        handleCancel()
        navigate('/')
        message.success('Logout Successful')
    }

    return (
        <Modal
            centered
            footer={false}
            open={open}
            onOk={() => handleDone()}
            onCancel={() => handleCancel()}
            width={'464px'}
        >
            <div className='p-6'>

                <div className='flex justify-center'>
                    <div className='bg-sky-200 p-[4px]  rounded-full' >
                        <div className='bg-sky-300 p-[4px] rounded-full'>
                            <div className='bg-primary1 p-4 rounded-full'>
                                <AiOutlineLogout size={30} color='white' />
                            </div>
                        </div>
                    </div>
                </div>

                <h1 className='text-[24px] font-[700] mt-2 text-center'>Logout</h1>
                <h1 className='text-[12px] text-gray-700 font-[500] text-center'>Are you sure you want to logout?</h1>
                <button onClick={() => logout()} className='bg-primary1 py-2 rounded-lg w-full text-white mt-6'>
                    Continue
                </button>

            </div>
        </Modal>
    )
}

export default LogoutModal
