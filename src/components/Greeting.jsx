import GreetingBgDesktop from "../assets/GreetingBgPNGDesktop.png";
import GreetingBgTablet from "../assets/GreetingBgPNGTablet.png";
import logo from "../assets/logo.png";
import Footer from "./default_components/Footer";
const Greeting = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-tr from-cyan-300 to-pink-600">
      <div
        className="w-full h-full bg-cover bg-no-repeat flex justify-center items-center flex-col gap-y-[30px]"
        style={{
          backgroundImage: `url('${
            window.innerWidth > 768 ? GreetingBgDesktop : GreetingBgTablet
          }')`,
        }}
      >
        <div className="w-[120px] h-[120px] flex justify-center items-end">
          <img className="w-full" src={logo} alt="logo" />
        </div>
        <div className="w-4/5 lg:w-3/5">
          <h1
            className="text-center text-white text-[26px] leading-[40px] sm:text-[40px] sm:leading-[50px] w-full mb-2"
            style={{ textShadow: "0 0 15px rgba(0,0,0,.5)" }}
          >
            {" "}
            Welcome everyone to our CUMULATIVE POINTS calculator.
          </h1>
          <p className="text-[12px] sm:text-[16px] text-slate-800 w-full text-center">
            Website supports to calculate cumulative points for CTU (Can Tho
            University) students
          </p>
        </div>

        <a href="/" className="w-[170px] h-[50px] bg-gradient-to-r from-[rgba(0, 255, 255, 0.55)] to-[rgba(255, 0, 122, 0.82)] py-3 font-bold text-white text-[16px] rounded-full hover:opacity-80 shadow-md text-center">
          GET STARTED
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default Greeting;
