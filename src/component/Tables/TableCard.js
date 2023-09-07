import React from "react";
import "./Tablecard.css";
export default function TableCard({ classList, data }) {
  console.log(classList?.length, "classList");
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {classList?.map((x, i) => {
              return <th>{x}</th>;
            })}
            {/* <th>Widget</th>
            <th>Wingding</th>
            <th>Whatsit</th>
            <th>Whirlygig</th> */}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => {
            return (
              <tr>
                <td>
                  {item.title} {item[item.key]}
                </td>
                {classList?.map((x) => {
                  return <td> </td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
