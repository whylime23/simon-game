/* eslint jsx-a11y/media-has-caption: 0 */
import React, { Component } from 'react';

import './App.css';
import greenSound from './sounds/simonSound1.mp3';
import redSound from './sounds/simonSound2.mp3';
import yellowSound from './sounds/simonSound3.mp3';
import blueSound from './sounds/simonSound4.mp3';

class App extends Component {
  state = {
    isOn: false,
    isStrict: false,
    isStart: false,
    count: 0,
    clickedColour: '',
    activeQuadrant: '',
    sequence: []
  }

  generateQuadrant = () => {
    switch (Math.floor(Math.random() * (4) + 1)) {
      case 1:
        return 'green';
      case 2:
        return 'red';
      case 3:
        return 'yellow';
      case 4:
        return 'blue';
    }
  }

  handleStart = () => {
    const randomColour = this.generateQuadrant();
    this.state.sequence.push(randomColour);
    // play sound (move relevant handleQuadrantClick things out to another function, call here)

    this.setState({ activeQuadrant: randomColour }, () => {
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

  handleQuadrantClick = (colour) => {
    this.setState({
      clickedColour: colour
    });
    switch(colour) {
      case 'green':
        this.green.play()
        break;
      case 'red':
        this.red.play()
        break;
      case 'yellow':
        this.yellow.play()
        break;
      case 'blue':
        this.blue.play()
        break;
    }
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
                <span className='Count-display'>{!isOn ? '--' : count}</span>
                <span><p className='button-label'>COUNT</p></span>
              </div>
              <div className='Control-buttons'>
                <button className='Start-button indv-item' onClick={this.handleStart} disabled={!isOn}></button>
                <span><p className='button-label'>START</p></span>
              </div>
              <div className='Control-buttons'>
                <span className={`Strict-light ${!isStrict ? 'strict-light-off' : 'strict-light-on'}`}></span>
                <button className='Strict-button' disabled={!isOn} onClick={this.handleStrictMode}></button>
                <span><p className='button-label'>STRICT</p></span>
              </div>
            </div>
            <div className='On-toggle'>
              <p>ON</p>
              <button className={`toggle-button `} onClick={this.handleOnToggle}>
                <div className='toggle-icon'>
                  <i className={`fa fa-toggle-on fa-2x ${isOn ? 'rotate-icon' : ''}`}></i>
                </div>
              </button>
              <p>OFF</p>
            </div>
          </div>

          <div className='Row'>
            <div className={`Buttons Green border-top border-left border-right`}>
              <audio ref={(element) => { this.green = element; }}>
                <source src={greenSound} type='audio/mpeg'/>
              </audio>
              <button className='1 green-button play-buttons' onClick={() => this.handleQuadrantClick('green')} disabled={!isOn}></button>
            </div>
            <div className={`Buttons Red border-top border-right ${activeQuadrant === 2 ? 'active' : ''}`}>
              <audio ref={(element) => { this.red = element; }}>
                <source src={redSound} type='audio/mpeg'/>
              </audio>
              <button className='2 red-button play-buttons' onClick={() => this.handleQuadrantClick('red')} disabled={!isOn}></button>
            </div>
          </div>
          <div className='Row'>
            <div className='Buttons Yellow border-top border-bottom border-left border-right'>
              <audio ref={(element) => { this.yellow = element; }}>
                <source src={yellowSound} type='audio/mpeg'/>
              </audio>
              <button className='3 yellow-button play-buttons' onClick={() => this.handleQuadrantClick('yellow')} disabled={!isOn}></button>
            </div>
            <div className='Buttons Blue border-top border-bottom border-right'>
              <audio ref={(element) => { this.blue = element; }}>
                <source src={blueSound} type='audio/mpeg'/>
              </audio>
              <button className='4 blue-button play-buttons' onClick={() => this.handleQuadrantClick('blue')} disabled={!isOn}></button>
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
