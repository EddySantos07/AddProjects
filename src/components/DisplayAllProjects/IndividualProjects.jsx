import React, { useState, useEffect, useRef } from "react";
import IndividualProjectPicData from "./IndividualProjectPicData";

import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import "../../../dist/styles.css";

// install Swiper components
SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

const IndividualProjects = ({ allProjects }) => {
  const [projects, setProjects] = useState([]);

  if (allProjects === undefined || allProjects.length === 0) {
    return (
      <>
        <div> No Projects to display... </div>
      </>
    );
  }

  const params = {
    effect: "cube",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  let slides = [];

  allProjects.map((singleProjectData) => {
    let collectionName = singleProjectData[0].collectionName;

    return (
      <>
        {singleProjectData.map((documentData, index) => {
          if (index === 0) {
            return;
          }

          let fileName = documentData.filename;

          slides.push(
            <SwiperSlide className="background-image">
              <img
                src={`image/${fileName}-${collectionName}`}
                className="imgSliderSwpr img"
              />
            </SwiperSlide>
          );
        })}
      </>
    );
  });

  console.log(slides, "slides");
  return (
    <>
      <Swiper
        tag="section"
        id="main"
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 4,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}

        loop={true}

        autoplay= {{
          delay: 1500,
          disableOnInteraction: false,
        }}

        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}

      >
        {slides}
      </Swiper>
    </>
  );
};

export default IndividualProjects;
