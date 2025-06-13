import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import SubjectModal from "../../components/SubjectModal";
import { message } from "antd";

const TutorSubjects = () => {

    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [subjectModal, setSubjectModal] = useState(false);
    const [loading, setLoading] = useState(false);

 
    const toggleSubjectModal = () => setSubjectModal(!subjectModal);
    
    const updateSubject = async (data) => {
        setSelectedSubject(data);
        toggleSubjectModal();
    };

    const handleUpdateSubjects = (data) => {
        setSubjects([...subjects, data]);
    };

    const handleUpdateSpecificSubject = (data) => {
        const updatedSubjects = subjects.map((item) => {
            if (item.id === data.id) {
                return data;
            }
            return item;
        });
        setSubjects(updatedSubjects);
    };

    const deleteSubject = async (id) => {
        try {
            const response = await axiosInstance.delete(`/services/${id}`);
            if (response.status === 200) {
                message.success('Subject deleted successfully');
                setSubjects(subjects.filter(subject => subject.id !== id));
            }
        } catch (error) {
            message.error('Failed to delete subject');
        }
    };


    const userDetail = JSON.parse(localStorage.getItem('tutor_user'));


    const fetchUserByEmail = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/users/${userDetail?.id}`);
            const userData = response?.data;
            if (userData) {
                setSubjects(userData.services || []);
            }
            setLoading(false);
        } catch (error) {
            message.error('Failed to fetch user details');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserByEmail();
    }, []);

    return (
        <>
            <SubjectModal open={subjectModal} handleCancel={toggleSubjectModal} setDone={handleUpdateSubjects} setUpdateDone={handleUpdateSpecificSubject} edit={selectedSubject} />

            <div className="flex max-md:flex-col-reverse justify-between mt-4">

                <div className="flex gap-6">
                    {['Subject'].map((item, index) => (
                        <h1
                            key={index}
                            className={`${'true'
                                ? 'text-primary1 border-b-primary1 border-b-2'
                                : 'hover:text-primary1 hover:border-b-primary1 border-b-white'
                                } border-b-2 font-[600] text-[16px] cursor-pointer`}

                        >
                            {item}
                        </h1>
                    ))}
                </div>
                <div
                    onClick={() => {
                        setSelectedSubject(null)
                        toggleSubjectModal()
                    }}
                    className="px-6 py-2 max-md:ml-auto rounded-lg border-[1.5px] border-black font-[600] text-[16px]"
                >
                    Add Subject
                </div>
            </div>

            <div className="mt-4">
                <div className="grid grid-cols-3 max-md:grid-cols-1 gap-6 mt-10 pb-20">
                    {subjects.map((item, index) => (
                        <div key={index} className={`bg-white rounded-xl shadow-md shadow-gray-100 relative   `}>
                            <div>
                                <div className="">
                                <img
                                    src={item.image}
                                    alt=""
                                    className="bg-cover max-h-[150px]   w-full rounded-xl m-auto"
                                    />
                                    </div>
                                <div className="p-4">
                                    <div className="flex gap-4 items-center">
                                    <h1 className="text-black text-[16px] font-[600]  placeholder:">Name :</h1>
                                    <p className="text-black text-[14px] font-[400]">{item.title}</p>
                                    </div>
                                    <div className="flex gap-4 items-center  ">
                                    <h1 className="text-black text-[16px] font-[600]  ">Price :</h1>
                                    <p className="text-black text-[14px] font-[400]">{item.price}</p>
                                    </div>
                                    <h1 className="text-black text-[16px] font-[600]  ">Description :</h1>
                                    <p
                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                        className="text-black text-[14px] font-[400]"
                                    />
                                    <div className="flex gap-6 justify-end">
                                        <button
                                            type="button"
                                            onClick={() => updateSubject(item)}
                                            className="bg-white border-[1px] border-primary1 px-6 font-[700] text-primary1 rounded-xl py-[5px] mt-4"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteSubject(item?.id)}
                                            className="bg-primary1 px-6 font-[700] text-white rounded-xl py-[5px] mt-4"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}
export default TutorSubjects;