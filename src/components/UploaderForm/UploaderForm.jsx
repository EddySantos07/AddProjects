import React, { useState, useEffect } from "react";

const UploaderForm = () => {
  return (
    <>
      <form action="/upload" method="POST" encType="multipart/form-data">
        <div className="custom-file mb-3">
          <input
            type="file"
            name="file"
            id="file"
            className="custom-file-input"
          />
          <label htmlFor="file" className="custom-file-label">
            
            Choose file
          </label>
        </div>

        <input
          type="submit"
          value="submit"
          className="btn btn-primary btn-block"
        />

      </form>
    </>
  );
};

export default UploaderForm;
