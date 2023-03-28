import FamilyChart from 'family-chart'
import React from 'react'
import dataJson from '../../data.json';


const FamilyComp = () => {
  return (
    <div><FamilyChart data={dataJson}/></div>
  )
}

export default FamilyComp