import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/actionCreators';
import { getActiveCards, getCardsLeft } from '../reducers/game';
import Game from './Game';

function mapStateToProps(state) {
  const { game } = state;

  return {
    game: {
      ...game,
      activeCards: getActiveCards(game),
      cardsLeft: getCardsLeft(game),
    },
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const app = connect(mapStateToProps, mapDispatchToProps)(Game);

export default app;
