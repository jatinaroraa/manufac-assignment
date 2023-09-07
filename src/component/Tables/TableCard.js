import React from "react";
import "./Tablecard.css";
export default function TableCard({ classList, data }) {
  console.log(classList, "classList");
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {Object.entries(classList)?.map((x, i) => {
              return <th>Alcohol {x[0]}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => {
            return (
              <tr>
                <td>{item.title}</td>
                {item[item.key]?.map((x) => {
                  return <td> {x[item.key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
