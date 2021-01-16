import React, { useState, useEffect } from "react";

const IndividualProjectPicData = ({ singleProjectData }) => {
  let collectionName = singleProjectData[0].collectionName;

  return ( 
  <>
    { singleProjectData.map( (documentData, index ) => {
      if (index === 0) {
        return;
      }

      let fileName = documentData.filename;

      return (
        <div className='singleProjectContainer'>
          <img src={fileName} />
        </div>
      )

    })}
  </>);
};

export default IndividualProjectPicData;
