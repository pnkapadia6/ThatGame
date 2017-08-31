import { combineReducers } from 'redux';
import game from './game';
import timer from './timer';

const mainApp = combineReducers({ 
	game,
	timer
});

export default mainApp;