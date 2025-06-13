import { Modal, Rate, Upload } from 'antd';
import { AiOutlineLogout } from 'react-icons/ai';
import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const RatingModal = ({ open, handleDone, handleCancel, data }) => {
    const [knowledgeAndExpertise, setKnowledgeAndExpertise] = useState(0);
    const [communicationSkills, setCommunicationSkills] = useState(0);
    const [preparednessAndOrganization, setPreparednessAndOrganization] = useState(0);
    const [reliabilityAndPunctuality, setReliabilityAndPunctuality] = useState(0);
    const [professionalism, setProfessionalism] = useState(0);
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);

    console.log('data', data);
    

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.post('/reviews', {
                knowledgeAndExpertise,
                communicationSkills,
                preparednessAndOrganization,
                reliabilityAndPunctuality,
                professionalism,
                summary,
                tutorId: Number(data?.tutor?.id),
                serviceId: data?.service?.id
            });
            console.log('response', response);

            if (response.data) {
                handleCancel();
                setLoading(false);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error submitting review:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title='Share your feedback'
            centered
            footer={false}
            open={open}
            onOk={() => handleDone()}
            onCancel={() => handleCancel()}
            width={'564px'}
        >
            <div className='p-6'>
                <div>
                    <h1 className='text-[16px] text-gray-700 font-[500] mt-6'>Knowledge and Expertise</h1>
                    <div className="flex justify-center mt-2">
                        <div>
                            <Rate 
                                style={{fontSize: 36}}
                                value={knowledgeAndExpertise}
                                onChange={setKnowledgeAndExpertise}
                            />
                            <h1 className='text-[12px] mt-2 text-gray-700 font-[500] text-center'>How would you rate the tutor's knowledge?</h1>
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className='text-[16px] text-gray-700 font-[500] mt-6'>Communication Skills</h1>
                    <div className="flex justify-center mt-2">
                        <div>
                            <Rate
                                style={{fontSize: 36}}
                                value={communicationSkills}
                                onChange={setCommunicationSkills}
                            />
                            <h1 className='text-[12px] mt-2 text-gray-700 font-[500] text-center'>How would you rate the tutor's communication?</h1>
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className='text-[16px] text-gray-700 font-[500] mt-6'>Preparedness & Organization</h1>
                    <div className="flex justify-center mt-2">
                        <div>
                            <Rate
                                style={{fontSize: 36}}
                                value={preparednessAndOrganization}
                                onChange={setPreparednessAndOrganization}
                            />
                            <h1 className='text-[12px] mt-2 text-gray-700 font-[500] text-center'>How prepared and organized was the tutor?</h1>
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className='text-[16px] text-gray-700 font-[500] mt-6'>Reliability & Punctuality</h1>
                    <div className="flex justify-center mt-2">
                        <div>
                            <Rate
                                style={{fontSize: 36}}
                                value={reliabilityAndPunctuality}
                                onChange={setReliabilityAndPunctuality}
                            />
                            <h1 className='text-[12px] mt-2 text-gray-700 font-[500] text-center'>How reliable and punctual was the tutor?</h1>
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className='text-[16px] text-gray-700 font-[500] mt-6'>Professionalism</h1>
                    <div className="flex justify-center mt-2">
                        <div>
                            <Rate
                                style={{fontSize: 36}}
                                value={professionalism}
                                onChange={setProfessionalism}
                            />
                            <h1 className='text-[12px] mt-2 text-gray-700 font-[500] text-center'>How professional was the tutor?</h1>
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className='text-[14px] text-gray-700 font-[500] mt-6'>Summary</h1>
                    <textarea 
                        className='focus:outline-primary1 w-full rounded-lg min-h-[179px] border-[1.5px] border-gray-400 p-4'
                        placeholder='Write review here'
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                    />
                </div>

                <button 
                    className='bg-primary1 py-2 rounded-lg w-full text-white mt-6'
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit Review'}
                </button>
            </div>
        </Modal>
    );
};

export default RatingModal;
