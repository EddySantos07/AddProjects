import React, { Component } from "react";

class View extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <>
        <div className="container"> 
            <div className="row">
                <div className="col-md-6 m-auto " > 
                    <h1 className="text-center display-4 my-4" > Mongo File Uploads </h1>
                </div>
            </div>
        </div>
      </>
    );
  }
}

export default View; 