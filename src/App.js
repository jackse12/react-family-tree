import React from "react";
import FamilyTree from "./app/familyChart/FamilyChartActions";
import 'materialize-css/dist/css/materialize.min.css'
// import FamilyComp from "./app/familyChartComp";


export default function App() {
  return (
    <div className="App">
      <FamilyTree/>
      {/* <FamilyComp/> */}
    </div>
  );
}
