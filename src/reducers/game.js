import { createSelector } from 'reselect';

import { updateItemInArray } from '../utility/utility';

const defaultState = {
  activeCardsResetting: false,
  cards: [],
  displayEndGamePopup: false,
  reveals: 0,
  symbols: ['✶', '✥', '❀', '✾', '❁', '✴'],
};

export default function game(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
    case 'ACTIVATE_CARD': {
      const { cards, reveals } = state;
      const { id } = action;

      const updatedCards = updateItemInArray(cards, id, card => ({ ...card, active: true }));

      return {
        ...state,
        cards: updatedCards,
        reveals: reveals + 1,
      };
    }
    case 'ANIMATE_OUT_ACTIVE_CARDS': {
      const activeCards = getActiveCards(state);
      const updatedCards = [...state.cards];

      activeCards.forEach((item) => {
        updatedCards[item.id].flippingOut = true;
      }, []);

      return {
        ...state,
        cards: updatedCards,
      };
    }
    case 'CLOSE_END_GAME_POPUP':
      return {
        ...state,
        displayEndGamePopup: false,
      };
    case 'RESET_ACTIVE_CARDS': {
      const activeCards = getActiveCards(state);
      const updatedCards = [...state.cards];

      activeCards.forEach((item) => {
        updatedCards[item.id].active = false;
        updatedCards[item.id].flippingOut = false;
      }, []);
      return {
        ...state,
        activeCardsResetting: false,
        cards: updatedCards,
      };
    }
    case 'RESET_REVEALS':
      return {
        ...state,
        reveals: 0,
      };
    case 'REVEAL_ACTIVE_CARDS': {
      const activeCards = getActiveCards(state);
      const updatedCards = [...state.cards];

      activeCards.forEach((item) => {
        updatedCards[item.id].revealed = true;
      }, []);

      return {
        ...state,
        cards: updatedCards,
      };
    }
    case 'SET_ACTIVE_CARDS_ON_RESET': {
      return {
        ...state,
        activeCardsResetting: true,
      };
    }
    case 'SET_CARDS':
      return {
        ...state,
        cards: action.cards,
      };
    case 'SHOW_END_GAME_POPUP':
      return {
        ...state,
        displayEndGamePopup: true,
      };
  }
}

function getCards(state) {
  return state.cards;
}

export const getActiveCards = createSelector(
  [getCards],
  (cards) => {
    console.count('activeCards call');
    return cards.filter(card => card.active);
  },
);

export const getCardsLeft = createSelector(
  [getCards],
  cards => cards.filter(card => !card.revealed).length,
);
