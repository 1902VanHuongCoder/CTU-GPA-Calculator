function letterToNumericalGrades(letter) {
  if (letter === "A") {
    return 4;
  } else if (letter === "B+") {
    return 3.5;
  } else if (letter === "B") {
    return 3;
  } else if (letter === "C+") {
    return 2.5;
  } else if (letter === "C") {
    return 2;
  } else if (letter === "D+") {
    return 1.5;
  } else if (letter === "D") {
    return 1;
  } else {
    return 0;
  }
}
export default letterToNumericalGrades;
