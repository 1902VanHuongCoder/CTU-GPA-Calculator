import logo from "../../assets/logo.png";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useContext } from "react";
import { SidebarContext } from "../../contexts/sidbarContext";
const Sidebar = () => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  return (
    <div
      className={`fixed top-0 w-4/5 h-screen overflow-hidden bg-slate-700 py-20 px-5 transition-all duration-500 ${
        isOpen ? "left-0" : "left-[-100%]"
      }`}
    >
      <div className="flex justify-start items-center gap-x-2 mb-5">
        <img className="w-[50px] h-[40px]" src={logo} alt="logo brand" />
        <h2 className="text-white">Cumulative Points Calculator</h2>
      </div>
      <div className="w-full h-[1px] bg-[rgba(255,255,255,.5)]"></div>
      <div className="my-5">
        <ul className="text-white flex flex-col gap-y-5">
          <li>
            <span>&gt;</span> <a href="/addsubject">Add subject</a>
          </li>
          <li>
            <span>&gt;</span> <a href="/gpa">GPA</a>
          </li>
          <li>
            <span>&gt;</span> <a href="http://tvhuong.hoaanit.com">My blogs</a>
          </li>
        </ul>
      </div>

      <div className="flex justify-between items-center mt-5">
        <button className="text-black bg-white hover:scale-110 hover:opacity-80 transition-all border-[1px] border-solid border-white py-1 px-3 rounded-sm">
          Login
        </button>
        <button className="text-white hover:bg-white hover:text-black hover:scale-110 transition-all border-[1px] border-solid border-white py-1 px-3 rounded-sm">
          Sign up
        </button>
      </div>
      <div
        onClick={() => {
          setIsOpen(false);
        }}
        className="absolute top-4 left-4 w-[40px] h-[40px] border-[1px] border-solid border-white rounded-full flex justify-center items-center"
      >
        <FaArrowAltCircleLeft className="text-white" />
      </div>
    </div>
  );
};

export default Sidebar;
