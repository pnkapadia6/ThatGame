import _merge from 'lodash/merge';
import { DEFAULT_STATE } from './constants';

const getSerializesHighScore = () => {
  try {
    const serializedHighScore = localStorage.getItem('highScore');
    if (serializedHighScore === null)
      return 0;
    return JSON.parse(serializedHighScore);
  } catch (err) {
    return 0;
  }
};

export const loadState = () => {
  const highScore = getSerializesHighScore();
  return _merge({}, DEFAULT_STATE, {
    game: {
      highScore
    }
  });
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.game.highScore || 0);
    localStorage.setItem('highScore', serializedState);
  } catch (err) {
    return {};
  }
};
