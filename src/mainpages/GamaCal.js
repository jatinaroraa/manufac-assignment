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
        let gamma = 0;
        let sumOfxifi = 0;
        let sumOffi = 0;

        //initialize in case if "ash and all" is missing in some class to calculate exact length otherwise we can use .length method
        let length = 0;
        classData.forEach((classItem) => {
          if (classItem.Alcohol === parseInt(alcoholCount[0])) {
            // gamma = +(classItem.Ash * classItem.Hue) / classItem.Magnesium;
            sumOfxifi =
              +((classItem.Ash * classItem.Hue) / classItem.Magnesium) *
              classItem.Alcohol;
            sumOffi = +classItem.Flavanoids;
            // length++;
          }
        });

        let meanOfFlav = sumOfxifi / sumOffi;

        return {
          class: "Alcohol " + alcoholCount[0],
          mean: meanOfFlav.toFixed(3),
        };
      }
    );
    return {
      title: "Gamma Mean",
      key: "mean",
      mean: meanOfFlavanoids,
    };
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

        // return;
        if (length === 0) {
          //for even case
          let midVal = dataByClass.length;
          let gamma1 =
            (dataByClass[midVal / 2 - 2].Ash *
              dataByClass[midVal / 2 - 2].Hue) /
            dataByClass[midVal / 2 - 2].Magnesium;
          let gamma2 =
            (dataByClass[midVal / 2 - 1].Ash *
              dataByClass[midVal / 2 - 1].Hue) /
            dataByClass[midVal / 2 - 1].Magnesium;
          median = (gamma1 + gamma2) / 2;
        } else {
          let midVal = dataByClass.length - 1;
          median =
            (dataByClass[midVal].Ash * dataByClass[midVal].Hue) /
            dataByClass[midVal].Magnesium;
        }
        return {
          class: "Alcohol " + alcoholCount[0],
          median: median.toFixed(3),
        };
      }
    );
    return {
      title: "Gamma Median",
      key: "median",
      median: medianOfFlavanoids,
    };
  };
  const calculateMode = () => {
    let countsOfAlcohol = getClassData(classData);
    let modeOfFlavanoids = Object.entries(countsOfAlcohol).map(
      (alcoholCount) => {
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
        return {
          class: "Alcohol " + alcoholCount[0],
          mode: Object.keys(max)[0],
        };
      }
    );

    return { title: "Gamma Mode", key: "mode", mode: modeOfFlavanoids };
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
      <TableCard classList={getClassData(classData)} data={calculateData} />
    </div>
  );
}
