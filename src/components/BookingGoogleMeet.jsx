import React from 'react';
import { Button } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';

const BookingGoogleMeet = ({ bookingId, tutorId }) => {
  const handleCreateGoogleMeet = () => {
    // Direct link to Google Calendar with Google Meet enabled
    const googleCalendarUrl = 'https://calendar.google.com/calendar/u/0/r/eventedit?vcon=meet&dates=now&hl=en&pli=1';
    
    // Open Google Calendar in a new tab
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="booking-google-meet mt-6">
      <h3 className="text-lg font-semibold mb-4">Google Meet Session</h3>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="mb-4">
          Create a Google Meet session for this booking to connect with your tutor or student virtually.
        </p>
        
        <Button 
          type="primary" 
          icon={<VideoCameraOutlined />} 
          onClick={handleCreateGoogleMeet}
          className="bg-blue-500"
        >
          Create Google Meet
        </Button>
      </div>
    </div>
  );
};

export default BookingGoogleMeet; 