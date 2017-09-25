import _ from 'lodash';
import { MAX_NUM, MIN_NUM, OPERATORS } from '../constants';

const getRandomNumber = (min = MIN_NUM, max = MAX_NUM) => {
  return parseInt(Math.random() * (max - min + 1) + min, 10);
};

const getRandomOperator = () => {
  const operators = _.keys(OPERATORS),
    operatorIndex = getRandomNumber(0, operators.length - 1);
  return OPERATORS[operators[operatorIndex]];
};

const getRandomResult = ([no1, no2], operation) => {
  const result = operation.operate(no1, no2),
    isCorrect = getRandomNumber(0, 1);

  if (isCorrect) {
    return result;
  }
  return result + getRandomNumber(-5, +5);
};

export default class Equation {
  constructor() {
    const operator = getRandomOperator(),
      numbers = [getRandomNumber(), getRandomNumber()],
      answer = getRandomResult(numbers, operator),
      isCorrect = operator.operate(numbers[0], numbers[1]) === answer;

    console.log(numbers, answer);

    return {
      nos: numbers,
      operator,
      answer,
      isCorrect
    }
  }
}
