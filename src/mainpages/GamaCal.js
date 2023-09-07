import React, { useEffect, useState } from "react";
import { classData } from "../utils/sourseData/ClassData";
import TableCard from "../component/Tables/TableCard";
/**
 *
 * @returns
 * Gamma = (Ash * Hue) / Magnesium.
 */
export default function GamaCal() {
  const classList = Object.keys(classData[0]);
  //   console.log(classData, "classData gamma");

  const [calculateData, setCalculateData] = useState([]);

  useEffect(() => {
    onCall();
  }, []);
  const onCall = () => {
    let mode = calculateMode();

    let mean = calculateMeanOf();
    let median = calculateMedian();
    setCalculateData([mean, mode, median]);
  };
  const calculateMeanOf = () => {
    let gamma = 0;
    //initialize in case if "ash and all" is missing in some class to calculate exact length otherwise we can use .length method
    let length = 0;
    classData.forEach((classItem) => {
      if (classItem.Ash) {
        gamma = +(classItem.Ash * classItem.Hue) / classItem.Magnesium;
        length++;
      }
    });

    let meanOfFlav = gamma / length;
    console.log(meanOfFlav.toFixed(3), gamma, "gamma");
    return {
      title: "Gamma Mean",
      key: "mean",
      mean: meanOfFlav.toFixed(3),
    };
  };
  const calculateMedian = () => {
    let median = 0;

    let length = classData.length % 2;

    // return;
    if (length === 0) {
      //for even case
      let midVal = classData.length;
      let gamma1 =
        (classData[midVal / 2].Ash * classData[midVal / 2].Hue) /
        classData[midVal / 2].Magnesium;
      let gamma2 =
        (classData[midVal / 2 - 1].Ash * classData[midVal / 2 - 1].Hue) /
        classData[midVal / 2 - 1].Magnesium;
      median = (gamma1 + gamma2) / 2;
    } else {
      let midVal = classData.length - 1;
      median =
        (classData[midVal].Ash * classData[midVal].Hue) /
        classData[midVal].Magnesium;
    }

    return {
      title: "Gamma Median",
      key: "median",
      median: median.toFixed(3),
    };
  };
  const calculateMode = () => {
    var counts = {};

    //calculate total numbers for mode
    classData.forEach(function (e) {
      let gamma = (e.Ash * e.Hue) / e.Magnesium;
      gamma = gamma.toFixed(3);
      if (counts[gamma] === undefined) {
        counts[gamma] = 0;
      } else counts[gamma] += 1;
    });

    let values = Object.entries(counts);
    let maxVal = -1;
    let max = {};

    //find out max number count
    values.forEach((item) => {
      if (item[1] > maxVal) {
        maxVal = item[1];
        max = { [item[0]]: item[1] };
      }
    });

    return { title: "Gamma Mode", key: "mode", mode: Object.keys(max)[0] };
  };

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        {" "}
        for Gamma
      </h2>
      <TableCard classList={classList} data={calculateData} />
    </div>
  );
}
