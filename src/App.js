import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import Forgot from "./pages/Auth/Forgot";
import ForgotSuccess from "./pages/Auth/ForgotSuccess";
import ChangePassword from "./pages/Auth/ChangePassword";
import LandingPage from "./pages/Public/LandingPage";
import OTP from "./pages/Auth/Otp";
import FindTutor from "./pages/Public/FindTutorPages/FindTutor";
import TutotServices from "./pages/Public/FindTutorPages/TutotServices";
import ServiceDetail from "./pages/Public/FindTutorPages/ServiceDetail";
import PaymentScreen from "./pages/Public/FindTutorPages/PaymentScreen";
import PaymentSuccess from "./pages/Public/FindTutorPages/PaymentSuccess";
import Posts from "./pages/Public/Posts/Posts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import YourStore from "./pages/Public/YourStore";
import HowWorks from "./pages/Public/HowItWorks/HowWorks";
import RecentPost from "./pages/Public/RecentPost";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/ProfilePages/Profile";
import Layout from "./components/Layout";
import EditProfile from "./pages/ProfilePages/EditProfile";
import BookSession from "./pages/ProfilePages/BookSession";
import BookSessionDetail from "./pages/ProfilePages/BookSessionDetail";
import Notifications from "./pages/ProfilePages/Notifications";
import BecomeTutor from "./pages/ProfilePages/BecomeTutor";
import MyBalance from "./pages/ProfilePages/MyBalance";
import TutorSignup from "./pages/Auth/TutorSignup";
import StudentPost from "./pages/Public/Posts/StudentPost";
import StudentBalance from "./pages/Public/StudentBalance";
import CalenderPage from "./pages/Public/CalenderPage";
import UpdateTutor from "./pages/ProfilePages/UpdateTutor";
import Chat from "./pages/ProfilePages/Chat";
import PostBids from "./pages/Public/Posts/PostBids";
import StudentPostBid from "./pages/Public/Posts/StudentPostBid";
import BookingByBid from "./pages/Public/Posts/BookingByBid";
import TutorBooking from "./pages/ProfilePages/TutorBookings";
import { GoogleOAuthProvider } from "@react-oauth/google";
import TutorSubjects from "./pages/ProfilePages/TutorSubjects";
import ChatApp from "./utills/chatApp";
import GoogleMeetPage from "./pages/Public/GoogleMeetPage";
import TutorGoogleMeet from "./pages/ProfilePages/TutorGoogleMeet";

function App() {
  const jwtToken = localStorage.getItem('tutor_token');
  const userData = JSON.parse(localStorage.getItem('tutor_user'));

// if (true) {
//   return (
//     <ChatApp userId={userData?.id} jwtToken={jwtToken} />
//   )
// }

  return (
    <div >
    <GoogleOAuthProvider clientId="116464427965-m2u1hmgpoc89nl8ubhbaue1eavhjb3ji.apps.googleusercontent.com">

      <Layout>
        <Routes>
          {/* auth routes */}
          <Route path='/auth/login' element={<Login />} />

          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/tutor/signup' element={<TutorSignup />} />


          <Route path='/auth/forgot' element={<Forgot />} />
          <Route path='/auth/forgot/success' element={<ForgotSuccess />} />
          <Route path='/auth/otp' element={<OTP />} />
          <Route path='/auth/change-password' element={<ChangePassword />} />

          {/* <Route path='/calender' element={<CalenderPage />} /> */}


          {/* public routes */}


          <Route path='/' element={<LandingPage />} />

          {/* find tutorrr */}

          <Route path='/find-tutor' element={<FindTutor />} />
          <Route path='/find-tutor/service' element={<TutotServices />} />
          <Route path='/find-tutor/service/detail' element={<ServiceDetail />} />
          <Route path='/find-tutor/service/detail/payment' element={<PaymentScreen />} />
          <Route path='/find-tutor/service/detail/payment/success' element={<PaymentSuccess />} />
          <Route path='/find-tutor/service/detail/payment/success' element={<PaymentSuccess />} />
          <Route path='/find-tutor/service/detail/calender' element={<CalenderPage />} />
          <Route path='/find-tutor/service/detail/calender/success' element={<PaymentSuccess />} />


          {/* post routess */}
          <Route path="/posts" element={<Posts />} />
          <Route path="/recent-post/bids" element={<PostBids />} />
          <Route path='/student-post' element={<StudentPost />} />
          <Route path='/student-post/bid' element={<StudentPostBid />} />
          <Route path='/student-post/bid/booking' element={<BookingByBid />} />

          <Route path='/store' element={<YourStore />} />
          <Route path='/how-works' element={<HowWorks />} />
          <Route path='/recent-post' element={<RecentPost />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/google-meet' element={<GoogleMeetPage />} />


          {/* others route */}
          <Route path='/my-balance' element={<StudentBalance />} />

          {/* profile routes  */}
         

            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/update' element={<EditProfile />} />
            <Route path='/profile/book-session' element={<BookSession />} />
            <Route path='/profile/tutor-bookings' element={<TutorBooking />} />
            <Route path='/profile/book-session/detail' element={<BookSessionDetail />} />
            <Route path='/profile/notifications' element={<Notifications />} />
            <Route path='/profile/become-tutor' element={<BecomeTutor />} />
            <Route path='/profile/update-tutor' element={<UpdateTutor />} />
            <Route path='/profile/balance' element={<MyBalance />} />
            <Route path='/profile/chat' element={<Chat />} />
            <Route path='/profile/subjects' element={<TutorSubjects />} />
            <Route path='/profile/google-meet' element={<GoogleMeetPage />} />
            <Route path='/profile/tutor-google-meet' element={<TutorGoogleMeet />} />
        </Routes>

      </Layout>
</GoogleOAuthProvider>
    </div>
  );
}

export default App;
