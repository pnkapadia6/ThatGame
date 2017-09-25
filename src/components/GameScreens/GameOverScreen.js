import React, { PropTypes } from 'react';
import './gameOverScreen.scss';

const renderGameState = (gameState) => {
  return (
    <div className="game-over-container__status">
      {gameState === 'TIME_UP' ? 'Time Up!' : 'Oops! Wrong Answer'}
    </div>
  )
};

const GameOverScreen = ({ highScore, highScoreCreated, gameState, onStartGame, score }) => {
  return (
    <div className="game-over-container">
      {renderGameState(gameState)}
      <div className="game-over-container__header">Game Over!</div>
      <div className="game-over-container__button" onClick={onStartGame}> Play again</div>
      <div className="game-over-container__score">
        Score: {score}
      </div>
      <div className="game-over-container__high-score-label">
        {highScoreCreated ? 'High Score created!!' : ''}
      </div>
      <div className="game-over-container__high-score">
        High Score: {highScore}
      </div>
    </div>
  );
};

GameOverScreen.propTypes = {
  highScore: PropTypes.number.isRequired,
  highScoreCreated: PropTypes.bool,
  gameState: PropTypes.string.isRequired,
  onStartGame: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired
};

export default GameOverScreen;
