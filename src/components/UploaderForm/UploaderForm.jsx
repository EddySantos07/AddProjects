import React, { useState, useEffect } from "react";

const UploaderForm = () => {
  return (
    <>
      <form action="/validationForm" method="POST" encType="multipart/form-data">
        <div className="custom-file mb-3">
          <input type="text" id="text" name="text" className="form-control" placeholder="Choose Project Table Name"/>

          <label htmlFor="text"></label>
        </div>

        <br></br>

        <div className=" mb-3">
          <input
            type="file"
            name="file"
            id="file"
            className="border form-control "
          />

          <label htmlFor="file" className=""></label>
        </div>

        <input
          type="submit"
          value="Submit"
          className="btn btn-primary btn-block"
        />
      </form>
    </>
  );
};

export default UploaderForm;
