import logo from "../../assets/logo.png";
import { IoMenu } from "react-icons/io5";
import { useContext } from "react";
import { SidebarContext } from "../../contexts/sidbarContext";
const Navbar = () => {
  const { setIsOpen } = useContext(SidebarContext);
  const handleShowSideBar = () => {
    setIsOpen(true);
  };
  return (
    <div className="w-full h-[60px] bg-transparent backdrop-blur-sm flex justify-between sm:justify-normal gap-x-6 sm:gap-x-10 items-center px-6 sm:px-10 border-[1px] border-solid border-[rgba(255,255,255,.3)] mb-5">
      <a href="/">
        <img src={logo} alt="logo" className="w-[40px] h-[30px] self-center" />
      </a>

      <ul className="hidden sm:flex gap-x-10 items-center font-bold text-white">
        <li>
          <a href="/addsubject">Add Subject</a>
        </li>
        <li>
          <a href="/gpa">GPA</a>
        </li>
        <li>
          <a href="http://tvhuong.hoaanit.com">My Blog</a>
        </li>
      </ul>

      <ul className="hidden sm:flex gap-x-5 items-center font-bold">
        <li className="text-black bg-white hover:scale-110 hover:opacity-80 transition-all border-[1px] border-solid border-white py-1 px-3 rounded-sm">
          <a href="">Login</a>
        </li>
        <li className="text-white hover:bg-white hover:text-black hover:scale-110 transition-all border-[1px] border-solid border-white py-1 px-3 rounded-sm">
          <a href="">Sign Up</a>
        </li>
      </ul>

      <div onClick={handleShowSideBar} className="block sm:hidden">
        <IoMenu className="text-white text-[20px]" />
      </div>
    </div>
  );
};

export default Navbar;
