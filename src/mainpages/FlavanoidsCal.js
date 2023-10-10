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

  //it will return class with count
  const getClassData = (data) => {
    var counts = {};
    data.forEach(function (e) {
      if (counts[e.Alcohol] === undefined) {
        counts[e.Alcohol] = 0;
      } else counts[e.Alcohol] += 1;
    });

    return counts;
  };
  const calculateMeanOf = () => {
    let countsOfAlcohol = getClassData(classData);
    let meanOfFlavanoids = Object.entries(countsOfAlcohol).map(
      (alcoholCount) => {
        let sumOfFlavanoids = 0;
        let sumOfxifi = 0;

        //initialize in case if "Flavanoids" is missing in some class to calculate exact length otherwise we can use .length method
        let length = 0;
        let sumOffi = 0;

        classData.forEach((classItem) => {
          if (classItem.Alcohol === parseInt(alcoholCount[0])) {
            // sumOfxifi = +classItem.Alcohol * classItem.Flavanoids;
            sumOfFlavanoids = +classItem.Flavanoids;
            ++length;
            // sumOffi = +classItem.Flavanoids;
          }
        });
        // sumOfFlavanoids = Math.round(sumOfFlavanoids * 1e3) / 1e3;
        console.log(
          // sumOfFlavanoids.toFixed(3),
          sumOfFlavanoids,
          // Math.round(sumOfFlavanoids * 1e3) / 1e3,
          parseInt(alcoholCount[0]),
          length,
          "alcohol"
        );
        meanOfFlav = sumOfFlavanoids / length;
        // meanOfFlav = sumOfxifi / sumOffi;

        return {
          class: "Alcohol" + alcoholCount[0],
          mean: meanOfFlav.toFixed(3),
        };
      }
    );

    return { mean: meanOfFlavanoids, title: "Flavanoids mean", key: "mean" };
  };
  const sortTheArray = (arr) => {
    //convert in to assending order
    let max = 0;
    let convertArr = [];

    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          var tempValue = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tempValue;
        }
      }
    }

    return arr;
  };
  const calculateMedian = () => {
    let countsOfAlcohol = getClassData(classData);
    let medianOfFlavanoids = Object.entries(countsOfAlcohol).map(
      (alcoholCount) => {
        let dataByClass = classData.filter(
          (x) => x.Alcohol === parseInt(alcoholCount[0])
        );

        let median = 0;

        let length = dataByClass.length % 2;
        let dataarr = dataByClass.map((x) => {
          return x.Flavanoids;
        });
        dataByClass = sortTheArray(dataarr);
        // return;
        if (length === 0) {
          //for even case
          let midVal = dataByClass.length;

          median =
            (dataByClass[midVal / 2 - 1] + dataByClass[midVal / 2 - 2]) / 2;
        } else {
          let midVal = dataByClass.length - 1;
          median = dataByClass[midVal];
        }
        console.log(median, "median ");
        return {
          class: "Alcohol " + alcoholCount[0],
          median: median.toFixed(3),
        };
      }
    );

    return {
      median: medianOfFlavanoids,
      title: "Flavanoids median",
      key: "median",
    };
  };

  const calculateMode = () => {
    let countsOfAlcohol = getClassData(classData);

    let modeOfFlavanoids = Object.entries(countsOfAlcohol).map(
      (alcoholCount) => {
        var counts = {};

        //calculate total numbers for mode
        classData.forEach(function (e) {
          if (e.Alcohol === parseInt(alcoholCount[0]))
            if (counts[e.Flavanoids] === undefined) {
              counts[e.Flavanoids] = 0;
            } else counts[e.Flavanoids] += 1;
        });
        // console.log(counts, "counts", parseInt(alcoholCount[0]));
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
        // console.log(val, "max before to fixed", parseFloat(val).toFixed(3));
        return {
          class: "Alcohol " + alcoholCount[0],
          mode: parseFloat(val).toFixed(3),
        };
      }
    );

    return { mode: modeOfFlavanoids, title: "Flavanoids mode", key: "mode" };
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
      <TableCard classList={getClassData(classData)} data={calculateData} />
    </div>
  );
}
