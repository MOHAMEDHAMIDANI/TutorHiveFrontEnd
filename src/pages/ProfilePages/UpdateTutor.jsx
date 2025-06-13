import { Checkbox, Form, Input, message, Select, Upload, TimePicker, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import subject1 from '../../assets/sub1.png';
import subject2 from '../../assets/sub2.png';
import SubjectModal from '../../components/SubjectModal';
import moment from 'moment';
import axiosInstance from '../../api/axiosInstance';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AvailableDaysComponent from '../../components/AvailableDaysComponent';

const UpdateTutor = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [openSubjectModal, setOpenSubjectModal] = useState(false);
    const [form] = Form.useForm();
    const userDetail = JSON.parse(localStorage.getItem('tutor_user'));
    const [imageUrl, setImageUrl] = useState();
    const [description, setDescription] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [name, setName] = useState('');
    const [availableDays, setAvailableDays] = useState([]);
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [submitLoading, setSubmitLoading] = useState(false);

    const [uploadLoading, setUplodingLoading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState();


    const toggleSubjectModal = () => setOpenSubjectModal(!openSubjectModal);
    const [selectedSubject, setSelectedSubject] = useState();

    const updateSubject = async (data) => {
        setSelectedSubject(data);
        toggleSubjectModal();
    };

    const addADay = (day) => {
        setAvailableDays([...availableDays, { day, timeSlots: [{ from: moment("09:00", "HH:mm"), to: moment("17:00", "HH:mm") }], isAvailable: true }]);
    }

    const removeADay = (day) => {
        setAvailableDays(availableDays.filter(d => d.day !== day));
    }
    const removeUnavailableDate = (date) => {
        setUnavailableDates(unavailableDates.filter(d => d.date !== date));
    }

    const updateTimeSlot = (day, index, time) => {
        const allDays = JSON.parse(JSON.stringify(availableDays));
        const dayToUpdate = allDays.find(d => d.day === day);
        const dayToUpdateIndex = allDays.findIndex(d => d.day === day);

        console.log('dayToUpdate', dayToUpdate);

        console.log('dayToUpdateIndex', dayToUpdateIndex);

        console.log('time', time);

        if (dayToUpdate && dayToUpdate.timeSlots[index]) {
            console.log('dayToUpdate.timeSlots[index]', dayToUpdate.timeSlots[index]);
            dayToUpdate.timeSlots[index] = {
                ...dayToUpdate.timeSlots[index],
                ...time
            };

            allDays[dayToUpdateIndex] = dayToUpdate;
            const updatedDays = JSON.parse(JSON.stringify(allDays));
            setAvailableDays(updatedDays);

            console.log('allDays', allDays);
        }
    }

    const addUnavailableDate = (date) => {
        setUnavailableDates([...unavailableDates, { date, timeSlots: [{ from: moment("09:00", "HH:mm"), to: moment("17:00", "HH:mm") }] }]);
    }

    const updateUnavailableTimeSlot = (date, index, time) => {
        const allDates = JSON.parse(JSON.stringify(unavailableDates));
        const dateToUpdate = allDates.find(d => d.date === date);
        const dateToUpdateIndex = allDates.findIndex(d => d.date === date);
        dateToUpdate.timeSlots[index] = { ...dateToUpdate.timeSlots[index], ...time };
        allDates[dateToUpdateIndex] = dateToUpdate;
        setUnavailableDates(allDates);
    }

    const handleUpdateSubjects = (data) => {
        setSubjects([...subjects, data]);
    };

    useEffect(() => {
        console.log('availableDays changed', availableDays);
    }, [availableDays]);

    const fetchUserByEmail = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/users/${userDetail?.id}`);
            const userData = response?.data;
            if (userData) {
                form.setFieldsValue({
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                    phone: userData.phone || '',
                    qualification: userData.qualification || '',
                    experience: userData.experience || '',
                    hourlyRate: userData.hourlyRate || '',
                    subjects: userData.subjects || [],
                    gradeLevel: userData.gradeLevels || [],
                    tags: userData.tags || []
                });
                setDescription(userData.description || '');
                setName(userData.firstName || '');
                setImageUrl(userData.photo?.path);
                setSubjects(userData.services || []);
                setAvailableDays(userData.availableDays || []);
                setUnavailableDates(userData.unavailableDates || []);
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

    const handleImageChange = async ({ file }) => {
        setUplodingLoading(true)
        try {
            // Preview image immediately
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);

            // Upload image immediately
            const formData = new FormData();
            formData.append('file', file);

            const uploadResponse = await axiosInstance.post('/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (uploadResponse.status === 201) {
                setUploadedImage(uploadResponse.data);
                console.log('here i am in the update use profile', uploadResponse?.data);
                

                
                    const response = await axiosInstance.patch(`/users`, {
                        photo: {
                            id: uploadResponse?.data?.file?.id
                        }
                    });
             

                    console.log('user got updated' , response );


                    message.success('Image uploaded successfully');
                    setUplodingLoading(false)
                }
            } catch (error) {
                message.error('Failed to upload image only jpg, jpeg, png files are allowed');
                console.error('Upload error:', error);
                setUplodingLoading(false)
            }
        };

        const validateForm = () => {
            if (!form.getFieldValue('qualification')) {
                message.error('Please enter your qualification');
                return false;
            }
            if (!form.getFieldValue('experience')) {
                message.error('Please enter your experience');
                return false;
            }
            if (!form.getFieldValue('hourlyRate')) {
                message.error('Please enter a valid hourly rate');
                return false;
            }
            if (!subjects.length) {
                message.error('Please select at least one service');
                return false;
            }
            if (!availableDays.length) {
                message.error('Please add your available days and time slots');
                return false;
            }
            if (!form.getFieldValue('subjects')) {
                message.error('Please select at least one subject');
                return false;
            }
            if (!form.getFieldValue('gradeLevel')) {
                message.error('Please select grade levels');
                return false;
            }
            return true;
        };

        const onFinish = async () => {
            setSubmitLoading(true);
            if (!validateForm()) {
                setSubmitLoading(false);
                return;
            }

            const formData = form.getFieldsValue();

            console.log('avaiwsdjfskladfj', availableDays);

            const tutorData = {
                qualification: formData.qualification,
                experience: formData.experience,
                hourlyRate: parseInt(formData.hourlyRate),
                services: subjects.map(subject => subject.id),
                availableDays: availableDays,
                unavailableDates: unavailableDates,
                subjects: formData.subjects,
                gradeLevels: formData.gradeLevel,
                tags: formData.tags,
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                description: description,

            };



            try {
                const response = await axiosInstance.patch(`/users`, tutorData);
                if (response.status === 200) {
                    message.success('Profile updated successfully');
                    // navigate('/profile');
                    // window.location.reload();
                    fetchUserByEmail();
                    setSubmitLoading(false);


                }
                setSubmitLoading(false);
            } catch (error) {
                message.error(error?.response?.data?.message || 'Failed to update profile');
            } finally {
                setSubmitLoading(false);
            }
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

        const handleUpdateSpecificSubject = async (data) => {
            const updatedSubjects = subjects.map(subject => {
                if (subject.id === data.id) {
                    return data;
                }
                return subject;
            });
            setSubjects(updatedSubjects);
        }

        if (loading) {
            return <div className='h-[70vh] flex justify-center items-center'>
                <Spin size='large' />
            </div>;
        }

        return (
            <div className="w-full flex-0.7">
                <SubjectModal open={openSubjectModal} handleCancel={toggleSubjectModal} setDone={handleUpdateSubjects} setUpdateDone={handleUpdateSpecificSubject} edit={selectedSubject} />
                <h1 className="text-[20px] font-[700] mb-2">Update Profile</h1>
                <div className="bg-white px-20 max-md:px-4 py-10 rounded-xl w-full">
                    <Form form={form} >
                        <div className="flex justify-center -mt-[4rem]">
                            <div>
                                <Upload
                                    name="avatar"
                                    listType="picture-circle"
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    onChange={handleImageChange}

                                >
                                    {imageUrl ? (
                                        <div className='relative'>
                                            <img
                                                src={imageUrl}
                                                alt={'user name'}
                                                className='rounded-full object-cover w-[90px] h-[90px]'
                                            />
                                            {uploadLoading ? (
                                                <div className='absolute top-0 left-0  bg-black bg-opacity-50 rounded-full w-[90px] h-[90px] flex justify-center items-center'>
                                                    <Spin />
                                                </div>
                                            ) : null}
                                        </div>
                                    ) : (
                                        <PlusOutlined />
                                    )}
                                </Upload>
                                <h1 className="text-[18px] font-[700] text-center mb-4">{name}</h1>
                            </div>
                        </div>

                        <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>First Name</h1>
                            <Form.Item name="firstName">
                                <Input className="border rounded-xl py-[15px] pl-4 mt-[4px]" placeholder="Enter First Name" />
                            </Form.Item>
                        </div>

                        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6 mt-2">
                            <div>
                                <h1 className='text-[12px] text-gray-700 font-[500]'>Last Name</h1>
                                <Form.Item name="lastName">
                                    <Input className="border rounded-xl py-[15px] pl-4 mt-[4px]" placeholder="Enter Last Name" />
                                </Form.Item>
                            </div>
                            <div>
                                <h1 className='text-[12px] text-gray-700 font-[500]'>Phone</h1>
                                <Form.Item name="phone">
                                    <Input className="border rounded-xl py-[15px] pl-4 mt-[4px]" placeholder="Phone" />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6 mt-2">
                            <div>
                                <h1 className='text-[12px] text-gray-700 font-[500]'>Qualification</h1>
                                <Form.Item name="qualification">
                                    <Input className="border rounded-xl py-[15px] pl-4 mt-[4px]" placeholder="Enter Qualification" />
                                </Form.Item>
                            </div>
                            <div>
                                <h1 className='text-[12px] text-gray-700 font-[500]'>Experience</h1>
                                <Form.Item name="experience">
                                    <Input className="border rounded-xl py-[15px] pl-4 mt-[4px]" placeholder="Enter Experience" />
                                </Form.Item>
                            </div>
                        </div>

                        <AvailableDaysComponent
                            availableDays={availableDays}
                            addADay={addADay}
                            removeADay={removeADay}
                            updateTimeSlot={updateTimeSlot}
                            unavailableDates={unavailableDates}
                            addUnavailableDate={addUnavailableDate}
                            updateUnavailableTimeSlot={updateUnavailableTimeSlot}
                            removeUnavailableDate={removeUnavailableDate}
                        />

                        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6 mt-6">
                            <div>
                                <h1 className='text-[12px] text-gray-700 font-[500]'>Hourly Rate</h1>
                                <Form.Item name="hourlyRate" rules={[{ required: true, message: 'Please enter hourly rate' }]}>
                                    <Input className="border rounded-xl py-[15px] pl-4 mt-[4px]" placeholder="Enter Hourly Rate" />
                                </Form.Item>
                            </div>
                            <div>
                                <h1 className='text-[12px] text-gray-700 font-[500]'>Subjects</h1>
                                <Form.Item name="subjects" rules={[{ required: true, message: 'Please select subjects' }]}>
                                    <Select
                                        mode="multiple"
                                        className="rounded-xl mt-[4px] h-14"
                                        placeholder="Select Subjects"
                                        options={[
                                            { value: 'math', label: 'Math' },
                                            { value: 'science', label: 'Science' },
                                            { value: 'english', label: 'English' },
                                            { value: 'history', label: 'History' }
                                        ]}
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6 mt-2">
                            <div>
                                <h1 className='text-[12px] text-gray-700 font-[500]'>Grade Level</h1>
                                <Form.Item name="gradeLevel" rules={[{ required: true, message: 'Please select grade level' }]}>
                                    <Select
                                        mode="multiple"
                                        className="rounded-xl mt-[4px] h-14"
                                        placeholder="Select Grade Level"
                                        options={[
                                            { value: 'elementary', label: 'Elementary School' },
                                            { value: 'middle', label: 'Middle School' },
                                            { value: 'high', label: 'High School' },
                                            { value: 'college', label: 'College/University' }
                                        ]}
                                    />
                                </Form.Item>
                            </div>
                            <div>
                                <h1 className='text-[12px] text-gray-700 font-[500]'>Tags</h1>
                                <Form.Item name="tags">
                                    <Select
                                        mode="tags"
                                        className="rounded-xl mt-[4px] h-14"
                                        placeholder="Select Goals"
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="mt-2">
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Description</h1>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border rounded-xl py-[15px] pl-4 mt-[4px] w-full min-h-[153.046px]"
                                placeholder="Enter Description"
                            />
                        </div>

                        <div className="flex max-md:flex-col-reverse justify-between mt-4">
                            <div className="flex gap-6">
                                {['Subject'].map((item, index) => (
                                    <h1
                                        key={index}
                                        className={`${selectedIndex === index
                                            ? 'text-primary1 border-b-primary1 border-b-2'
                                            : 'hover:text-primary1 hover:border-b-primary1 border-b-white'
                                            } border-b-2 font-[600] text-[16px] cursor-pointer`}
                                        onClick={() => setSelectedIndex(index)}
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
                            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6 mt-10 pb-20">
                                {subjects.map((item, index) => (
                                    <div key={index} className={`bg-white rounded-xl shadow-md shadow-gray-100 relative`}>
                                        <div>
                                            <img
                                                src={item.image}
                                                alt=""
                                                className="object-cover max-h-[400px] max-w-[300px] w-full rounded-xl m-auto"
                                            />
                                            <div className="p-4">
                                                <h1 className="text-black text-[16px] font-[600] my-2">Name</h1>
                                                <p className="text-black text-[14px] font-[400]">{item.title}</p>
                                                <h1 className="text-black text-[16px] font-[600] my-2">Price</h1>
                                                <p className="text-black text-[14px] font-[400]">{item.price}</p>
                                                <h1 className="text-black text-[16px] font-[600] my-2">Description</h1>
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

                        <div className="flex gap-2 mb-6">
                            <Checkbox />
                            <h1 className="text-sm font-semibold text-gray-400">
                                Accept Privacy Policy Discover Your Professional Journey Highlighting Your Skills and
                                Achievements.
                            </h1>
                        </div>

                        <div className="flex max-md:flex-col-reverse max-md:gap-0 justify-end items-center gap-6">
                            <button
                                type="button"
                                onClick={() => navigate('/profile')}
                                className="bg-white border-[1px] border-primary1 px-10 font-[700] text-primary1 rounded-xl py-2">
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={onFinish}
                                className="bg-primary1 px-10 font-[700] text-white rounded-xl py-2"
                            >
                                {submitLoading ? <Spin size='small' /> : 'Update Profile'}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    };

    export default UpdateTutor;
