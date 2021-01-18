import React, { Component } from "react";
import View from "./components/view";
import DisplayAllProjects from "./components/DisplayAllProjects/DisplayAllProjects"

class App extends React.Component {
  render() {
    return (
      <>
        <View />

        <DisplayAllProjects />
      </>
    );
  }
}

export default App;
