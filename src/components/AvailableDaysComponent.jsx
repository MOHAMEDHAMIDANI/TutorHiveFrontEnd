import { Form, message, Select } from 'antd';
import React from 'react';
import moment from 'moment';
import { AiFillDelete } from 'react-icons/ai';

const AvailableDaysComponent = ({ availableDays, addADay, removeADay, updateTimeSlot, unavailableDates, addUnavailableDate, updateUnavailableTimeSlot , removeUnavailableDate }) => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Handle adding available day with time slot
    const handleAddAvailableDay = (day) => {
        if (availableDays.find(d => d.day === day)) {
            message.warning('This day is already added');
            return;
        }
        addADay(day);
    };

    // Handle time change for available days
    const handleTimeChange = (day, index, time) => {
        console.log('time', time);
        updateTimeSlot(day, index, time);
    };

    // Handle time change for unavailable dates
    const handleUnavailableTimeChange = (date, index, time) => {
        updateUnavailableTimeSlot(date, index, time);
    };

  


    // Handle adding unavailable date
    const handleAddUnavailableDate = (date) => {
        if (unavailableDates.find(d => d.date === date)) {
            message.warning('This date is already added');
            return;
        }
        addUnavailableDate(date);
    };

    return (
        <div className="w-full flex-0.7">
            <div className="mb-8">
                <h1 className='text-[14px] font-[500] mb-4'>Weekly Available Days & Time Slots</h1>
                <Select
                    placeholder="Select a day to add availability"
                    className="w-full mb-4 h-14"
                    onChange={handleAddAvailableDay}
                >
                    {daysOfWeek.filter(day => !availableDays.find(d => d.day === day)).map(day => (
                        <Select.Option key={day} value={day}>{day}</Select.Option>
                    ))}
                </Select>

                <div className="grid grid-cols-1 gap-4">
                    {availableDays.map((dayData, dayIndex) => (
                        <div key={dayData.day} className="border p-4 rounded-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-[14px] font-[600]">{dayData.day}</h2>
                                <button onClick={() => removeADay(dayData.day)} className="text-red-500">
                                    <AiFillDelete size={20} />
                                </button>
                            </div>
                            <div className="flex gap-4 items-center">
                                <span>From</span>
                                <input type="time" value={dayData.timeSlots[0]?.from || ''} onChange={(e) => handleTimeChange(dayData.day, 0, { from: e.target.value, to: dayData.timeSlots[0]?.to || '' })} />
                                <span>to</span>
                                <input type="time" value={dayData.timeSlots[0]?.to || ''} onChange={(e) => handleTimeChange(dayData.day, 0, { from: dayData.timeSlots[0]?.from || '', to: e.target.value })} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-8">
                <h1 className='text-[14px] font-[500] mb-4'>Unavailable Dates & Time Slots</h1>
                <input 
                    type="date" 
                    className="w-full mb-4 h-14 border rounded-md px-4"
                    onChange={(e) => handleAddUnavailableDate(e.target.value)}
                />

                <div className="grid grid-cols-1 gap-4">
                    {unavailableDates?.map((dateData, dateIndex) => (
                        <div key={dateData.date} className="border p-4 rounded-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-[14px] font-[600]">{dateData.date}</h2>
                                <button onClick={() => removeUnavailableDate(dateData?.date)} className="text-red-500">
                                    <AiFillDelete size={20} />
                                </button>
                            </div>
                            <div className="flex gap-4 items-center">
                                <span>From</span>
                                <input type="time" value={dateData.timeSlots[0]?.from || ''} onChange={(e) => handleUnavailableTimeChange(dateData.date, 0, { from: e.target.value, to: dateData.timeSlots[0]?.to || '' })} />
                                <span>to</span>
                                <input type="time" value={dateData.timeSlots[0]?.to || ''} onChange={(e) => handleUnavailableTimeChange(dateData.date, 0, { from: dateData.timeSlots[0]?.from || '', to: e.target.value })} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AvailableDaysComponent;
