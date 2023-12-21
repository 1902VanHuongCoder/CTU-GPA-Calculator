import BackgroundRectangle from "../assets/BackgroundRectangle.png";
import { CiUser } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import Footer from "./default_components/Footer";

const Signup = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-tr from-cyan-300 to-pink-600">
      <div
        className="w-full h-full bg-cover bg-no-repeat flex justify-center items-center"
        style={{
          backgroundImage: `url('${BackgroundRectangle}')`,
        }}
      >
        <div className="h-[460px] w-[300px] py-[15px] px-[25px] sm:h-[470px] sm:w-[350px] flex flex-col justify-evenly bg-white sm:py-5 sm:px-10 rounded-md shadow-lg">
          <h1 className="text-[26px] font-bold h-[40px] sm:text-[32px] sm:font-[800] w-full flex justify-center items-center">
            Sign Up
          </h1>
          <form
            action=""
            method="POST"
            className="h-[260px] flex flex-col justify-evenly items-start"
          >
            <div className="w-full border-b-[1px] border-rgba(0,0,0,1) border-solid py-2">
              <div className="mb-2 text-[12px]">Username</div>
              <div className="flex gap-x-2">
                <CiUser className="text-[20px] opacity-50" />
                <input
                  type="text"
                  className="w-full h-[20px] outline-none border-none text-[16px]"
                  placeholder="Type your username"
                />
              </div>
            </div>
            <small className="text-[#ff0000] text-[16px]">
              Email isn`t invalid!
            </small>

            <div className="w-full border-b-[1px] border-rgba(0,0,0,1) border-solid py-2">
              <div className="mb-2 text-[12px]">Password</div>
              <div className="flex gap-x-2">
                <IoLockClosedOutline className="text-[20px] opacity-50" />
                <input
                  type="password"
                  className="w-full h-[20px] outline-none border-none text-[16px]"
                  placeholder="Type your password"
                />
              </div>
            </div>
            <small className="text-[#ff0000] text-[16px]">
              Email isn`t invalid!
            </small>

            <div className="w-full border-b-[1px] border-rgba(0,0,0,1) border-solid py-2">
              <div className="mb-2 text-[12px]">Confirm Password</div>
              <div className="flex gap-x-2">
                <MdLockOutline className="text-[20px] opacity-50" />
                <input
                  type="password"
                  className="w-full h-[20px] outline-none border-none text-[16px]"
                  placeholder="Type your confirm password"
                />
              </div>
            </div>
            <small className="text-[#ff0000] text-[16px]">
              Email isn`t invalid!
            </small>
          </form>

          <div className="h-[100px] flex flex-col justify-end gap-y-2 items-center">
            <button className="w-full bg-gradient-to-r from-[rgba(0, 255, 255, 0.55)] to-[rgba(255, 0, 122, 0.82)] py-3 uppercase font-bold text-white text-[16px] rounded-full hover:opacity-80">
              sign up
            </button>
            <p>
              <span>or</span>{" "}
              <a href="/login" className="underline text-[#0E7CFC]">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
