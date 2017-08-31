import { DEFAULT_STATE, TIMER_OFFSET } from '../constants';

const timer = (state = DEFAULT_STATE.timer, action) => {
  let newState;

  switch (action.type) {
    case 'DECREMENT_TIMER':
      newState = Object.assign({}, state);
      const newTimer = newState.timer - 1;

      if (!newTimer) {
        clearInterval(newState.timerId);
        newState.timer = TIMER_OFFSET;
        newState.ongoing = false;
      } else {
        newState.timer--;
        newState.ongoing = true;
      }
      return newState;

    case 'RESET_TIMER':
      newState = Object.assign({}, state);
      newState.timer = TIMER_OFFSET;
      newState.timerId = action.timerId;
      newState.ongoing = true;
      return newState;

    default:
      return state;
  }
};

export default timer;