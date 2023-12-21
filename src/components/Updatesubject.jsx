import GreetingBgPNGDesktop from "../assets/GreetingBgPNGDesktop.png";
import SelectArrowUp from "../assets/SelectArrowUp.png";
import SelectArrowDown from "../assets/SelectArrowDown.png";
import rocketIcon from "../assets/Rocket.png";
import { useContext, useState } from "react";
import Navbar from "./default_components/Navbar";
import Footer from "./default_components/Footer";
import Sidebar from "./default_components/Sidebar";
import { db } from "../firebase_setup/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { LoadingContext } from "../contexts/loadingContext";
import { NotificationsContext } from "../contexts/notificationContext";
import { useLocation } from "react-router-dom";
const Updatesubject = () => {
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
  const { state } = useLocation();
  const [subjectName, setSubjectName] = useState(state.subject_name);
  const [noCre, setNoCre] = useState(state.no_cre);
  const [subjectCode, setSubjectCode] = useState(state.subject_code);
  const [score, setScore] = useState(state.score);
  const [semester, setSemester] = useState(state.semester);
  const [year, setYear] = useState(state.year);
  const [prerequisite, setPreRequisite] = useState(state.prerequisite);
  const [physicalEducation, setPhysicalEducation] = useState(state.physicalEducation);
  const onUpdateSubject = async (data) => {
    let subjectCodeUpper = subjectCode.toUpperCase();
    let scoreUpperCase = score.toUpperCase();
    let state = true;
    setIsLoading(true);
    try {
      await updateDoc(doc(db, "subjects", data.subject_id), {
        no_cre: parseInt(noCre),
        score: scoreUpperCase,
        semester: semester,
        subject_code: subjectCodeUpper,
        subject_name: subjectName,
        year: year,
        prerequisite: prerequisite,
        physicalEducation: physicalEducation,
      });
    } catch (error) {
      state = false;
      console.log(error);
    }
    setIsShow(true);
    if (state) {
      setType("success");
      setContent("Updated subject successfully");
      setIsLoading(false);
      reset();
    } else {
      setType("fail");
      setContent("Updating subject failed");
      setIsLoading(false);
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
            Update Subject
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
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  name="subject_name"
                  id="subject_name"
                  maxLength={40}
                  
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
                  value={noCre}
                  onChange={(e) => setNoCre(e.target.value)}
                  name="no_cre"
                  id="no_cre"
                  maxLength={1}
                  min={1}
                  max={9}
                  
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
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                  name="subject_code"
                  id="subject_code"
                  maxLength={5}
                  
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
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
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
                  value={semester}
                  name="semester"
                  id="semester"
                  onChange={(e) => setSemester(e.target.value)}
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
                  value={year}
                  name="year"
                  id="year"
                  onChange={(e) => setYear(e.target.value)}
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
                  checked={prerequisite}
                  className="h-5 w-5"
                  type="checkbox"
                  name="prerequisite"
                  id="prerequisite"
                  onChange={(e) => setPreRequisite(e.target.value)}
                />
                <label htmlFor="prerequisite" className="text-white">
                  {" "}
                  Prerequisite <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="flex items-center gap-x-2">
                <input
                  checked={physicalEducation}
                  className="h-5 w-5"
                  type="checkbox"
                  name="physicaledu"
                  id="physicaledu"
                  onChange={(e) => setPhysicalEducation(e.target.value)}
                />
                <label htmlFor="physicaledu" className="text-white">
                  {" "}
                  Physical education <span className="text-red-500">*</span>
                </label>
                <input
                  type="hidden"
                  id="subject_id"
                  name="subject_id"
                  value={state && state.id}
                  {...register('subject_id')}
                />
              </div>
            </div>
          </div>
          <div className="w-full  flex justify-end">
            <button
              onClick={handleSubmit(onUpdateSubject)}
              className="bg-white w-[150px] rounded-full flex justify-center items-center h-[40px] gap-x-2 shadow-md"
            >
              UPDATE <img src={rocketIcon} />
            </button>
          </div>
        </form>
      </div>
      <Footer />
      <Sidebar />
    </div>
  );
};

export default Updatesubject;
