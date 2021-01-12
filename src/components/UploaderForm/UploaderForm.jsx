import axios from "axios";
import React, { useState, useEffect } from "react";

const UploaderForm = () => {
  const [currentFile, setFile] = useState();
  const [currentCollection, setCollection] = useState();

  function handleFormSubmit(event) {
    //prevent default action
    event.preventDefault();

    let file = event.target.file.files[0];
    let text = event.target.text.value;

    let formData = new FormData();

    console.log(text);
    formData.append("text", text);
    formData.append("file", file);

    // axios.post('https://httpbin.org/anything', formData)
    // .then( (data) => {
    //   console.log(data)
    // })
    // .catch( (err) => {
    //   console.log(err)
    // })

    axios
      .post("/validationForm", formData, {
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((data) => {
        console.log(data.data, "data after callin val form req route");

        let file = data.data.file;
        let collection = data.data.text;

        // console.log()
        // function alrt() {
        //   if (
        //     (file === undefined && collection === undefined) ||
        //     (file === "undefined" && collection.length < 1) ||
        //     (file === undefined && collection.length < 1)
        //   ) {
        //     alert("please select a colleciton name and a file!");
        //   } else if ( file === undefined || collection.length > 0 || file === 'undefined' ) {
        //     alert(" please select a file ");
        //   } else if (file === undefined || file === 'undefined' ) {
        //     alert("please select an img/gif");
        //   }
        // }

        // alrt();
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
            placeholder="Choose Project Collection Name"
            onChange={(event) => {
              const { value } = event.target;
              setCollection(value);
            }}
          />

          <label htmlFor="text"></label>
        </div>

        <br></br>

        <div className=" mb-3">
          <input
            type="file"
            name="file"
            id="file"
            className="border form-control "
            onChange={(event) => {
              const file = event.target.files[0];
              setFile(file);
            }}
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
