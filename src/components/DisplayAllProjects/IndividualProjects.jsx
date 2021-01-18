import React, { useState, useEffect } from "react";
import IndividualProjectPicData from "./IndividualProjectPicData";
import { Swiper } from "swiper/react";

const IndividualProjects = ({ allProjects }) => {
  const [projects, setProjects] = useState([]);

  if (allProjects === undefined || allProjects.length === 0) {
    return (
      <>
        <div> No Projects to display... </div>
      </>
    );
  }

  console.log("individual projects updated", allProjects);

  let slides = [];

  allProjects.map((collection) => {
    slides.push(<IndividualProjectPicData singleProjectData={collection} />);
  });

  console.log(slides, 'slides')
  return (
    <>
      <Swiper> {slides} </Swiper>
    </>
  );
};

export default IndividualProjects;
