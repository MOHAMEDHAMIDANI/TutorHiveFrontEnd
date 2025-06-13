import React, { useState } from 'react'
import { Input, message, Select } from 'antd'
import { CiSearch } from 'react-icons/ci'

const FilterCourse = ({ findTutor = false, post = false, handleSubmit, fitlerPost = false }) => {


    const [filters, setFilters] = useState({
        subjects: null,
        gradeLevels: null,
        // availability: '',
        // location: '',
        // mode: '',
        // rating: ''
    })

    const [availableDays, setAvailableDays] = useState([])
    const handleAvailableDaysChange = (values) => {
        setAvailableDays(values)
        setFilters({
            ...filters,
            availableDays: values
        })
    }


    const handleChange = (e, field) => {
        let value = e.target.value

        // Validation for rating field
        if (field === 'rating') {
            if (isNaN(value) || value < 0 || value > 5) {
                message.error('Rating must be a number between 0 and 5')
                return
            }
        }

        setFilters({
            ...filters,
            [field]: value
        })
    }

    const [tags, setTags] = useState([]);

    const handleTagChange = (values) => {
        setTags(values);
        setFilters({
            ...filters,
            tags: values
        });
    };



    const handleSearch = () => {
        const formattedFilters = {
            ...filters,
            // Convert subjects to an array if it's not empty
            subjects: filters.subjects ? [filters.subjects] : undefined,
            // Convert gradeLevels to an array if it's not empty
            gradeLevels: filters.gradeLevels ? [filters.gradeLevels] : undefined,
            // Convert hourlyRate and rating to numbers if they are not empty
            hourlyRate: filters.hourlyRate ? parseFloat(filters.hourlyRate) : undefined,
            minRating: filters.minRating ? parseFloat(filters.minRating) : undefined,
            // availableDays is already an array, no need to format
        };

        console.log('Formatted Filter Values:', { filters: formattedFilters });
        message.success('Filters applied successfully');
        handleSubmit({ filters: formattedFilters }); // Pass the formatted filters to handleSubmit
    };

    const handleReset = () => {
        setFilters({
            subject: '',
            gradeLevel: '',
            availability: '',
            location: '',
            mode: '',
            minRating: '',
            hourlyRate: '',
            locationType: null,
            searchQuery: ''

        })
        message.info('Filters have been reset')
    }

    return (
        <div>
            {findTutor && (
                <div className='flex justify-center mb-2'>
                    <div className='border rounded-full bg-white flex items-center px-6 '>
                        <CiSearch size={24} />
                        <input type="text" value={filters?.searchQuery} onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })} placeholder='Search...' className='rounded-full focus:outline-none p-[7px] px-2 w-[30rem]' />
                    </div>
                </div>
            )}

            <div className='bg-white rounded-2xl p-6 shadow-md shadow-gray-200'>
                <h1 className='text-xl font-semibold'>Filter {post ? 'Post' : 'Course'}</h1>


                <div className="grid grid-cols-3 gap-6 mt-4 max-md:grid-cols-2 ">
                    {/* <select
                        value={filters.subjects}
                        onChange={(e) => handleChange(e, 'subjects')}
                        className='border-black border px-2 rounded-xl max-md:text-[10px] bg-white py-2'
                    >
                        <option value="" disabled>Select Subject</option>
                        <option value="physics">Physics</option>
                        <option value="math">Math</option>
                        <option value="chemistry">Chemistry</option>
                    </select> */}

                    {/* <select
                        value={filters.gradeLevels}
                        onChange={(e) => handleChange(e, 'gradeLevels')}
                        className='border-black border px-2 rounded-xl max-md:text-[10px] bg-white py-2'
                    >
                        <option value="" disabled>Select Grade Level</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="highSchool">High School</option>
                    </select> */}
                    <Select
                        value={filters.subjects}
                        onChange={(e) => setFilters({ ...filters, subjects: e })}
                        className="border-black border rounded-md max-md:text-[10px] bg-white h-10"
                        placeholder="Select Subjects"
                        options={[
                            { value: 'math', label: 'Math' },
                            { value: 'science', label: 'Science' },
                            { value: 'english', label: 'English' },
                            { value: 'history', label: 'History' },
                            { value: 'geography', label: 'Geography' },
                            { value: 'computer', label: 'Computer' },
                            { value: 'art', label: 'Art' },
                            { value: 'music', label: 'Music' },
                            { value: 'physical_education', label: 'Physical Education' },
                            { value: 'health', label: 'Health' },
                            { value: 'foreign_language', label: 'Foreign Language' },
                            { value: 'career_technical_education', label: 'Career Technical Education' },
                            { value: 'special_education', label: 'Special Education' },
                            { value: 'other', label: 'Other' }
                            // { value: 'adult', label: 'Adult Education' }
                        ]}
                    />

                    <Select
                        value={filters.gradeLevels}
                        onChange={(e) => setFilters({ ...filters, gradeLevels: e })}
                        className="border-black border rounded-md max-md:text-[10px] bg-white h-10"
                        placeholder="Select Subjects"
                        options={[
                            { value: 'elementary', label: 'Elementary School' },
                            { value: 'middle', label: 'Middle School' },
                            { value: 'high', label: 'High School' },
                            { value: 'college', label: 'College/University' },
                            // { value: 'adult', label: 'Adult Education' }
                        ]}
                    />


                    {fitlerPost && (
                        <Select
                            mode="tags"
                            value={tags}
                            placeholder='Select Tags'
                            onChange={handleTagChange}
                            className="border-black border rounded-md max-md:text-[10px] bg-white "
                        />
                    )}



                    {!fitlerPost && (
                        <Select
                            mode='multiple'
                            value={availableDays}
                            placeholder='Select Availability'
                            onChange={handleAvailableDaysChange}
                            className="border-black border rounded-md max-md:text-[10px] bg-white "
                        >
                            <Select.Option value="monday">Monday</Select.Option>
                            <Select.Option value="tuesday">Tuesday</Select.Option>
                            <Select.Option value="wednesday">Wednesday</Select.Option>
                            <Select.Option value="thursday">Thursday</Select.Option>
                            <Select.Option value="friday">Friday</Select.Option>
                            <Select.Option value="saturday">Saturday</Select.Option>
                            <Select.Option value="sunday">Sunday</Select.Option>
                        </Select>
                    )}

                    {!fitlerPost && (
                        // <input
                        //     type="text"
                        //     placeholder='Enter Price'
                        //     value={filters.hourlyRate}
                        //     onChange={(e) => handleChange(e, 'hourlyRate')}
                        //     className='border-black border px-2 rounded-xl max-md:text-[10px] py-2'
                        // />
                        <Input type="number" placeholder='Enter Price' value={filters.hourlyRate} onChange={(e) => handleChange(e, 'hourlyRate')} className='border-black border px-2 rounded-md max-md:text-[10px] py-2' />
                    )}

                    {!fitlerPost && (
                        // <select
                        //     value={filters.locationType}
                        //     onChange={(e) => handleChange(e, 'locationType')}
                        //     className='border-black border px-2 rounded-xl max-md:text-[10px] bg-white py-2'
                        // >
                        //     <option value="" selected disabled>Location Type</option>
                        //     <option value="online">Online</option>
                        //     <option value="offline">Offline</option>
                        //     <option value="both">Both</option>
                        // </select>

                        <Select
                            value={filters.locationType}
                            onChange={(e) => setFilters({ ...filters, locationType: e })}
                            className="border-black border rounded-md max-md:text-[10px] bg-white h-10"
                            placeholder="Select Location Type"
                            options={[
                                { value: 'online', label: 'Online' },
                                { value: 'offline', label: 'Offline' },
                                { value: 'both', label: 'Both' },
                            ]}
                        />

                    )}

                    {!fitlerPost && (
                        // <input
                        //     type="number"
                        //     placeholder='Minimum Rating (0-5)'
                        //     value={filters.minRating}
                        //     onChange={(e) => handleChange(e, 'minRating')}
                        //     min="0"
                        //     max="5"
                        //     className='border-black border px-2 rounded-xl max-md:text-[10px] py-2'
                        // />

                        <Input type="number" placeholder='Minimum Rating (0-5)' value={filters.minRating} onChange={(e) => handleChange(e, 'minRating')} min="0" max="5" className='border-black border px-2 rounded-md max-md:text-[10px] py-2' />
                    )}
                </div>

                <div className='flex justify-end max-md:flex-col gap-2 mt-6'>
                    {/* {findTutor && (
                        <button className='border border-black px-8 py-2 rounded-xl text-black'>My Post</button>
                    )} */}
                    <button onClick={handleReset} className='border border-primary1 px-8 py-2 rounded-xl text-primary1'>Reset</button>
                    <button onClick={handleSearch} className='bg-primary1 text-white px-8 py-2 rounded-xl'>Search</button>
                </div>
            </div>
        </div>
    )
}

export default FilterCourse
