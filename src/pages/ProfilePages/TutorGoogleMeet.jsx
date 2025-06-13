import React from 'react';
import { Button, Card } from 'antd';
import { VideoCameraOutlined, CalendarOutlined } from '@ant-design/icons';
import TopBar from '../../components/TopBar';
import Footer from '../../components/Footer';

const TutorGoogleMeet = () => {
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
            <h1 className="text-3xl font-bold">My Google Meet Sessions</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow p-8">
            <div className="text-center">
              <CalendarOutlined style={{ fontSize: '48px', color: '#4285F4' }} />
              
              <h2 className="text-2xl font-semibold mt-4 mb-2">Create a Google Meet Session for Your Students</h2>
              
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                As a tutor, you can create Google Meet sessions to connect with your students virtually.
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
              <h3 className="text-xl font-semibold mb-4">Tips for Effective Online Tutoring</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="1. Prepare Your Materials" className="shadow-sm">
                  <p>Have all your teaching materials ready before the session starts. Consider sharing your screen to present slides or documents.</p>
                </Card>
                
                <Card title="2. Test Your Equipment" className="shadow-sm">
                  <p>Make sure your camera, microphone, and internet connection are working properly before the session begins.</p>
                </Card>
                
                <Card title="3. Engage Your Students" className="shadow-sm">
                  <p>Use interactive tools like whiteboards, polls, and Q&A sessions to keep your students engaged during the virtual session.</p>
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

export default TutorGoogleMeet; 