import React, { useState } from 'react'
import { InlineWidget } from 'react-calendly'
import TopBar from '../../components/TopBar'
import Footer from '../../components/Footer'
import { Calendar, Select, Modal, Spin, message, Dropdown, Button, Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance'
import moment from 'moment'
import LowPointsModal from '../../components/LowPointsModal'
import AddPointsModal from '../../components/AddPointsModal'
import GoogleMeetModal from '../../components/GoogleMeetModal'
import { VideoCameraOutlined, CalendarOutlined } from '@ant-design/icons'

const CalenderPage = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const navigate = useNavigate()
  const { state } = useLocation();
  const [loading, setLoading] = useState(false)
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)

  const [availableDays, setAvailableDays] = useState(state?.data?.user?.availableDays)
  const [unavailableDays, setUnavailableDays] = useState(state?.data?.user?.unavailableDates)

  const [requiredPointsData, setRequiredPointsData] = useState(null)
  const [addPointsModal, setAddPointsModal] = useState(false)
  const [addPointsLoading, setAddPointsLoading] = useState(false)
  
  // Google Meet related states
  const [googleMeetModalVisible, setGoogleMeetModalVisible] = useState(false)
  const [bookingId, setBookingId] = useState(null)

  const showConfirmModal = () => {
    setConfirmModalVisible(true)
  }

  const handleCancel = () => {
    setConfirmModalVisible(false)
  }

  const handleBookingSuccess = (bookingResponse) => {
    // Set the booking ID for potential Google Meet creation
    setBookingId(bookingResponse?.data?.id);
    message.success('Booking successful!');
    
    // Show a message asking if they want to create a Google Meet
    Modal.confirm({
      title: 'Create Google Meet Session',
      content: 'Would you like to create a Google Meet session for this booking?',
      onOk() {
        setGoogleMeetModalVisible(true);
      },
      onCancel() {
        navigate('success');
      },
    });
  };

  const handleBooking = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.post(`/bookings`, {
        type: 'service',
        date: selectedDate,
        tutorId: state?.data?.user?.id || state?.service?.user?.id,
        serviceId: state?.data?.id,
        notes: 'Booking for service',
        fromTime: selectedTimeSlot?.from,
        toTime: selectedTimeSlot?.to,
        paymentStatus: 'pending',
        bookingStatus: 'pending'
      })
      
      if (response.data) {
        handleBookingSuccess(response);
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

  const handleCellClick = (date) => {
    // Format the date
    const formattedDate = date.format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
    setSelectedTimeSlot(null);
  };

  const handleGoogleMeetSuccess = () => {
    message.success('Redirecting to Google Meet creation page');
    setGoogleMeetModalVisible(false);
    navigate('success');
  };

  const cellRender = (current) => {
    const dayName = current.format('dddd').toLowerCase();
    const isDayAvailable = availableDays?.some(
      day => day.day.toLowerCase() === dayName && day.isAvailable
    );
    const isUnavailableDate = unavailableDays?.some(
      unavailable => current.format('YYYY-MM-DD') === unavailable.date
    );
    
    // Only show context menu for available days
    if (isDayAvailable && !isUnavailableDate && !current.isBefore(new Date(), 'day')) {
      return (
        <div className="relative h-full w-full">
          <div className="absolute bottom-0 right-0 p-1">
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item 
                    key="1" 
                    icon={<CalendarOutlined />}
                    onClick={() => handleCellClick(current)}
                  >
                    Book Session
                  </Menu.Item>
                  <Menu.Item 
                    key="2" 
                    icon={<VideoCameraOutlined />}
                    onClick={() => {
                      handleCellClick(current);
                      setGoogleMeetModalVisible(true);
                    }}
                  >
                    Book Google Meet
                  </Menu.Item>
                </Menu>
              }
              trigger={['contextMenu']}
            >
              <div className="h-full w-full cursor-pointer"></div>
            </Dropdown>
          </div>
        </div>
      );
    }
    return null;
  };

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
      <GoogleMeetModal 
        open={googleMeetModalVisible} 
        handleCancel={() => setGoogleMeetModalVisible(false)} 
        selectedDate={selectedDate}
        selectedTimeSlot={selectedTimeSlot}
      />

      <div className='py-20'>
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-6">Select Session Date</h2>
            <div className="mb-4">
              <p className="text-gray-600">
                <strong>Tip:</strong> Right-click on an available date to see booking options, including Google Meet sessions.
              </p>
            </div>
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
              cellRender={cellRender}
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
        <div className='flex justify-end mt-4 gap-4'>
          {selectedDate && selectedTimeSlot && (
            <Button
              type="primary"
              icon={<VideoCameraOutlined />}
              onClick={() => setGoogleMeetModalVisible(true)}
              className="bg-blue-500"
            >
              Create Google Meet
            </Button>
          )}
          <button
            disabled={!selectedDate || !selectedTimeSlot || loading}
            onClick={showConfirmModal}
            className={`${selectedDate && selectedTimeSlot && !loading ? 'bg-primary1' : 'bg-gray-400'} text-white w-1/4 px-4 py-2 rounded-md flex items-center justify-center`}
          >
            {loading ? <Spin size="small" /> : 'Book Session'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CalenderPage
