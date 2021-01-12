import axios from "axios";
import React, { useState, useEffect } from "react";

const UploaderForm = () => {
  const [currentFile, setFile] = useState({});

  function handleFile(event) {
    //grab the file
    let file = event.target.files[0];
    // console.log(file, 'fileee');

    //set current File to state
    setFile({ file: file });
    // console.log(currentFile, 'current File');
  }

  function handleFormSubmit(event) {
    //prevent default action
    event.preventDefault();

    let file = event.target.file.files[0];
    let text = event.target.text.value;

    let formData = new FormData();

    formData.append("file", file);
    formData.append("text", text);

    axios
      .post("/validationForm", formData, {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((data) => {
        console.log(data, "data after callin val form req route");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          handleFormSubmit(event);
        }}
        method="POST"
        encType="multipart/form-data"
      >
        <div className="custom-file mb-3">
          <input
            type="text"
            id="text"
            name="text"
            className="form-control"
            placeholder="Choose Project Table Name"
          />

          <label htmlFor="text"></label>
        </div>

        <br></br>

        <div className=" mb-3">
          <input
            onChange={(e) => {
              handleFile(e);
            }}
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

/* 

handle form submit -- explination 


function handleFormSubmit (event) {

    //prevent default action 
    event.preventDefault();

    we grab the file and text and store them
    let file = event.target.file.files[0];
    let text = event.target.text.value;

    let formData = new FormData();


    we then append out key values to our new form data 

    formData.append('file' , file);
    formData.append('text', text);


    we pass form data as our second argument to axio and our config obj as our third
    axios.post('/validationForm', formData, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data'  } 
    })
    .then( (data) => {
      console.log(data,'data after callin val form req route')
    })
    .catch((err) => {
      console.log(err);
    })

  }


*/
