import React, { useState, useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

// Import Swiper styles
// import "swiper/bundle";
// import 'swiper/swiper-bundle.css';

const IndividualProjectPicData = ({ singleProjectData }) => {
  let collectionName = singleProjectData[0].collectionName;

  console.log(singleProjectData, "single project data");
  return (
    <>
      {singleProjectData.map((documentData, index) => {
        if (index === 0) {
          return;
        }

        let fileName = documentData.filename;

        return (
          <SwiperSlide key={index}>
            <img
              src={`image/${fileName}-${collectionName}`}
              className="imgSwiperSlide"
            />
          </SwiperSlide>
        );
      })}
    </>
  );
};
export default IndividualProjectPicData;
