import React from "react";
import TableCard from "../component/Tables/TableCard";
import FlavanoidsCal from "./FlavanoidsCal";
import GamaCal from "./GamaCal";

export default function Home() {
  return (
    <div>
      <FlavanoidsCal />
      <GamaCal />
    </div>
  );
}
