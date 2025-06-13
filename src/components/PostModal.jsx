import { Button, Input, message, Modal, Select, Upload } from 'antd';
import JoditEditor from 'jodit-react';
import React, { useEffect, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import axiosInstance from '../api/axiosInstance';

const { Dragger } = Upload;

const PostModal = ({ open, handleDone, handleCancel, handleComplete, edit, id, handleEdit }) => {
    const [fetchLoading, setFetchLoading] = useState(false);
    
    console.log('edit', edit);
    console.log('id', id);
    
    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        gradeLevel: '',
        availableTimes: [],
        tags: [],
        description: '',
        image: null,
        locationType: '',
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchPostById = async () => {
        setFetchLoading(true);
        try {
            const response = await axiosInstance.get(`/jobs/${id}`);
            if (response.status === 200) {
                const data = response.data;
                setFormData({
                    title: data.title,
                    subject: data.subject,
                    gradeLevel: data.gradeLevel,
                    availableTimes: data.availableTimes,
                    tags: data.tags,
                    description: data.description,
                    image: data.image,
                    locationType: data.locationType,
                });
                setImagePreview(data.image);
            }
        } catch (error) {
            console.error('Error fetching post:', error);
            message.error('Failed to fetch post details');
        }
        setFetchLoading(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = async (file) => {
        try {
            const imageData = new FormData();
            imageData.append('file', file);
            
            const imageResponse = await axiosInstance.post('files/upload', imageData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (imageResponse.status === 201 && imageResponse.data.file) {
                const imagePath = imageResponse.data.file.path;
                setFormData({
                    ...formData,
                    image: imagePath
                });

                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);

                message.success('Image uploaded successfully');
            } else {
                message.error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            message.error('Failed to upload image only jpg, jpeg, png are allowed');
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
    
        // Validate required fields
        const requiredFields = ['title', 'subject', 'gradeLevel', 'description', 'locationType'];
        const missingFields = requiredFields.filter(field => !formData[field]);
        
        if (missingFields.length > 0) {
            message.error(`Please fill in: ${missingFields.join(', ')}`);
            setLoading(false);
            return;
        }
    
        try {
            // Prepare the post data as JSON
            const postData = {
                ...formData,
                tags: Array.isArray(formData.tags) ? formData.tags : [],
                availableTimes: Array.isArray(formData.availableTimes) ? formData.availableTimes : []
            };
    
            // Step 3: Send the JSON data to save the post
            let response;
            if (edit) {
                response = await axiosInstance.patch(`/jobs/${id}`, postData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                response = await axiosInstance.post('/jobs', postData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
    
            if (response.status === 200 || response.status === 201) {
                message.success(edit ? 'Post updated successfully' : 'Post created successfully');
                if (edit) {
                    handleEdit(response.data);
                } else {
                    handleComplete(response.data);
                }
                handleCloseModal();
            }
        } catch (error) {
            console.error('Error:', error);
            message.error(edit ? 'Failed to update post' : 'Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setFormData({
            title: '',
            subject: '',
            gradeLevel: '',
            availableTimes: [],
            tags: [],
            description: '',
            image: null,
            locationType: '',
        });
        setImagePreview(null);
        handleCancel();
    };

    useEffect(() => {
        if (edit && id) {
            fetchPostById();
        }
    }, [edit, id]);

    return (
        <Modal
            title={edit ? "Edit Post" : "Create Post"}
            centered
            footer={false}
            open={open}
            onCancel={handleCloseModal}
            width={'1000px'}
        >
            {fetchLoading ? (
                <div className='flex justify-center items-center h-[400px]'>
                    Loading...
                </div>
            ) : (
                <div className='p-6'>
                    <Dragger
                        name="file"
                        multiple={false}
                        beforeUpload={file => {
                            handleFileChange(file);
                            return false;
                        }}
                        capture="image/*"
                        action={null}
                        fileList={[]}
                        onRemove={() => setFormData(prev => ({ ...prev, image: null }))}
                        style={{ padding: '50px' }}
                    >
                        {imagePreview ? (
                            <div className="mt-4">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className='max-h-[500px] w-full object-cover rounded-xl'
                                />
                            </div>
                        ) : (
                            <div className='rounded-xl'>
                                <div className='flex justify-center'>
                                    <FiUpload size={40} />
                                </div>
                                <p className='text-center text-gray-300'>Drag drop / Upload Image</p>
                            </div>
                        )}
                    </Dragger>

                    <h1 className='text-[24px] font-[700] mt-6'>Post Information</h1>

                    <div className="grid grid-cols-2 gap-6 mt-4">
                        <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Title</h1>
                            <Input
                                name='title'
                                value={formData.title}
                                onChange={handleChange}
                                className='border rounded-xl py-[10px] pl-4 mt-[4px]'
                                placeholder='Enter title'
                            />
                        </div>
                        <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Subject</h1>
                            <Select
                                name='subject'
                                value={formData.subject}
                                onChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                                className="w-full rounded-xl h-10"
                                placeholder="Select subject"
                                options={[
                                    { value: 'Mathematics', label: 'Mathematics' },
                                    { value: 'Science', label: 'Science' },
                                    { value: 'English', label: 'English' },
                                    { value: 'History', label: 'History' },
                                    { value: 'Computer Science', label: 'Computer Science' }
                                ]}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-4">
                        <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Grade Level</h1>
                            <Select
                                value={formData.gradeLevel}
                                onChange={(value) => setFormData(prev => ({ ...prev, gradeLevel: value }))}
                                className="w-full rounded-xl h-10"
                                placeholder="Select grade level"
                                options={[
                                    { value: 'elementary', label: 'Elementary School' },
                                    { value: 'middle', label: 'Middle School' },
                                    { value: 'high', label: 'High School' },
                                    { value: 'college', label: 'College' }
                                ]}
                            />
                        </div>
                        <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Location Type</h1>
                            <Select
                                value={formData.locationType}
                                onChange={(value) => setFormData(prev => ({ ...prev, locationType: value }))}
                                className="w-full rounded-xl h-10"
                                placeholder="Select location type"
                                options={[
                                    { value: 'online', label: 'Online' },
                                    { value: 'offline', label: 'Offline' },
                                    { value: 'both', label: 'Both' }
                                ]}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-4">
                        <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Available Times</h1>
                            <Select
                                mode="tags"
                                value={formData.availableTimes}
                                onChange={(values) => setFormData(prev => ({ ...prev, availableTimes: values }))}
                                className="w-full rounded-xl h-10"
                                placeholder="Add available times"
                                options={[
                                    { value: 'Monday ', label: 'Monday  ' },
                                    { value: 'Wednesday ', label: 'Wednesday ' },
                                    { value: 'Friday ', label: 'Friday  ' },
                                    { value: 'Saturday ', label: 'Saturday ' }
                                ]}
                            />
                        </div>
                        <div>
                            <h1 className='text-[12px] text-gray-700 font-[500]'>Tags</h1>
                            <Select
                                mode="tags"
                                value={formData.tags}
                                onChange={(values) => setFormData(prev => ({ ...prev, tags: values }))}
                                className="w-full rounded-xl h-10"
                                placeholder="Add tags"
                            />
                        </div>
                    </div>

                    <div>
                        <h1 className='text-[12px] text-gray-700 font-[500] mt-4'>Description</h1>
                        <JoditEditor
                            value={formData.description}
                            onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            loading={loading}
                            onClick={handleSubmit}
                            className='bg-[#69CBF7] text-white rounded-xl px-6 py-2 mt-6'
                        >
                            {edit ? 'Update Post' : 'Create Post'}
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default PostModal;
