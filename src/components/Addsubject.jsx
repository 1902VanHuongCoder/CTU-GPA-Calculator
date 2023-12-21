import GreetingBgPNGDesktop from "../assets/GreetingBgPNGDesktop.png";
import SelectArrowUp from "../assets/SelectArrowUp.png";
import SelectArrowDown from "../assets/SelectArrowDown.png";
import rocketIcon from "../assets/Rocket.png";
import { useContext, useState } from "react";
import Navbar from "./default_components/Navbar";
import Footer from "./default_components/Footer";
import Sidebar from "./default_components/Sidebar";
import { db } from "../firebase_setup/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { LoadingContext } from "../contexts/loadingContext";
import { NotificationsContext } from "../contexts/notificationContext";
const Addsubject = () => {
  const { setIsLoading } = useContext(LoadingContext);
  const { setIsShow, setContent, setType } = useContext(NotificationsContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [semesterDropdownIsOpen, setSemesterDropdownIsOpen] = useState(false);
  const [yearDropdownIsOpen, setYearDropDownIsOpen] = useState(false);

  const handleAddSubject = async (data) => {
    let subjectCode = data.subject_code.toUpperCase();
    let score = data.score.toUpperCase().trim();
    let state = true;
    setIsLoading(true);
    try {
      await addDoc(collection(db, "subjects"), {
        no_cre: parseInt(data.no_cre),
        score: score,
        semester: data.semester,
        subject_code: subjectCode,
        subject_name: data.subject_name,
        year: data.year,
        prerequisite: data.prerequisite,
        physicalEducation: data.physicaledu,
      });
    } catch (error) {
      state = false;
      console.log(error);
    }
    setIsShow(true);
    if (state) {
      setType("success");
      setContent("Added subject successfully");
      setIsLoading(false);
      reset();
    } else {
      setType("fail");
      setContent("Adding subject failed");
    }
  };
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-tr from-cyan-300 to-pink-600">
      <div
        className="w-full h-full bg-repeat pb-[3.25rem] sm:pb-16"
        style={{ backgroundImage: `url('${GreetingBgPNGDesktop}')` }}
      >
        <Navbar />
        <form method="POST" className="w-4/5 sm:w-3/5 mx-auto">
          <h1 className="w-full text-center text-[24px] font-semibold text-white py-5">
            Add Subject
          </h1>
          <div className="w-full mb-10">
            <div className="flex flex-col sm:flex-row gap-y-5 gap-x-5 mb-5">
              <div className="basis-2/3 flex flex-col gap-y-2">
                <label
                  htmlFor="subject_name"
                  className="text-white text-[14px]"
                >
                  Subject name <span className="text-red-500">*</span>
                </label>
                <input
                  name="subject_name"
                  id="subject_name"
                  maxLength={40}
                  {...register("subject_name", {
                    required: "This field is required!",
                  })}
                  type="text"
                  className="h-[40px] w-full outline-none bg-white border-[1px] border-solid border-[rgba(0,0,0,.5)] px-5 text-black rounded-sm focus:border-[rgba(0,0,0,1)]"
                />
                <small className="text-[#ffff00]">
                  {errors.stt && errors.stt.message}
                </small>
              </div>
              <div className="basis-1/3 flex flex-col gap-y-2">
                <label htmlFor="no_cre" className="text-white text-[14px]">
                  No. cre <span className="text-red-500">*</span>
                </label>
                <input
                  name="no_cre"
                  id="no_cre"
                  maxLength={1}
                  min={1}
                  max={9}
                  {...register("no_cre", {
                    required: "This field is required!",
                  })}
                  type="number"
                  className="h-[40px] w-full outline-none bg-white border-[1px] border-solid border-[rgba(0,0,0,.5)] pl-5 pr-2 text-black rounded-sm focus:border-[rgba(0,0,0,1)]"
                />
                <small className="text-[#ffff00]">
                  {errors.no_cre && errors.no_cre.message}
                </small>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-y-5 gap-x-5 mb-5">
              <div className="basis-2/3 flex flex-col gap-y-2">
                <label
                  htmlFor="subject_code"
                  className="text-white text-[14px]"
                >
                  Subject code <span className="text-red-500">*</span>
                </label>
                <input
                  name="subject_code"
                  id="subject_code"
                  maxLength={5}
                  {...register("subject_code", {
                    required: "This field is required!",
                  })}
                  type="text"
                  className="h-[40px] w-full outline-none bg-white border-[1px] border-solid border-[rgba(0,0,0,.5)] px-5 text-black rounded-sm focus:border-[rgba(0,0,0,1)]"
                />
                <small className="text-[#ffff00]">
                  {errors.subject_code && errors.subject_code.message}
                </small>
              </div>
              <div className="basis-1/3 flex flex-col gap-y-2">
                <label htmlFor="score" className="text-white text-[14px]">
                  Score <span className="text-red-500">*</span>
                </label>
                <input
                  name="score"
                  id="score"
                  type="text"
                  {...register("score")}
                  maxLength={2}
                  className="h-[40px] w-full outline-none bg-white border-[1px] border-solid border-[rgba(0,0,0,.5)] px-5 text-black rounded-sm focus:border-[rgba(0,0,0,1)]"
                />
                <p className="text-[12px] text-white">
                  For examples: A, B, B+, C,...
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-y-5 gap-x-5 mb-5">
              <div className="basis-2/3 flex flex-col gap-y-2">
                <label htmlFor="semester" className="text-white text-[14px]">
                  Semester <span className="text-red-500">*</span>
                </label>
                <select
                  name="semester"
                  id="semester"
                  {...register("semester")}
                  onClick={() => {
                    setSemesterDropdownIsOpen(!semesterDropdownIsOpen);
                  }}
                  className=" h-[40px] w-full outline-none bg-white border-[1px] border-solid border-[rgba(0,0,0,.5)] px-5 text-black rounded-sm focus:border-[rgba(0,0,0,1)] appearance-none"
                  style={{
                    backgroundImage: `url('${
                      semesterDropdownIsOpen ? SelectArrowUp : SelectArrowDown
                    }')`,
                    backgroundSize: `10px 10px`,
                    backgroundRepeat: `no-repeat`,
                    backgroundPosition: `95% 50%`,
                  }}
                >
                  <option value={1} className="text-black">
                    Semester 1
                  </option>
                  <option value={2} className="text-black">
                    Semester 2
                  </option>
                  <option value={3} className="text-black">
                    Semester 3
                  </option>
                </select>
              </div>
              <div className="basis-1/3 flex flex-col gap-y-2">
                <label htmlFor="year" className="text-white text-[14px]">
                  Year <span className="text-red-500">*</span>
                </label>{" "}
                <select
                  name="year"
                  id="year"
                  {...register("year")}
                  onClick={() => {
                    setYearDropDownIsOpen(!yearDropdownIsOpen);
                  }}
                  className="h-[40px] w-full outline-none bg-white border-[1px] border-solid border-[rgba(0,0,0,.5)] px-5 text-black rounded-sm focus:border-[rgba(0,0,0,1)] appearance-none"
                  style={{
                    backgroundImage: `url('${
                      yearDropdownIsOpen ? SelectArrowUp : SelectArrowDown
                    }')`,
                    backgroundSize: `10px 10px`,
                    backgroundRepeat: `no-repeat`,
                    backgroundPosition: `95% 50%`,
                  }}
                >
                  <option value="2021 - 2022" className="text-black">
                    2021 - 2022
                  </option>
                  <option value="2022 - 2023" className="text-black">
                    2022 - 2023
                  </option>
                  <option value="2023 - 2024" className="text-black">
                    2023 - 2024
                  </option>
                  <option value="2024 - 2025" className="text-black">
                    2024 - 2025
                  </option>
                  <option value="2025 - 2026" className="text-black">
                    2025 - 2026
                  </option>
                </select>
              </div>
            </div>
            <div className="flex gap-x-5">
              <div className="flex items-center gap-x-2">
                <input
                  className="h-5 w-5"
                  type="checkbox"
                  name="prerequisite"
                  id="prerequisite"
                  {...register("prerequisite")}
                />
                <label htmlFor="prerequisite" className="text-white">
                  {" "}
                  Prerequisite <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="flex items-center gap-x-2">
                <input
                  className="h-5 w-5"
                  type="checkbox"
                  name="physicaledu"
                  id="physicaledu"
                  {...register("physicaledu")}
                />
                <label htmlFor="physicaledu" className="text-white">
                  {" "}
                  Physical education <span className="text-red-500">*</span>
                </label>
              </div>
            </div>
          </div>
          <div className="w-full  flex justify-end">
            <button
              onClick={handleSubmit(handleAddSubject)}
              className="bg-white w-[150px] rounded-full flex justify-center items-center h-[40px] gap-x-2 shadow-md"
            >
              ADD <img src={rocketIcon} />
            </button>
          </div>
        </form>
      </div>
      <Footer />
      <Sidebar />
    </div>
  );
};

export default Addsubject;
