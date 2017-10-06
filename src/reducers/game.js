import { DEFAULT_STATE, GAME_STATUS } from '../constants';
import Equation from '../helpers/equation';

const game = (state = DEFAULT_STATE.game, action) => {
  let gameState;

  switch (action.type) {
    case 'START_GAME':
      gameState = Object.assign({}, state);
      gameState.status = GAME_STATUS.ONGOING;
      gameState.score = 0;
      gameState.highScoreCreated = false;
      gameState.equation = new Equation();
      return gameState;

    case 'STOP_GAME':
    case 'USER_ANSWER_INCORRECT':
      gameState = Object.assign({}, state);
      gameState.status = GAME_STATUS.OVER;
      return gameState;

    case 'USER_ANSWER_CORRECT':
      gameState = Object.assign({}, state);
      gameState.score++;
      if (gameState.score > gameState.userHighScore) {
        gameState.userHighScore = gameState.score;
        gameState.highScoreCreated = true;
      }
      gameState.equation = new Equation();
      return gameState;

    default:
      return state;
  }
};

export default game;
