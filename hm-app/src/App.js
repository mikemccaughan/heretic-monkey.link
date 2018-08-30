import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MynSweepr from './mynsweepr/MynSweepr';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      which: 0
    };
  }
  render() {
    switch (this.state.which) {
      case 1:
    return (<MynSweepr parent={this}/>);
      case 2:
        return (<p>Not Implemented</p>);
      case 0:
       default:
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Heretic-Monkey.link - A Playground</h1>
            </header>
            <p className="App-intro">
              This website is a place for the Heretic-Monkey to play around with various and
              sundry web technologies. Here's a list:
            </p>
            <ul className="App-links">
              <li onClick={() => this.setState({which: 1})}>MynSweepr (a Minesweeper clone)</li>
              <li onClick={() => this.setState({which: 2})}>Calc (an attempt to recreate Windows 10's Calculator app in HTML/CSS/JS</li>
            </ul>
          </div>
        );
      }
  }
}

export default App;
