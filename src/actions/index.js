import _get from 'lodash/get';

export const decrementTimer = () => ({
  type: 'DECREMENT_TIMER'
});

export const resetTimer = (timerId) => ({
  type: 'RESET_TIMER',
  timerId
});

export const startTimer = () => {
  return (dispatch, getState) => {
    const oldTimer = _get(getState(), 'timer.timerId');
    oldTimer && clearInterval(oldTimer);

    const newTimerId = setInterval(() => {
      dispatch(decrementTimer());
    }, 100);

    dispatch(resetTimer(newTimerId));
  }
};

export const startGame = () => (dispatch) => {
  dispatch(startTimer());
  dispatch({ type: 'START_GAME' });
};

export const stopGame = () => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  const oldTimer = _get(getState(), 'timer.timerId');
  oldTimer && clearInterval(oldTimer);
  console.log('--', firebase, getState());
  return {
    type: 'STOP_GAME'
  }
};

export const answerCorrectly = () => (dispatch) => {
  dispatch(startTimer());
  dispatch({ type: 'USER_ANSWER_CORRECT' });
};

export const answerIncorrectly = () => (dispatch) => {
  dispatch(stopGame());
  dispatch({ type: 'USER_ANSWER_INCORRECT' });
};
