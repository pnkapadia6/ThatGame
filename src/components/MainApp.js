import React from 'react';
import { connect } from 'react-redux';
import { firebase, helpers } from 'react-redux-firebase'

import DefaultScreen from './GameScreens/DefaultScreen';
import GameOverScreen from './GameScreens/GameOverScreen';
import Game from './Game';
import { startGame } from '../actions';
import './mainApp.scss';

const mapStateToProps = (state) => {
  const { firebase, game = {}, timer = {} } = state;
  const { userHighScore, highScoreCreated, score, status } = game;
  const { ongoing } = timer;
  const props = {
    userHighScore,
    highScoreCreated,
    score,
    highestScore: helpers.dataToJS(firebase, 'highestScore')
  };

  if (status === 'default') {
    props.gameState = 'DEFAULT';
    return props;
  }

  if (!ongoing) {
    props.gameState = 'TIME_UP';
    return props;
  }

  if (status === 'over') {
    props.gameState = 'GAME_OVER';
    return props;
  }

  if (ongoing || status === 'ongoing') {
    props.gameState = 'ONGOING';
    return props;
  }

  return props;
};

const mapDispatchToProps = (dispatch) => ({
  onStartGame: () => {
    setTimeout(() => {
      dispatch(startGame())
    }, 200);
  }
});

const renderGameTitle = <div className="my-app__title">That Game!</div>;

const MainApp = (props) => {
  const { gameState } = props;
  console.log('---', props.highestScore, props.userHighScore);

  let renderGameComponent = <GameOverScreen {...props} />;

  if (gameState === 'DEFAULT') {
    renderGameComponent = <DefaultScreen {...props} />;
  }

  if (gameState === 'ONGOING') {
    renderGameComponent = <Game {...props} />;
  }

  return (
    <div className="my-app">
      {renderGameTitle}
      {renderGameComponent}
    </div>
  )
};

const withFirebaseWrapper = firebase([
  '/highestScore'
])(MainApp);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebaseWrapper);
