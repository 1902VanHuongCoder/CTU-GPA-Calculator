import SquaresBgPNG from "../assets/SquaresBgPNG.png";
import githubIcon from "../assets/githubIcon.png";
import instagramIcon from "../assets/instagramIcon.png";
import facebookIcon from "../assets/facebookIcon.png";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import Navbar from "./default_components/Navbar";
import Sidebar from "./default_components/Sidebar";
import { useContext, useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { LoadingContext } from "../contexts/loadingContext";
import { db } from "../firebase_setup/firebase";
import { useNavigate } from "react-router-dom";
import { NotificationsContext } from "../contexts/notificationContext";
import letterToNumericalGrades from "../helpers/letterToNumericalGrades";
const Home = () => {
  const { setIsLoading } = useContext(LoadingContext);
  const { setIsShow, setContent, setType } = useContext(NotificationsContext);
  const [subjectsDatas, setSubjectsDatas] = useState([]);
  const [currentSection, setCurrentSection] = useState(1);

  console.log(subjectsDatas);
  const fetchSubjectsDatas = async () => {
    var err = false;
    setIsLoading(true);
    try {
      await getDocs(collection(db, "subjects")).then((response) => {
        const dataResponsed = response.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setSubjectsDatas(dataResponsed);
      });
    } catch (error) {
      err = true;
      console.log(error);
    }

    if (!err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjectsDatas();
  }, []);

  var sliceArray = subjectsDatas.slice(
    currentSection * 5 - 5,
    currentSection * 5
  );

  const calculatePoint = () => {
    let cumulativePoint = 0;
    let totalPoint = 0;
    let numberOfCredit = 0;
    if (subjectsDatas.length > 0) {
      subjectsDatas.forEach((element) => {
        if (!element.prerequisite && !element.physicalEducation) {
          numberOfCredit += element.no_cre;
          totalPoint += letterToNumericalGrades(element.score) * element.no_cre;
          // letterToNumericalGrades is an function to convert score from letter to numerical (for example: A -> 4,...)
        }
      });
    }
    cumulativePoint = (totalPoint / numberOfCredit).toFixed(2);
    return cumulativePoint;
  };
  const navigate = useNavigate();
  const hanleRedirectToUpdatePage = (id) => {
    const subject = subjectsDatas.filter((subj) => subj.id === id);
    navigate(`/update/${id}`, {
      state: subject[0],
    });
  };

  const handleDeleteSubject = async (id) => {
    // setIsLoading(true);
    let err = false;
    try {
      await deleteDoc(doc(db, "subjects", id));
    } catch (error) {
      err = true;
      console.log(error);
    }
    setIsShow(true);
    if (!err) {
      setType("success");
      setContent("Deleted subject successfully");
      setIsLoading(false);
      window.location.reload();
    } else {
      setType("fail");
      setContent("Deleting subject failed");
      setIsLoading(false);
      window.location.reload();
    }
  };
  return (
    <div className="relative w-full min-h-screen overflow-scroll lg:h-screen lg:overflow-hidden bg-gradient-to-tr from-cyan-300 to-pink-600">
      <div
        className="w-full h-full bg-repeat"
        style={{ backgroundImage: `url('${SquaresBgPNG}')` }}
      >
        <Navbar />
        <div
          className={`w-full h-['${
            window.innerHeight - 60
          }px'] flex justify-center items-center pb-3 sm:pb-0`}
        >
          <div className="w-full lg:flex">
            <div className={`w-full lg:w-2/3 h-fit mb-16 sm:mb-0`}>
              <div className="w-[320px] h-[352px] sm:w-full sm:h-fit overflow-scroll sm:overflow-auto  mx-auto px-3">
                <div className="w-[600px] h-[300px] sm:h-fit sm:w-[95%] mx-auto text-[12px] sm:text-[14px]">
                  <ul className="text-white w-full flex px-1 lg:px-5 py-2">
                    <li className="basis-[6%] text-center">STT</li>
                    <li className="basis-[25%] lg:basis-[36%] text-center">
                      Subject Name
                    </li>
                    <li className="basis-[13%] lg:basis-[15%] text-center">
                      No. Cre
                    </li>
                    <li className="basis-[8%] text-center">Score</li>
                    <li className="basis-[15%] lg:basis-[10%] text-center">
                      Semester
                    </li>
                    <li className="basis-[21%] lg:basis-[15%] text-center ">
                      Year
                    </li>
                    <li className="basis-[12%]  text-center">Action</li>
                  </ul>
                  {sliceArray.map((subject, index) => {
                    return (
                      <ul
                        data-aos="flip-down"
                        key={subject.id}
                        className={`h-[60px] ${
                          (index + 1) % 2 === 0
                            ? "text-white bg-[rgba(0,0,0,0.3)] "
                            : "bg-[rgba(255,255,255,.8)] text-black"
                        }w-full flex items-center px-1 lg:px-5 mb-1 rounded-lg`}
                      >
                        <li className="basis-[6%] text-center">{index + 1}</li>
                        <li className="basis-[25%] lg:basis-[36%] text-center">
                          {subject.subject_name}
                        </li>
                        <li className="basis-[13%] lg:basis-[15%] text-center">
                          {subject.no_cre}
                        </li>
                        <li className="basis-[8%] text-center">
                          {subject.score}
                        </li>
                        <li className="basis-[15%] lg:basis-[10%] text-center">
                          {subject.semester}
                        </li>
                        <li className="basis-[21%] lg:basis-[15%] text-center">
                          {subject.year}
                        </li>
                        <li className="basis-[12%] flex gap-x-1 lg:gap-x-2 justify-center items-center ">
                          <FaPenToSquare
                            onClick={() =>
                              hanleRedirectToUpdatePage(subject.id)
                            }
                            className="text-green-600 text-[32px]  p-2 cursor-pointer"
                          />
                          <span className="opacity-70 text-white">|</span>{" "}
                          <FaRegWindowClose
                            onClick={() => handleDeleteSubject(subject.id)}
                            className="text-red-600 text-[32px] p-2 cursor-pointer"
                          />
                        </li>
                      </ul>
                    );
                  })}
                </div>
              </div>

              {subjectsDatas.length > 5 && (
                <div className="w-full my-5 flex justify-center gap-x-5">
                  <button
                    disabled={currentSection < 2 ? true : false}
                    onClick={() => setCurrentSection((pre) => pre - 1)}
                    className="disabled:opacity-50 disabled:hover:bg-[rgba(0,0,0,.2)] p-5  border-[1px] border-white border-solid rounded-full text-white bg-[rgba(0,0,0,.2)] hover:bg-[rgba(0,0,0,.4)]"
                  >
                    <FaArrowAltCircleLeft />
                  </button>
                  <button
                    disabled={
                      currentSection === Math.ceil(subjectsDatas.length / 5)
                        ? true
                        : false
                    }
                    onClick={() => setCurrentSection((pre) => pre + 1)}
                    className="disabled:opacity-50 disabled:hover:bg-transparent p-5 border-[1px] border-white border-solid rounded-full text-white bg-transparent hover:bg-[rgba(255,255,255,.2)]"
                  >
                    <FaArrowAltCircleRight />
                  </button>
                </div>
              )}
            </div>
            <div className={`w-full lg:w-1/3 flex flex-col gap-y-5`}>
              <div
                data-aos="fade-up"
                className="flex flex-col items-center gap-y-5"
              >
                <div
                  className="w-[200px] h-[200px] rounded-full flex justify-center items-center"
                  style={{
                    backgroundImage: `conic-gradient(from 0deg, #09ff46 0%, #09ff46 84%, transparent 84%, transparent)`,
                  }}
                >
                  <div className="w-[180px] h-[180px] bg-white rounded-full flex justify-center items-center shadow-inner">
                    <h2 className="text-5xl">
                      {subjectsDatas.length > 0 ? calculatePoint() : "0.00"}
                    </h2>
                  </div>
                </div>
                <p className="text-white">
                  <span className="text-[20px] text-[#fbfe4e]">
                    {calculatePoint() > 3.6
                      ? "Excellent"
                      : calculatePoint() > 3.2
                      ? "Very good"
                      : "Good"}
                  </span>{" "}
                  rating
                </p>
              </div>
              <div
                data-aos="fade-up"
                className="px-5 flex flex-col gap-y-2 text-white"
              >
                <h2 className="w-full py-2 text-[20px]">Notifications</h2>
                <p className="text-[12px]">
                  This website is being finalized, so if you have any feedback,
                  you can contact me via{" "}
                </p>
                <div className="flex w-full justify-center gap-x-4">
                  <a href="">
                    <img
                      src={facebookIcon}
                      alt="facebook icon"
                      className="w-7"
                    />
                  </a>
                  <a href="">
                    <img
                      src={instagramIcon}
                      alt="instagram icon"
                      className="w-7"
                    />
                  </a>
                  <a href="">
                    <img src={githubIcon} alt="github icon" className="w-7" />
                  </a>
                </div>
              </div>
              <p className="text-[10px] px-5 mb-1 text-white">
                Designed by Paul @2023
              </p>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Home;
