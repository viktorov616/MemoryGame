import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import InfoPanel from '../components/InfoPanel';
import Popup from '../components/Popup';
import Tabletop from '../components/Tabletop';

import { shuffle } from '../utility/utility';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.restart = this.restart.bind(this);
  }

  componentWillMount() {
    this.generateGame();
  }

  componentWillUpdate(nextProps) {
    const { activeCards, activeCardsResetting } = nextProps.game;

    if (activeCards.length === 2 && !activeCardsResetting) {
      this.compareActiveCards(activeCards);
    }
  }

  compareActiveCards(activeCards) {
    const {
      game: { cardsLeft }, manageActiveCards, resetActiveCards, revealActiveCards,
      showEndGamePopup,
    } = this.props;

    if (activeCards.every((item, i, arr) => i === 0 || item.symbol === arr[i - 1].symbol)) {
      revealActiveCards();
      resetActiveCards();

      if (cardsLeft === 2) {
        showEndGamePopup();
      }
      return;
    }

    manageActiveCards();
  }

  generateGame() {
    const { game: { symbols }, setCards } = this.props;
    const shuffledSymbols = shuffle([...symbols, ...symbols]);
    const generatedCards = [];

    shuffledSymbols.forEach((symbol, i) => {
      const card = {
        id: i,
        active: false,
        flippingOut: false,
        revealed: false,
        symbol,
      };

      generatedCards.push(card);
    });

    setCards(generatedCards);
  }

  restart() {
    const { resetActiveCards, resetReveals } = this.props;

    resetActiveCards();
    resetReveals();
    this.generateGame();
  }

  render() {
    const { closeEndGamePopup, game: { cardsLeft, displayEndGamePopup, reveals } } = this.props;
    const endGamePopup = (displayEndGamePopup)
      ? (<Popup
        close={{ onClick: closeEndGamePopup, text: 'Close' }}
        ok={{ onClick: () => { this.restart(); closeEndGamePopup(); }, text: 'Restart' }}
        textArr={[
          { key: 0, text: 'Congratulations! You have finished the game.' },
          { key: 1, text: `Reveals: ${reveals}` },
        ]}
      />)
      : null;

    return (
      <Route
        exact
        path="/"
        render={routeProps => (
          <div className="game">
            <Tabletop {...this.props} {...routeProps} />
            <InfoPanel cardsLeft={cardsLeft} restart={this.restart} reveals={reveals} />
            <ReactCSSTransitionGroup
              transitionName="animation-fade"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
              { endGamePopup }
            </ReactCSSTransitionGroup>
          </div>
        )}
      />
    );
  }
}

Game.propTypes = {
  closeEndGamePopup: PropTypes.func.isRequired,
  game: PropTypes.shape({
    activeCards: PropTypes.array.isRequired,
    activeCardsResetting: PropTypes.bool.isRequired,
    cards: PropTypes.array.isRequired,
    cardsLeft: PropTypes.number.isRequired,
    displayEndGamePopup: PropTypes.bool.isRequired,
    reveals: PropTypes.number.isRequired,
    symbols: PropTypes.array.isRequired,
  }).isRequired,
  manageActiveCards: PropTypes.func.isRequired,
  resetActiveCards: PropTypes.func.isRequired,
  revealActiveCards: PropTypes.func.isRequired,
  resetReveals: PropTypes.func.isRequired,
  setCards: PropTypes.func.isRequired,
  showEndGamePopup: PropTypes.func.isRequired,
};
