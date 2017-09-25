import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { startGame, answerCorrectly, answerIncorrectly } from '../../actions';
import UserButtons from './UserButtons';
import Timer from '../Timer';
import './game.scss';

const mapStateToProps = (state) => ({
  equation: state.game.equation,
  gameStatus: state.game.status,
  highScore: state.game.highScore,
  score: state.game.score
})

const mergeProps = (stateProps, dispatchProps) => {
  const { dispatch } = dispatchProps,
    isEquationCorrect = stateProps.equation.isCorrect;

  return {
    ...stateProps,
    onStartGame: () => {
      dispatch(startGame())
    },
    onTrueClick: () => {
      dispatch(isEquationCorrect ? answerCorrectly() : answerIncorrectly())
    },
    onFalseClick: () => {
      dispatch(!isEquationCorrect ? answerCorrectly() : answerIncorrectly())
    }
  }
};

class Game extends PureComponent {
  render() {
    return (
      <div className="my-app__game">
        <div className="my-app__g__wrapper">
          {this.renderGameQuestion()}
          <Timer />
          {this.renderUserButtons()}
        </div>
        {this.renderStats()}
      </div>
    );
  }

  renderGameQuestion() {
    const { equation: {nos, operator, answer} } = this.props;
    return (
      <div className="my-app__gw__equation">
        <div className="my-app__gwe__number">{nos[0]}</div>
        <div className="my-app__gwe__operator">{operator.symbol}</div>
        <div className="my-app__gwe__number">{nos[1]}</div>
        <div className="my-app__gwe__operator my-app__gwe__operator--equal">=</div>
        <div className="my-app__gwe__number my-app__gwe__number--answer">{answer}</div>
      </div>
    )
  }

  renderUserButtons() {
    const { gameStatus, onTrueClick, onFalseClick } = this.props;
    return (gameStatus === 'ongoing') && (
        <UserButtons onTrueClick={onTrueClick} onFalseClick={onFalseClick}/>
      );
  }

  renderStats() {
    return (
      <div className="my-app__g__stats">
        <div className="my-app__gs__score"> Score - {this.props.score} </div>
        <div className="my-app__gs__high-score"> High Score - {this.props.highScore} </div>
      </div>
    );
  }
}

Game.propTypes = {
  gameStatus: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(Game);
