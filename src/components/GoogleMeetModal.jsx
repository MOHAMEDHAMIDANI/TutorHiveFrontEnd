import React from 'react';
import { Modal, Button } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';

const GoogleMeetModal = ({ 
  open, 
  handleCancel, 
  selectedDate, 
  selectedTimeSlot
}) => {
  
  const handleCreateGoogleMeet = () => {
    // Format date and time for Google Calendar URL if provided
    let googleCalendarUrl = 'https://calendar.google.com/calendar/u/0/r/eventedit?vcon=meet&hl=en&pli=1';
    
    // If date and time are provided, add them to the URL
    if (selectedDate && selectedTimeSlot) {
      const startDate = new Date(`${selectedDate} ${selectedTimeSlot.from}`);
      const endDate = new Date(`${selectedDate} ${selectedTimeSlot.to}`);
      
      // Format dates for Google Calendar URL (YYYYMMDDTHHMMSS/YYYYMMDDTHHMMSS)
      const formattedStartDate = startDate.toISOString().replace(/-|:|\.\d+/g, '');
      const formattedEndDate = endDate.toISOString().replace(/-|:|\.\d+/g, '');
      
      googleCalendarUrl += `&dates=${formattedStartDate}/${formattedEndDate}`;
    } else {
      // If no date/time provided, use 'now' parameter
      googleCalendarUrl += '&dates=now';
    }
    
    // Open Google Calendar in a new tab
    window.open(googleCalendarUrl, '_blank');
    
    // Close the modal
    handleCancel();
  };

  return (
    <Modal
      title="Create Google Meet Session"
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={500}
    >
      <div className="text-center py-6">
        <p className="mb-6">
          You'll be redirected to Google Calendar to create a Google Meet session. 
          You can set the title, description, date, time, and invite participants there.
        </p>
        
        <Button 
          type="primary" 
          icon={<VideoCameraOutlined />} 
          size="large"
          onClick={handleCreateGoogleMeet}
          className="bg-blue-500"
        >
          Create Google Meet
        </Button>
      </div>
    </Modal>
  );
};

export default GoogleMeetModal; 