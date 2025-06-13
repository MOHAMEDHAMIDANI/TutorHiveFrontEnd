import React from 'react';
import TopBar from '../../components/TopBar';
import Footer from '../../components/Footer';
import { Button, Card } from 'antd';
import { VideoCameraOutlined, CalendarOutlined } from '@ant-design/icons';

const GoogleMeetPage = () => {
  const handleCreateGoogleMeet = () => {
    // Direct link to Google Calendar with Google Meet enabled
    const googleCalendarUrl = 'https://calendar.google.com/calendar/u/0/r/eventedit?vcon=meet&dates=now&hl=en&pli=1';
    
    // Open Google Calendar in a new tab
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      
      <div className="py-20">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Google Meet Sessions</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow p-8">
            <div className="text-center">
              <CalendarOutlined style={{ fontSize: '48px', color: '#4285F4' }} />
              
              <h2 className="text-2xl font-semibold mt-4 mb-2">Create a Google Meet Session</h2>
              
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Google Meet provides a simple way to connect with your students or tutors through video conferencing.
                Click the button below to create a new Google Meet session through Google Calendar.
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
            
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">How to use Google Meet</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="1. Create a meeting" className="shadow-sm">
                  <p>Click the button above to create a new Google Meet session through Google Calendar.</p>
                </Card>
                
                <Card title="2. Invite participants" className="shadow-sm">
                  <p>Add your student or tutor's email address to invite them to the meeting.</p>
                </Card>
                
                <Card title="3. Join the meeting" className="shadow-sm">
                  <p>At the scheduled time, click the Google Meet link in your calendar event to join.</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default GoogleMeetPage; 