import FamilyChart from 'family-chart'
import React from 'react'
import dataJson from '../../data.json';


const FamilyComp = () => {
  return (
    <FamilyChart data={dataJson}/>
  )
}

export default FamilyComp