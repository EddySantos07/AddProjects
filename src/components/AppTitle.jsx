import React from "react";
import UploaderForm from "./UploaderForm/UploaderForm";
import DisplayAllProjects from './DisplayAllProjects/DisplayAllProjects';

const AppTitle = () => {
  return (
    <>
      <div className="containerForm">
        <div className="row">
          <div className="col-md-6 m-auto ">
            <h1 className="text-center display-4 my-4 mainTitle"> Mongo File Uploads </h1>
            <UploaderForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppTitle;
