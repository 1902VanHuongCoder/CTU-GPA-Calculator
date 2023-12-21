import { FaRegCheckCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useContext } from "react";
import { NotificationsContext } from "../../contexts/notificationContext";
const Notifications = ({ show, type, content }) => {
    const {setIsShow} = useContext(NotificationsContext);
  return (
    <div
      className={`fixed top-5 right-0 w-fit h-[60px] px-5 ${
        show ? "translate-x-[-30px]" : "translate-x-[150%]"
      } ${type === "success" && "bg-green-500"} ${
        type === "fail" && "bg-red-500"
      } text-white shadow-lg rounded-md transition-transform`}
    >
      {type === "success" && (
        <p className="flex items-center gap-x-2 h-full">
          <FaRegCheckCircle /> {content}
        </p>
      )}
      {type === "fail" && (
        <p className="flex items-center gap-x-2 h-full">
          <MdErrorOutline /> {content}
        </p>
      )}
      <button onClick={() => setIsShow(false)} className="absolute top-[-10px] left-[-10px] w-[20px] h-[20px] flex justify-center items-center bg-white rounded-full">
        <IoMdClose className="text-black" />
      </button>
    </div>
  );
};

export default Notifications;
