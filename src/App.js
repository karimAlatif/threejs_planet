import React, { Component } from "react";
import { HamburgerArrowTurn } from "react-animated-burgers";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

// import "./mine.css";

import Scene from "./Scene";
import Popup from "./Popup";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showDetails: false };
  }
  togglePopup = () => {
    this.setState({ showDetails: !this.state.showDetails });
  };
  render() {
    return (
      <div className="wrapper">
        <HamburgerArrowTurn
          className="hamburger-button"
          isActive={this.state.showDetails}
          toggleButton={this.togglePopup}
          barColor="white"
        />
        <Scene />
        {this.state.showDetails ? (
          <Popup />
        ) : (
          <>
            <h1 className="title text-center">PROPETERRA</h1>
          </>
        )}
      </div>
    );
  }
}

export default App;
