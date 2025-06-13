import React, { useState, useEffect } from 'react';
import { List, Card, Button, Spin, Empty, Tag, Tooltip, message } from 'antd';
import { VideoCameraOutlined, DeleteOutlined, EditOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { getAllGoogleMeetSessions, deleteGoogleMeetSession } from '../api/googleMeetService';
import moment from 'moment';

const GoogleMeetList = ({ userId, refreshTrigger }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  useEffect(() => {
    fetchSessions();
  }, [pagination.current, pagination.pageSize, refreshTrigger]);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.current,
        limit: pagination.pageSize,
        userId: userId // Filter by current user (either as organizer or attendee)
      };
      
      const response = await getAllGoogleMeetSessions(params);
      setSessions(response.data || []);
      setPagination({
        ...pagination,
        total: response.total || 0
      });
    } catch (error) {
      console.error('Error fetching Google Meet sessions:', error);
      message.error('Failed to load Google Meet sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinMeeting = (meetUrl) => {
    if (meetUrl) {
      window.open(meetUrl, '_blank');
    } else {
      message.error('Meeting URL not available');
    }
  };

  const handleDeleteMeeting = async (id) => {
    try {
      await deleteGoogleMeetSession(id);
      message.success('Meeting deleted successfully');
      fetchSessions();
    } catch (error) {
      console.error('Error deleting meeting:', error);
      message.error('Failed to delete meeting');
    }
  };

  const getStatusTag = (startTime, endTime) => {
    const now = moment();
    const start = moment(startTime);
    const end = moment(endTime);
    
    if (now.isBefore(start)) {
      return <Tag color="blue">Upcoming</Tag>;
    } else if (now.isAfter(end)) {
      return <Tag color="gray">Completed</Tag>;
    } else {
      return <Tag color="green">In Progress</Tag>;
    }
  };

  const isUpcoming = (startTime) => {
    return moment().isBefore(moment(startTime));
  };

  const canJoin = (startTime, endTime) => {
    const now = moment();
    const start = moment(startTime);
    const end = moment(endTime);
    
    // Can join 5 minutes before start time and until end time
    return now.isAfter(start.subtract(5, 'minutes')) && now.isBefore(end);
  };

  return (
    <div className="google-meet-list">
      <h2 className="text-xl font-semibold mb-4">Your Google Meet Sessions</h2>
      
      {loading ? (
        <div className="flex justify-center my-8">
          <Spin size="large" />
        </div>
      ) : sessions.length === 0 ? (
        <Empty description="No Google Meet sessions found" />
      ) : (
        <List
          grid={{ 
            gutter: 16, 
            xs: 1, 
            sm: 1, 
            md: 2, 
            lg: 3, 
            xl: 3, 
            xxl: 4 
          }}
          dataSource={sessions}
          pagination={{
            onChange: (page) => {
              setPagination({
                ...pagination,
                current: page
              });
            },
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
            onShowSizeChange: (current, size) => {
              setPagination({
                ...pagination,
                current: 1,
                pageSize: size
              });
            }
          }}
          renderItem={(session) => (
            <List.Item>
              <Card 
                title={session.title}
                extra={getStatusTag(session.startTime, session.endTime)}
                actions={[
                  canJoin(session.startTime, session.endTime) ? (
                    <Tooltip title="Join Meeting">
                      <Button 
                        type="primary" 
                        icon={<VideoCameraOutlined />} 
                        onClick={() => handleJoinMeeting(session.meetUrl)}
                      >
                        Join
                      </Button>
                    </Tooltip>
                  ) : null,
                  isUpcoming(session.startTime) ? (
                    <Tooltip title="Delete Meeting">
                      <Button 
                        danger
                        icon={<DeleteOutlined />} 
                        onClick={() => handleDeleteMeeting(session.id)}
                      />
                    </Tooltip>
                  ) : null
                ].filter(Boolean)}
              >
                <p className="mb-2">{session.description}</p>
                <p className="mb-1">
                  <CalendarOutlined className="mr-2" />
                  {moment(session.startTime).format('MMMM D, YYYY')}
                </p>
                <p>
                  <ClockCircleOutlined className="mr-2" />
                  {moment(session.startTime).format('h:mm A')} - {moment(session.endTime).format('h:mm A')}
                </p>
                <p className="mt-2">
                  <strong>With:</strong> {session.attendeeName || 'Unknown'}
                </p>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default GoogleMeetList; 