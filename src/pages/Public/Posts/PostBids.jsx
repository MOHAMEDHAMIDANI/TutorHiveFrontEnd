import React, { useState, useEffect } from "react";
import TopBar from "../../../components/TopBar";
import cover from "../../../assets/bookCover.png";
import Footer from "../../../components/Footer";
import profile from "../../../assets/tp1.png";
import { IoIosSend } from "react-icons/io";
import axiosInstance from "../../../api/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import axios from "axios";

const PostBids = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const [data, setData] = useState({});
  const [bidPrice, setBidPrice] = useState(null);
  const [bidDescription, setBidDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [bids, setBids] = useState([]);

  const fetchCommentsByPost = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/jobs/${id}`);
      console.log("response of get comments ", response);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommentsByPost();
  }, []);

  const getChatUserByEmail = async (email) => {
    try {
      const response = await axios.get(
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

  const handleChatWithTutor = async (tutorEmail) => {
    try {
      const currentChatUser = JSON.parse(localStorage.getItem("chat_user"));
      if (!currentChatUser) {
        message.error("Please login first to chat with tutors");
        return;
      }

      const tutorChatUser = await getChatUserByEmail(tutorEmail);
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

  const fetchBids = async () => {
    try {
      const response = await axiosInstance.get(`/bids?jobId=${id}`);
      console.log("bids response:", response.data);
      setBids(response.data.data);
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };

  useEffect(() => {
    fetchBids();
  }, [id]);

  const handleSubmitBid = async () => {
    setIsSubmitLoading(true);
    if (bidPrice === 0 || bidDescription === "") {
      message.error("Please enter a valid price and description");
      setIsSubmitLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post(`/bids`, {
        price: Number(bidPrice),
        jobId: Number(id),
        proposal: bidDescription,
      });
      console.log("response of submit bid ", response);
      setIsSubmitLoading(false);
      message.success("Bid submitted successfully");
      navigate(-1);
    } catch (error) {
      console.log("error of submit bid ", error);
      setIsSubmitLoading(false);
      message.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }

  // const getBids = async () => {
  //     const response = await axiosInstance.get(`bids?service=${id}`)
  //     console.log('response of get bids ', response);
  // }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="pb-20">
        <TopBar />
      </div>
      <div className="max-w-[1501px] m-auto bg-gray-300 h-[1.3px] " />
      <div className="max-w-[1501px] m-auto">
        <div className="bg-gray-200 p-6 rounded-xl mt-6 ">
          <div className="flex max-md:flex-col justify-between">
            <div className="flex gap-6 max-md:flex-col items-center">
              <img
                src={data?.image}
                className="max-w-[181.777px] max-h-[211.872px] rounded-xl"
                alt=""
              />
              <div className="max-w-[682.484px]">
                <h1 className="text-[24px] font-[600]"> {data?.title}</h1>
                <h1 className="text-[20px] font-[500]"> {data?.subject}</h1>
                <h1
                  className="text-[14px] font-[400]"
                  dangerouslySetInnerHTML={{ __html: data?.description }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="  pt-10">
          <h1 className="text-[20px] font-[600] mb-6 ">Bids </h1>
          {bids.map((bid) => (
            <div
              key={bid.id}
              className="bg-white rounded-lg p-4 mb-4 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <img
                    src={bid.tutor.photo?.path || profile}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    alt={`${bid.tutor.firstName} ${bid.tutor.lastName}`}
                  />
                  <div>
                    <h2 className="text-lg font-semibold">
                      {bid.tutor.firstName} {bid.tutor.lastName}
                    </h2>
                    <p className="text-gray-600">{bid.tutor.qualification}</p>
                    <p className="text-gray-800 mt-2">{bid.proposal}</p>
                    <p className="text-primary1 font-semibold mt-2">
                      Bid Amount: ${bid.price}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleChatWithTutor(bid.tutor.email)}
                  className="bg-primary1 text-white px-4 py-2 rounded-lg hover:bg-sky-600"
                >
                  Chat with Tutor
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pb-20">
          <div className="border-[1px] border-gray-200 px-10 mt-10" />
          <div className="flex justify-between my-4 items-center">
            <div className="w-full">
              <h1 className="text-[18px] font-[600] ">Description</h1>
              <textarea
                type="text"
                value={bidDescription}
                onChange={(e) => setBidDescription(e.target.value)}
                placeholder="Bid Description"
                className="focus:outline-none border-none w-full bg-transparent"
              />
              <h1 className="text-[18px] font-[600] mt-4 ">Bid Your price</h1>
              <input
                type="number"
                value={bidPrice}
                onChange={(e) => setBidPrice(e.target.value)}
                placeholder="Bid Your price"
                className="focus:outline-none border-none w-full bg-transparent"
              />
            </div>
            {isSubmitLoading ? (
              <Spin size="large" />
            ) : (
              <IoIosSend
                onClick={handleSubmitBid}
                size={34}
                className="cursor-pointer hover:text-primary1"
              />
            )}
          </div>
          <div className="border-[1px] border-gray-200 px-10  " />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostBids;
