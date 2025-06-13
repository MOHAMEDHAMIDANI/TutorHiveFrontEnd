import { Input, message, Modal, Upload, Select } from 'antd';
import JoditEditor from 'jodit-react';
import React, { useEffect, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import axiosInstance from '../api/axiosInstance';

const { Dragger } = Upload;
const { Option } = Select;

const SubjectModal = ({ open, handleDone, handleCancel, setDone, setUpdateDone, edit }) => {
    const [name, setName] = useState(edit ? edit.name : '');
    const [price, setPrice] = useState(edit ? edit.price : '');
    const [description, setDescription] = useState(edit ? edit.description : '');
    const [image, setImage] = useState(edit ? edit.image : null);
    const [imageUrl, setImageUrl] = useState('');
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(edit ? true : false);
    const [subjects, setSubjects] = useState(edit ? edit.subjects : []);
    const [gradeLevels, setGradeLevels] = useState(edit ? edit.gradeLevels : []);
    const [locationType, setLocationType] = useState(edit ? edit.locationType : 'both');

    useEffect(() => {
        setLoading(edit ? true : false);
        if (edit) {
            // Update all fields when edit prop changes
            setName(edit.title);
            setPrice(edit.price);
            setDescription(edit.description);
            setImage(edit.image);
            setImageUrl(edit.image); // Set imageUrl from edit data
            setSubjects(edit.subjects);
            setGradeLevels(edit.gradeLevels);
            setLocationType(edit.locationType);
            setLoading(false);
        }
    }, [edit]);

    const handleImageUpload = async ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList.length > 0) {
            const file = newFileList[0].originFileObj;
            setImage(URL.createObjectURL(file));

            const imageFormData = new FormData();
            imageFormData.append('file', file);

            try {
                const response = await axiosInstance.post('/files/upload', imageFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setImageUrl(response.data.file?.path);
            } catch (error) {
                message.error('Failed to upload image');
            }
        }
    };

    const handleSubmit = async () => {
        const data = {
            title: name,
            image: imageUrl,
            description,
            price: parseFloat(price),
            status: { id: 0 },
            subjects,
            gradeLevels,
            locationType,
            userId: JSON.parse(localStorage.getItem('tutor_user')).id
        };

        try {
            let response;
            if (edit) {
                // If editing, make PATCH request
                response = await axiosInstance.patch(`/services/${edit.id}`, data);
                message.success('Subject updated successfully');
                if (response.status === 201 || response.status === 200) {
                    setUpdateDone(response.data);
                    handleClose();
                }

            } else {
                // If creating new, make POST request
                response = await axiosInstance.post('/services', data);
                message.success('Subject created successfully');
                if (response.status === 201 || response.status === 200) {
                    setDone(response.data);
                    handleClose();
                }

            }

        } catch (error) {
            message.error(edit ? 'Failed to update subject' : 'Failed to create subject');
        }
    };

    const handleClose = () => {
        handleCancel();
        setName('');
        setPrice('');
        setDescription('');
        setImage(null);
        setImageUrl('');
        setFileList([]);
        setSubjects([]);
        setGradeLevels([]);
        setLocationType('both');
    };

    return (
        <Modal
            title={edit ? "Edit Subject" : "Add Subject"}
            centered
            footer={false}
            open={open}
            onOk={() => handleDone()}
            onCancel={() => handleClose()}
            width={'70vh'}
        >
            {loading ? (
                <div className="flex justify-center items-center h-[300px]">Loading...</div>
            ) : (
                <div className="p-6">
                    <div>
                        <Dragger
                            multiple={false}
                            beforeUpload={() => false}
                            fileList={fileList}
                            onChange={handleImageUpload}
                            listType="picture"
                            style={{ padding: '50px' }}
                        >
                            <div className="rounded-xl">
                                {image ? (
                                    <div className="mt-4">
                                        <img
                                            src={image}
                                            alt="Subject Preview"
                                            className="w-full h-[100px] rounded-lg mt-2"
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex justify-center">
                                            <FiUpload size={40} />
                                        </div>
                                        <p className="text-center text-gray-300">Drag drop / Upload Image</p>
                                    </div>
                                )}
                            </div>
                        </Dragger>
                    </div>

                    <div className="mt-4">
                        <h1 className="text-[12px] text-gray-700 font-[500]">Name</h1>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border rounded-xl py-[10px] pl-4 mt-[4px]"
                            placeholder="Enter Name"
                        />
                    </div>

                    <div className="mt-4">
                        <h1 className="text-[12px] text-gray-700 font-[500]">Price</h1>
                        <Input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="border rounded-xl py-[10px] pl-4 mt-[4px]"
                            placeholder="Enter Price"
                            type="number"
                        />
                    </div>

                    <div className="mt-4">
                        <h1 className="text-[12px] text-gray-700 font-[500]">Subjects</h1>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Select subjects"
                            value={subjects}
                            onChange={setSubjects}
                            className="mt-[4px]"
                        >
                            <Option value="Mathematics">Mathematics</Option>
                            <Option value="Physics">Physics</Option>
                            <Option value="Computer Science">Computer Science</Option>
                        </Select>
                    </div>

                    <div className="mt-4">
                        <h1 className="text-[12px] text-gray-700 font-[500]">Grade Levels</h1>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Select grade levels"
                            value={gradeLevels}
                            onChange={setGradeLevels}
                            className="mt-[4px]"
                        >
                            <Option value="High School">High School</Option>
                            <Option value="University">University</Option>
                            <Option value="Graduate">Graduate</Option>
                        </Select>
                    </div>

                    <div className="mt-4">
                        <h1 className="text-[12px] text-gray-700 font-[500]">Location Type</h1>
                        <Select
                            style={{ width: '100%' }}
                            value={locationType}
                            onChange={setLocationType}
                            className="mt-[4px]"
                        >
                            <Option value="online">Online</Option>
                            <Option value="offline">Offline</Option>
                            <Option value="both">Both</Option>
                        </Select>
                    </div>

                    <div>
                        <h1 className="text-[12px] text-gray-700 font-[500] mt-4">Description</h1>
                        <JoditEditor value={description} onChange={(e) => setDescription(e)} />
                    </div>

                    <div className="w-full mt-6">
                        <button
                            onClick={handleSubmit}
                            className="bg-[#69CBF8] w-full text-white font-[700] rounded-xl px-6 py-2 mt-4"
                        >
                            {edit ? 'Update Subject' : 'Add Subject'}
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default SubjectModal;
