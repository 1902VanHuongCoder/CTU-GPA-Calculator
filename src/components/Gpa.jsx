import { useContext, useEffect, useState } from "react";
import GreetingBgPNGDesktop from "../assets/GreetingBgPNGDesktop.png";
import Footer from "./default_components/Footer";
import Navbar from "./default_components/Navbar";
import Sidebar from "./default_components/Sidebar";
import { LoadingContext } from "../contexts/loadingContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase_setup/firebase";
import letterToNumericalGrades from "../helpers/letterToNumericalGrades";
const Gpa = () => {
  const { setIsLoading } = useContext(LoadingContext);
  const [subjectsDatas, setSubjectsDatas] = useState([]);
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
  }; // fetch subject datas from firebase
  useEffect(() => {
    fetchSubjectsDatas();
  }, []); // run fetchSubjectsDatas function in the first loading

  const arrayYears = []; // save all semesters from the objects of subjectsDatas array.
  subjectsDatas?.forEach((element) => {
    arrayYears.push(element.year);
  });
  const uniqueValues = Array.from(new Set(arrayYears)); // reduce arrayYears (e.g ['2021 - 2022', '2021 - 2022] => ['2021 - 2022'])
  const averagePoint = []; // array to store all cumulative points of all years
  console.log(averagePoint);
  uniqueValues.map((year) => {
    {
      let count = 1; // There are 3 semesters in an academic year
      let totalPoint = 0; //  is calculated from multiples of subject score and number of credits of that subject in a semester
      let nocre = 0; // store the number of credits in a semester
      let i = 1;
      while (i <= subjectsDatas.length && count < 4) {
        if (
          subjectsDatas[i - 1].physicalEducation === false && // subject is not physical education
          subjectsDatas[i - 1].year === year &&
          subjectsDatas[i - 1].semester == count &&
          subjectsDatas[i - 1].score !== "M"
        ) {
          totalPoint +=
            letterToNumericalGrades(subjectsDatas[i - 1].score) * // letterToNumericalGrades function convert letter grades to numerical grades
            subjectsDatas[i - 1].no_cre;
          nocre += subjectsDatas[i - 1].no_cre;
        }

        if (i == subjectsDatas.length && totalPoint != 0) {
          // console.log('Loop ' + semester + ': Year = ' + year + ', YFromO = ' +  averagePoint[averagePoint.length - 1]?.year)
          if (
            averagePoint.length === 0 ||
            year !== averagePoint[averagePoint.length - 1]?.year
          ) {
            averagePoint.push({
              year: year,
              points: [],
            });
            averagePoint[averagePoint.length - 1].points.push(
              (totalPoint / nocre).toFixed(2)
            );
          } else {
            averagePoint[averagePoint.length - 1].points.push(
              (totalPoint / nocre).toFixed(2)
            );
          }
          i = 0;
          count++;
          totalPoint = 0;
          nocre = 0;
        }
        i++;
      }
    }
  });

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-tr from-cyan-300 to-pink-600">
      <div
        className="w-full h-full bg-repeat pb-5"
        style={{ backgroundImage: `url('${GreetingBgPNGDesktop}')` }}
      >
        <Navbar />
        <div className="w-[95%] sm:w-full sm:px-10 mx-auto overflow-hidden">
          <h1 className="w-full py-5 text-[24px] text-center text-white font-bold mb-5">
            GPA
          </h1>
          <div className="w-full flex justify-center gap-x-10 flex-wrap">
            {averagePoint.length > 0
              ? averagePoint.map((year, index) => {
                  return (
                    <div
                      key={index}
                      data-aos="fade-up"
                      className="relative flex justify-evenly items-center mb-16 bg-[rgba(0,0,0,.3)] p-5 pt-10 rounded-sm gap-x-4"
                    >
                      <h2 className="absolute top-[-20px] text-black sm:text-[16px] bg-white px-4 py-2 rounded-lg">
                        {year.year}
                      </h2>
                      {year.points.map((point, i) => {
                        return (
                          <div
                            key={i}
                            className="flex flex-col items-center gap-y-2 sm:gap-y-5"
                          >
                            <div
                              className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px]  rounded-full flex justify-center items-center"
                              style={{
                                backgroundImage: `conic-gradient(from 0deg, ${
                                  i === 0
                                    ? "#09ff46"
                                    : i === 1
                                    ? "#f909ff"
                                    : "#e3e836"
                                } 0%, ${
                                  i === 0
                                    ? "#09ff46"
                                    : i === 1
                                    ? "#f909ff"
                                    : "#e3e836"
                                } ${parseInt(
                                  (point / 4) * 100
                                )}%, transparent ${parseInt(
                                  (point / 4) * 100
                                )}%, transparent)`,
                              }}
                            >
                              <div className="w-[60px] h-[60px] sm:w-[100px]  sm:h-[100px] bg-white rounded-full flex justify-center items-center shadow-inner">
                                <h2 className="text-sm sm:text-3xl">
                                  {point}{" "}
                                </h2>
                              </div>
                            </div>
                            <p className="text-white text-[16px] sm:text-[20px]">
                              {i === 0 ? "I" : i === 1 ? "II" : "III"}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              : "..."}
          </div>
        </div>
        <Footer />
      </div>
      <Sidebar />
    </div>
  );
};

export default Gpa;
