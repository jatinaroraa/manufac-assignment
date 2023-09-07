import React, { useEffect, useState } from "react";
import { classData } from "../utils/sourseData/ClassData";
import TableCard from "../component/Tables/TableCard";

/**
 * 
 * @returns 
 * Q1) Write utility functions to calculate the class-wise mean, median, mode of
“Flavanoids” for the entire dataset.

Mean = (Sum of all numbers) / (Total count of numbers)
 */
export default function FlavanoidsCal() {
  const [calculateData, setCalculateData] = useState([]);
  var meanOfFlav = 0;
  var medianOf = 0;
  var storeMeanData = [];
  const classList = Object.keys(classData[0]);

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
    let sumOfFlavanoids = 0;
    //initialize in case if "Flavanoids" is missing in some class to calculate exact length otherwise we can use .length method
    let length = 0;
    classData.forEach((classItem) => {
      if (classItem.Flavanoids) {
        sumOfFlavanoids = +classItem.Flavanoids;
        length++;
      }
    });

    meanOfFlav = sumOfFlavanoids / length;

    return {
      title: "Flavanoids Mean",
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

      median =
        (classData[midVal / 2].Flavanoids +
          classData[midVal / 2 - 1].Flavanoids) /
        2;
    } else {
      let midVal = classData.length - 1;
      median = classData[midVal].Flavanoids;
    }

    return {
      title: "Flavanoids Median",
      key: "median",
      median: median.toFixed(3),
    };
  };
  const calculateMode = () => {
    var counts = {};

    //calculate total numbers for mode
    classData.forEach(function (e) {
      if (counts[e.Flavanoids] === undefined) {
        counts[e.Flavanoids] = 0;
      } else counts[e.Flavanoids] += 1;
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
    let val = Object.keys(max)[0];

    return {
      title: "Flavanoids Mode",
      key: "mode",
      mode: parseInt(val).toFixed(3),
    };
  };

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        {" "}
        for Flavanoids
      </h2>
      <TableCard classList={classList} data={calculateData} />
    </div>
  );
}
