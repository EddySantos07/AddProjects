import React, { useState, useEffect, useRef } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore , { Navigation, Pagination, Controller, Thumbs } from "swiper";

// Import Swiper styles
// import "swiper/swiper-bundle.css";
import 'swiper/swiper.scss';
import "../../../dist/styles.css";

SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

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
          <SwiperSlide key={`slide-${index}`} tag="li" >
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
