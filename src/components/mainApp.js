import React from 'react';
import { connect } from 'react-redux';

import DefaultScreen from './gameScreens/defaultScreen';
import GameOverScreen from './gameScreens/gameOverScreen';
import Game from './game';
import { startGame, stopGame } from '../actions';
import './mainApp.scss';

const mapStateToProps = (state) => {
  const { highScore, highScoreCreated, score, status } = state.game,
    { ongoing } = state.timer,
    props = {
      highScore,
      highScoreCreated,
      score
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
  setGameAsOver: () => {
    dispatch(stopGame());
  },
  onStartGame: () => {
    setTimeout(() => {
      dispatch(startGame())
    }, 200);
  }
});

const renderGameTitle = <div className="my-app__title">That Game!</div>;

const MainApp = (props) => {
  const { gameState, ...otherProps } = props;
  let renderGameComponent = <GameOverScreen {...props} />;

  if (gameState === 'DEFAULT') {
    renderGameComponent = <DefaultScreen {...otherProps} />;
  }

  if (gameState === 'ONGOING') {
    renderGameComponent = <Game />;
  }

  return (
    <div className="my-app">
      {renderGameTitle}
      {renderGameComponent}
    </div>
  )
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApp);
