import _get from 'lodash/get';

export const decrementTimer = () => {
  return {
    type: 'DECREMENT_TIMER'
  }
};

export const resetTimer = (timerId) => {
  return {
    type: 'RESET_TIMER',
    timerId
  }
};

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

export const startGame = () => {
  return (dispatch) => {
    dispatch(startTimer());
    dispatch({ type: 'START_GAME' });
  }
};

export const stopGame = (state) => {
  const oldTimer = _get(state, 'timer.timerId');
  oldTimer && clearInterval(oldTimer);
  return {
    type: 'STOP_GAME'
  }
};

export const answerCorrectly = () => {
  return (dispatch) => {
    dispatch(startTimer());
    dispatch({ type: 'USER_ANSWER_CORRECT' });
  }
};

export const answerIncorrectly = () => {
  return (dispatch, getState) => {
    dispatch(stopGame(getState()));
    dispatch({ type: 'USER_ANSWER_INCORRECT' });
  }
};
