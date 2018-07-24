/* eslint jsx-a11y/media-has-caption: 0 */
import React, { Component } from 'react';

import './App.css';
import greenSound from './sounds/simonSound1.mp3';
import redSound from './sounds/simonSound2.mp3';
import yellowSound from './sounds/simonSound3.mp3';
import blueSound from './sounds/simonSound4.mp3';

const BUTTON_LIT_LENGTH = 500;
const BUTTON_CYCLE_LENGTH = BUTTON_LIT_LENGTH * 2;

class App extends Component {
  state = {
    isOn: false,
    isStrict: false,
    clickedColour: '',
    activeQuadrant: '',
    playerTurn: 'computer',
    error: false,
    win: false,
    computerSequence: [],
    userSequence: []
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

  playSound = (colour) => {
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

  buttonLit = (colour) => {
    const { activeQuadrant, clickedColour } = this.state;
    return activeQuadrant === colour || clickedColour === colour ? `${colour}-button-lit` : '';
  }

  playButtonsEnable = () => {
    return this.state.playerTurn === 'computer';
  }

  lightQuadrant = (colour) => {
    this.setState({ clickedColour: colour }, () => {
      setTimeout(() => {
        this.setState({ clickedColour: '' });
      }, BUTTON_LIT_LENGTH)
    }
    )
  }

  computerTurn = () => {
    const { computerSequence } = this.state;
    const randomColour = this.generateQuadrant();
    // catches error from strict reset
    this.setState({
      error: false
    });
    // add computer colour to computer sequence
    computerSequence.push(randomColour);
    // run computer sequence
    this.lightComputerSequence();
  }

  computerTurnWithTimeout = () => {
    setTimeout(this.computerTurn, BUTTON_CYCLE_LENGTH);
  };

  lightComputerSequence = () => {
    const { computerSequence } = this.state;
    console.log(computerSequence); // included for testing
    for (let i = 0; i < computerSequence.length; i++) {
      setTimeout(() => {
        this.playSound(computerSequence[i])
        this.setState({ activeQuadrant: computerSequence[i] }, () => {
          setTimeout(() => {
            this.setState({ activeQuadrant: '', playerTurn: 'user'});
          }, BUTTON_LIT_LENGTH)
        })
      }, (i + 1) * BUTTON_CYCLE_LENGTH)
    }
  }

  lightWinSequence = () => {
    const winSequence = ['green', 'red', 'blue', 'yellow', 'green', 'red', 'blue', 'yellow'];
    for (let i = 0; i < winSequence.length; i++) {
      setTimeout(() => {
        this.setState({ activeQuadrant: winSequence[i] }, () => {
          setTimeout(() => {
            this.setState({ activeQuadrant: '' });
          }, 250)
        })
      }, (i + 1) * 500)
    }

  }

  checkUserTurn = () => {
    const { userSequence, computerSequence, isStrict } = this.state;
    for (let i = 0; i < userSequence.length; i++) {
      if (userSequence[i] !== computerSequence[i]) {
        if (isStrict) {
          this.setState({
            playerTurn: 'computer',
            error: true,
            computerSequence: [],
            userSequence: []
          }, this.computerTurnWithTimeout);
        }
        this.setState({
          userSequence: [],
          error: true,
          playerTurn: 'user'
        }, this.lightComputerSequence);
        return;
      }
    }

    if (userSequence.length !== computerSequence.length) {
      return;
    }

    if (userSequence.length === 20) {
      this.lightWinSequence();
      this.setState({
        win: true
      }, this.onWinWithTimeout);
      return;
    }

    this.setState({
      playerTurn: 'computer',
      userSequence: [],
    }, this.computerTurnWithTimeout);
  }

  onWin = () => {
    this.setState({
      clickedColour: '',
      activeQuadrant: '',
      playerTurn: 'computer',
      win: false,
      computerSequence: [],
      userSequence: []
    }, this.computerTurn);
  }

  onWinWithTimeout = () => {
    setTimeout(this.onWin, 5000)
  }

  handleStart = () => {
    this.computerTurn();
  }

  handleOnToggle = () => {
    if (this.state.isOn === true) {
      this.setState({
        isOn: false,
        isStrict: false,
        playerTurn: 'computer',
        computerSequence: [],
        userSequence: []
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
      error: false
    });
    this.lightQuadrant(colour);
    this.playSound(colour);
    this.state.userSequence.push(colour);
    this.checkUserTurn();
  }

  renderCountDisplay = () => {
    const { computerSequence, isOn, error, win } = this.state;
    if (!isOn) {
      return '--';
    } else if (error) {
      return '! !';
    } else if (win) {
      return '😄'
    } else {
      return computerSequence.length;
    }
  }

  render () {
    const { isOn, isStrict } = this.state;

    return (
      <div className='App'>
        <div className='Console'>
          <div className='Controls'>
            <h1 className='Simon-title'>SIMON</h1>
            <div className='Control-bulk'>
              <div className='Control-buttons'>
                <span className='Count-display'>{this.renderCountDisplay()}</span>
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
            <div className='Buttons Green border-top border-left border-right'>
              <audio ref={(element) => { this.green = element; }}>
                <source src={greenSound} type='audio/mpeg'/>
              </audio>
              <button className={`1 green-button play-buttons ${this.buttonLit('green')}`} onClick={() => this.handleQuadrantClick('green')} disabled={this.playButtonsEnable()}></button>
            </div>
            <div className='Buttons Red border-top border-right'>
              <audio ref={(element) => { this.red = element; }}>
                <source src={redSound} type='audio/mpeg'/>
              </audio>
              <button className={`2 red-button play-buttons ${this.buttonLit('red')}`} onClick={() => this.handleQuadrantClick('red')} disabled={this.playButtonsEnable()}></button>
            </div>
          </div>
          <div className='Row'>
            <div className='Buttons Yellow border-top border-bottom border-left border-right'>
              <audio ref={(element) => { this.yellow = element; }}> ? true : false
                <source src={yellowSound} type='audio/mpeg'/>
              </audio>
              <button className={`3 yellow-button play-buttons ${this.buttonLit('yellow')}`} onClick={() => this.handleQuadrantClick('yellow')} disabled={this.playButtonsEnable()}></button>
            </div>
            <div className='Buttons Blue border-top border-bottom border-right'>
              <audio ref={(element) => { this.blue = element; }}>
                <source src={blueSound} type='audio/mpeg'/>
              </audio>
              <button className={`4 blue-button play-buttons ${this.buttonLit('blue')}`} onClick={() => this.handleQuadrantClick('blue')} disabled={this.playButtonsEnable()}></button>
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
