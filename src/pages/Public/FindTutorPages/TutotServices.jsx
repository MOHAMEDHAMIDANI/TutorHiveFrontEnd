import React, { useEffect, useState } from "react";
import TopBar from "../../../components/TopBar";
import TutorStates from "../../../components/TutorStates";
import Courses from "../../../components/Courses";
import Footer from "../../../components/Footer";
import ReviewsComponent from "./ReviewsComponent";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { message, Spin } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const TutotServices = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const tutor = searchParams.get("tutor");

  const [tutorData, setTutorData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const getChatUserByEmail = async (email) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_CHAT_APP_BACKEND_URL}/auth/get-user`,
        {
          email: email,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting chat user:", error);
      return null;
    }
  };
  const getTutorById = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`users/${tutor}`);
      setTutorData(response.data);
    } catch (error) {
      console.error("Error fetching tutor:", error);
    } finally {
      setLoading(false);
    }
  };

  const getReviews = async () => {
    try {
      setReviewsLoading(true);
      const response = await axiosInstance.get(
        `reviews?filters={"user":{"id":${tutor}}}`
      );
      setReviews(response.data?.data);

      console.log("response", response);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    getTutorById();
    getReviews();
  }, [tutor]);

  const handleChatWithTutor = async (tutorEmail) => {
    try {
      const currentChatUser = JSON.parse(localStorage.getItem("chat_user"));
      if (!currentChatUser) {
        message.error("Please login first to chat with tutors");
        return;
      }

      const tutorChatUser = await getChatUserByEmail(tutorEmail);
      console.log("tutorChatUser", tutorChatUser);
      if (!tutorChatUser) {
        message.error("Unable to connect with tutor at the moment");
        return;
      }

      localStorage.setItem("selected_chat_user", JSON.stringify(tutorChatUser));

      navigate("/profile/chat");

      const ws = new WebSocket(process.env.REACT_APP_CHAT_WS_URL);

      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            type: "chat message",
            senderId: currentChatUser.id,
            receiverId: tutorChatUser.id,
            content: "Hi, I'm interested in your tutoring services!",
          })
        );
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        message.error("Error connecting to chat");
      };

      ws.onmessage = () => {
        ws.close();
      };
    } catch (error) {
      console.error("Error initiating chat:", error);
      message.error("Failed to start chat");
    }
  };
  const tabs = ["Listings", "Reviews"];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="pb-20">
        <TopBar />
      </div>
      <div className="lg:max-w-[1501px] m-auto bg-gray-300 h-[1.3px] " />
      <Spin spinning={loading}>
            <TutorStates data={tutorData} onClickFunction={handleChatWithTutor} reviews={reviews} />
      </Spin>
      <div className="lg:max-w-[1501px] m-auto bg-gray-300 h-[1.3px] " />
      <div className="lg:max-w-[1501px] m-auto">
        <div className="flex gap-4 mt-10">
          {tabs.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedTab(index)}
              className={`  ${
                selectedTab === index
                  ? "border-b-primary1 border-b-2 text-primary1 pb-2"
                  : "hover:border-b-primary1 border-b-2 pb-2 border-gray-100 text-black hover:text-primary1"
              } cursor-pointer `}
            >
              {item}
            </div>
          ))}
        </div>
        {selectedTab === 0 ? (
          <Spin spinning={loading}>
            <Courses data={tutorData} />
          </Spin>
        ) : (
          <Spin spinning={reviewsLoading}>
            <ReviewsComponent reviews={reviews} />
          </Spin>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TutotServices;
