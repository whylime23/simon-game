import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    isOn: false,
    isStrict: false,
    isStart: false,
    count: 0,
    sequence: [],
  }

  generateQuadrant = () => {
    return Math.floor(Math.random() * (4) + 1);
  }

  blah = () => {
    const randomNNumber = this.generateQuadrant();
    this.state.sequence.push(randomNNumber);

    this.setState({ activeQuadrant: randomNNumber }, () => {
      setTimeout(() => {
        this.setState({ activeQuadrant: '' });
      }, 2000)
    }
    )
  }

  handleOnToggle = () => {
    if (this.state.isOn === true) {
      this.setState({
        isOn: false,
        isStrict: false,
        isStart: false,
        count: 0,
        sequence: []
      });
    } else if (this.state.isOn === false) {
      this.setState({
        isOn: true
      });
    }
  }

  handleStrictMode = () => {
    this.setState({
      isStrict: !this.state.isStrict
    });
  }

  render() {

    const { activeQuadrant, count, isOn, isStrict } = this.state;

    return (
      <div className='App'>
        <div className='Console'>

          <div className='Controls'>
            <h1 className='Simon-title'>SIMON</h1>
            <div className='Control-bulk'>
              <div className='Control-buttons'>
                <span className='Count-display'>{isOn === false ? '--' : count}</span>
                <span><p className='button-label'>COUNT</p></span>
              </div>
              <div className='Control-buttons'>
                <button className='Start-button indv-item' disabled={!isOn}></button>
                <span><p className='button-label'>START</p></span>
              </div>
              <div className='Control-buttons'>
                <span className={`Strict-light ${isStrict === false ? 'strict-light-off' : 'strict-light-on'}`}></span>
                <button className='Strict-button' disabled={!isOn} onClick={this.handleStrictMode}></button>
                <span><p className='button-label'>STRICT</p></span>
              </div>
            </div>
            <div className='On-toggle'>
              <p>ON</p>
              <button className={`toggle-button `} onClick={this.handleOnToggle}>
                <div className='toggle-icon'>
                  <i className={`fa fa-toggle-on fa-2x ${isOn === true ? 'rotate-icon' : ''}`}></i>
                </div>
              </button>
              <p>OFF</p>
            </div>
          </div>

          <div className='Row'>
            <div className={`Buttons Green border-top border-left border-right ${activeQuadrant === 1 ? 'active' : ''}`}>
              <button className='1 green-button play-buttons' disabled={!isOn}></button>
            </div>
            <div className={`Buttons Red border-top border-right ${activeQuadrant === 2 ? 'active' : ''}`}>
              <button className='2 red-button play-buttons' disabled={!isOn}></button>
            </div>
          </div>
          <div className='Row'>
            <div className='Buttons Yellow border-top border-bottom border-left border-right'>
              <button className='3 yellow-button play-buttons' disabled={!isOn}></button>
            </div>
            <div className='Buttons Blue border-top border-bottom border-right'>
              <button className='4 blue-button play-buttons' disabled={!isOn}></button>
            </div>
          </div>
        </div>
        <div className='Footer'>
        Designed and coded by &nbsp;<a
            className='emily-link'
            href='https://www.freecodecamp.com/whylime23'
            target='_blank'
            rel='noopener noreferrer'>Emily Taylor</a>&nbsp; using Atom, React and Chrome dev tools. Background image by rawpixel.com from Pexels.
        </div>
      </div>
    );
  }
}

export default App;
