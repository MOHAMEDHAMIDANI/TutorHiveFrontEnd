import React, { useState } from 'react'
import { InlineWidget } from 'react-calendly'
import TopBar from '../../../components/TopBar'
import Footer from '../../../components/Footer'
import { Calendar, Select, Modal, Spin, message } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../../api/axiosInstance'
import moment from 'moment'
import LowPointsModal from '../../../components/LowPointsModal'
import AddPointsModal from '../../../components/AddPointsModal'

const BookingByBid = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const navigate = useNavigate()
  const { state } = useLocation();
  const [loading, setLoading] = useState(false)
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)

  console.log('state', state);

  const [availableDays, setAvailableDays] = useState(state?.data?.tutor?.availableDays)
  const [unavailableDays, setUnavailableDays] = useState(state?.data?.tutor?.unavailableDates)

  const [requiredPointsData, setRequiredPointsData] = useState(null)
  const [addPointsModal, setAddPointsModal] = useState(false)
  const [addPointsLoading, setAddPointsLoading] = useState(false)


  const showConfirmModal = () => {
    setConfirmModalVisible(true)
  }

  const handleCancel = () => {
    setConfirmModalVisible(false)
  }

  const handleBooking = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.post(`/bookings`, {
        type: 'tutor',
        date: selectedDate,
        tutorId: state?.data?.tutor?.id,
        serviceId: 0,
        notes: 'Booking for service',
        fromTime: selectedTimeSlot?.from,
        toTime: selectedTimeSlot?.to,
        paymentStatus: 'paid',
        bookingStatus: 'completed'
      })

      if (response.data) {
        message.success('Booking successful!')
        navigate('/find-tutor/service/detail/calender/success')
      }
    } catch (error) {
      message.error('Failed to book session. Please try again.')
      console.error('Booking error:', error)
      if (error?.response?.data?.errors?.requiredCredits) {
        setRequiredPointsData(error?.response?.data?.errors)
      }
    } finally {
      setLoading(false)
      setConfirmModalVisible(false)
    }
  }

  const getAvailableTimeSlots = (date) => {
    const dayName = date.format('dddd').toLowerCase();
    const selectedDaySlots = availableDays?.find(
      day => day.day.toLowerCase() === dayName
    )?.timeSlots || [];
    return selectedDaySlots;
  }

  return (
    <div className='min-h-screen'>
      <TopBar />
      <Modal
        title="Confirm Booking"
        open={confirmModalVisible}
        onOk={handleBooking}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <p>This service will deduct <b> {state?.data?.price || 0} </b> points from your account. Do you want to continue?</p>
      </Modal>
      <AddPointsModal open={addPointsModal} handleCancel={() => setAddPointsModal(false)} />
      <LowPointsModal open={requiredPointsData} handleCancel={() => setRequiredPointsData(null)} pointsNeeded={requiredPointsData?.requiredCredits - requiredPointsData?.availableCredits} handleAdd={() => setAddPointsModal(true)} />

      <div className='py-20'>
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-6">Select Session Date</h2>
            <Calendar
              style={{
                width: '100%',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '8px'
              }}
              fullscreen={true}
              disabledDate={(current) => {
                const dayName = current.format('dddd').toLowerCase();
                const isDayAvailable = availableDays?.some(
                  day => day.day.toLowerCase() === dayName && day.isAvailable
                );
                const isUnavailableDate = unavailableDays?.some(
                  unavailable => current.format('YYYY-MM-DD') === unavailable.date
                );
                return current.isBefore(new Date(), 'day') || !isDayAvailable || isUnavailableDate;
              }}
              onSelect={(date) => {
                const formattedDate = date.format('YYYY-MM-DD');
                setSelectedDate(formattedDate);
                setSelectedTimeSlot(null);
              }}
            />

            {selectedDate && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Select Time Slot</h3>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select a time slot"
                  onChange={(value) => {
                    const timeSlots = getAvailableTimeSlots(moment(selectedDate));
                    const selected = timeSlots.find(slot => `${slot.from}-${slot.to}` === value);
                    setSelectedTimeSlot(selected);
                  }}
                  value={selectedTimeSlot ? `${selectedTimeSlot.from}-${selectedTimeSlot.to}` : undefined}
                >
                  {getAvailableTimeSlots(moment(selectedDate)).map((slot, index) => (
                    <Select.Option key={index} value={`${slot.from}-${slot.to}`}>
                      {`${slot.from} - ${slot.to}`}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            )}
          </div>
        </div>
        <div className='flex justify-end mt-4'>
          <button
            disabled={!selectedDate || !selectedTimeSlot || loading}
            onClick={showConfirmModal}
            className={`${selectedDate && selectedTimeSlot && !loading ? 'bg-primary1' : 'bg-gray-400'} text-white w-1/4 px-4 py-2 rounded-md flex items-center justify-center`}
          >
            {loading ? <Spin size="small" /> : 'Next'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default BookingByBid
