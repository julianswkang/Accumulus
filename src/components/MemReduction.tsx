import React from 'react';
import { memUsedVsAllo } from '../../Data/byFunc/memUsedVsAllo'
import { MemUsed } from '../../server/types'

const fetchedData = memUsedVsAllo

const MemReduction = () => {
  //declare var to hold all divs
  const eligibleFuncs = [];
  const memRatioOrdered = [];
  
  for(let i = 0; i < fetchedData.length; i++) {
    const objOfInterest = fetchedData[i];
    const funcName = objOfInterest.name
    const diff:number = Number(objOfInterest[`diff${funcName}`])
    const allocated:number = Number(fetchedData[i][`allo${funcName}`]);
    const memRatio = Math.floor((diff/(diff + allocated))*100)
    if( memRatio > 25){
      memRatioOrdered.push(
        [funcName, memRatio]
      )
    }
  }
  memRatioOrdered.sort((a, b) => {
    if(a[1] < b[1]) return 1
    if (a[1] > b[1]) return -1;
    else return 0
  })

  for(let i = 0; i < memRatioOrdered.length; i++) {
    eligibleFuncs.push(
      <div>
        Function {memRatioOrdered[i][0]} qualifies for lower memory allocation. Its memory usage ratio is {memRatioOrdered[i][1]}%.
      </div>
    )
  }

  return (
    <>
      {eligibleFuncs}
    </>
  );
};

export default MemReduction;