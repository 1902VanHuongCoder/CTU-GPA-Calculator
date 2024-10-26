import SquaresBgPNG from "../assets/SquaresBgPNG.png";
import githubIcon from "../assets/githubIcon.png";
import instagramIcon from "../assets/instagramIcon.png";
import facebookIcon from "../assets/facebookIcon.png";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";

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
  const [filteredData, setFilteredData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSubjectsDatas();
  }, []);

  const fetchSubjectsDatas = async () => {
    setIsLoading(true);
    try {
      const response = await getDocs(collection(db, "subjects"));
      const dataResponsed = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSubjectsDatas(dataResponsed);
    } catch (error) {
      console.log(error);
      // Retry logic
      setTimeout(fetchSubjectsDatas, 5000); // Retry after 5 seconds
    } finally {
      setIsLoading(false);
    }
  };

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
  const handleFilterChange = () => {
    const filtered = subjectsDatas.filter((subject) => {
      return (
        (selectedYear ? subject.year === selectedYear : true) &&
        (selectedSemester ? subject.semester === selectedSemester : true) &&
        (searchTerm
          ? subject.subject_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          : true)
      );
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedYear, selectedSemester, subjectsDatas, searchTerm]);

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
              <div className="mb-4 flex flex-col  gap-y-3">
                <h2 className="text-white text-left px-6 py-4 text-2xl flex justify-start items-center gap-x-3">
                  <span className="text-base">
                    <FaFilter />
                  </span>{" "}
                  <span> LỌC MÔN HỌC THEO</span>
                </h2>
                <div className="w-full flex justify-between items-center px-6 gap-x-2">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="p-2 border rounded w-1/2  outline-none"
                  >
                    <option value="">Chọn năm</option>
                    {/* Add options dynamically based on available years */}
                    {[
                      ...new Set(subjectsDatas.map((subject) => subject.year)),
                    ].map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="p-2 border rounded w-1/2 outline-none"
                  >
                    <option value="">Chọn học kỳ</option>
                    {/* Add options dynamically based on available semesters */}
                    {[
                      ...new Set(
                        subjectsDatas.map((subject) => subject.semester)
                      ),
                    ].map((semester) => (
                      <option key={semester} value={semester}>
                        {semester}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full px-6">
                  {" "}
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Nhập tên môn học..."
                    className="p-2 border rounded w-full outline-none"
                  />
                </div>
              </div>
              <div className="w-full overflow-x-scroll flex  justify-center items-center">
                <div className="w-[750px]">
                  <table className="min-w-full bg-white text-[14px] border border-[rgba(0,0,0,.1)]">
                    <thead className="bg-[rgb(216,43,122)] text-white">
                      <tr>
                        <th className=" px-2 border border-[rgba(0,0,0,.1)]">
                          STT
                        </th>
                        <th className=" px-2 border border-[rgba(0,0,0,.1)]">
                          Mã HP
                        </th>
                        <th className=" px-2 border border-[rgba(0,0,0,.1)]">
                          Tên HP
                        </th>
                        <th className=" px-2 border border-[rgba(0,0,0,.1)]">
                          Tín chỉ
                        </th>
                        <th className=" px-2 border border-[rgba(0,0,0,.1)]">
                          Điểm
                        </th>
                        <th className=" px-2 border border-[rgba(0,0,0,.1)]">
                          Tiên quyết
                        </th>
                        <th className=" px-2 border border-[rgba(0,0,0,.1)]">
                          GDTC
                        </th>
                        <th className=" px-2 border border-[rgba(0,0,0,.1)]">
                          Hành động
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((subject, index) => (
                        <tr key={subject.id}>
                          <td className="text-center  px-2 border border-[rgba(0,0,0,.1)]">
                            {index + 1}
                          </td>
                          <td className="text-center  px-2 border border-[rgba(0,0,0,.1)]">
                            {subject.subject_code}
                          </td>
                          <td className="text-left  px-2 border border-[rgba(0,0,0,.1)]">
                            {subject.subject_name}
                          </td>
                          <td className="text-center  px-2 border border-[rgba(0,0,0,.1)]">
                            {subject.no_cre}
                          </td>
                          <td className="text-center  px-2 border border-[rgba(0,0,0,.1)]">
                            {subject.score}
                          </td>
                          <td className="text-center  px-2 border border-[rgba(0,0,0,.1)]">
                            <input
                              type="checkbox"
                              checked={subject.prerequisite}
                              readOnly
                            />
                          </td>
                          <td className="text-center  px-2 border border-[rgba(0,0,0,.1)]">
                            <input
                              type="checkbox"
                              checked={subject.physicalEducation}
                              readOnly
                            />
                          </td>
                          <td className="text-center  px-2 border border-[rgba(0,0,0,.1)]">
                            <button className="mr-2">Cập nhật</button>
                            <button>Xóa</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* {subjectsDatas.length > 5 && (
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
              )} */}
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
