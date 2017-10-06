import _merge from 'lodash/merge';
import { DEFAULT_STATE } from '../constants';

const getSerializesHighScore = () => {
  try {
    const serializedHighScore = localStorage.getItem('userHighScore');
    if (serializedHighScore === null)
      return 0;
    return JSON.parse(serializedHighScore);
  } catch (err) {
    return 0;
  }
};

export const loadInitialLocalState = () => {
  const userHighScore = getSerializesHighScore();
  return _merge({}, DEFAULT_STATE, {
    game: {
      userHighScore
    }
  });
};

export const saveLocalState = (state) => {
  try {
    const serializedState = JSON.stringify(state.game.userHighScore || 0);
    localStorage.setItem('userHighScore', serializedState);
  } catch (err) {
    return {};
  }
};
