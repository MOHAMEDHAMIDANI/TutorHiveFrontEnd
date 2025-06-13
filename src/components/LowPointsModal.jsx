import React from 'react'
import { Modal } from 'antd'
import { FaPlus } from 'react-icons/fa'

const LowPointsModal = ({ open, handleCancel, pointsNeeded, handleAdd }) => {
    return (
        <Modal
            // title="Low Points"
            open={open}
            onCancel={handleCancel}
            footer={null}
            width={600}
            centered
        >
            <div className="p-4  ">
                <h2 className="text-xl font-medium mb-4 max-w-[400px]  ">
                    Need more {pointsNeeded} points for book this session
                </h2>

                <div className='flex flex-col items-center justify-center'>

                <p className="text-gray-500 text-sm mb-6">
                    You can add more points from your bank account
                </p>

                <button 
                    onClick={handleAdd}
                    className="w-[80px] h-[80px] rounded-full bg-[#F0FAFF] text-[#69CBF7] flex items-center justify-center hover:bg-[#e1f5ff]"
                >
                    <FaPlus size={24} />
                </button>
                </div>

            </div>
        </Modal>
    )
}

export default LowPointsModal
