import React, { PropTypes, PureComponent } from 'react';
import './gameOverScreen.scss';

const renderGameState = (gameState) => {
  return (
    <div className="game-over-container__status">
      {gameState === 'TIME_UP' ? 'Time Up!' : 'Oops! Wrong Answer'}
    </div>
  )
};

class GameOverScreen extends PureComponent {
  componentWillMount() {
    const { props } = this;
    if (props.highScoreCreated && props.userHighScore > props.highestScore) {
      console.log('pushing new score!!');
      props.firebase.set('highestScore', props.userHighScore);
    }
  }

  render() {
    const { props } = this;
    const { userHighScore, highScoreCreated, highestScore } = props;
    let isHighestScore = userHighScore > highestScore;

    return (
      <div className="game-over-container">
        {renderGameState(props.gameState)}
        <div className="game-over-container__header">Game Over!</div>
        <div className="game-over-container__score">Score: {props.score}</div>
        <div className="game-over-container__button" onClick={props.onStartGame}>Play again</div>
        <div className="game-over-container__high-score-label">
          {highScoreCreated ? 'High Score created!!' : ''}
          {isHighestScore ? 'You beat everyone!!' : ''}
        </div>
        <div className="game-over-container__high-score">
          <p>Your High Score: {userHighScore}</p>
          <p>Highest Score: {highestScore}</p>
        </div>
      </div>
    );
  }
}

GameOverScreen.propTypes = {
  userHighScore: PropTypes.number.isRequired,
  highScoreCreated: PropTypes.bool,
  gameState: PropTypes.string.isRequired,
  onStartGame: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired
};

export default GameOverScreen;
