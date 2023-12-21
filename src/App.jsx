import "./App.css";
import Addsubject from "./components/Addsubject";
import Gpa from "./components/Gpa";
import Greeting from "./components/Greeting";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Routes, Route } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import { LoadingContext } from "./contexts/loadingContext";
import Notifications from "./components/default_components/Notifications";
import { NotificationsContext } from "./contexts/notificationContext";
import Updatesubject from "./components/Updatesubject";
function App() {
  const { isLoading } = useContext(LoadingContext);
  const { isShow, content, type } = useContext(NotificationsContext);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="relative w-full overflow-x-hidden">
      <Routes className="bg-red-700">
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/greeting" element={<Greeting />}></Route>
        <Route path="/addsubject" element={<Addsubject />}></Route>
        <Route path="/update/*" element={<Updatesubject />}></Route>
        <Route path="/gpa" element={<Gpa />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
      <div
        className={`fixed top-0 left-0 ${
          isLoading ? "block" : "hidden"
        } bg-[rgba(0,0,0,.5)] w-full h-screen flex justify-center items-center`}
      >
        <HashLoader
          aria-label="Loading Hash"
          data-testid="loader"
          loading={true}
          color="#fff"
          size={50}
        />
      </div>
      <Notifications show={isShow} type={type} content={content} />
    </div>
  );
}

export default App; 
