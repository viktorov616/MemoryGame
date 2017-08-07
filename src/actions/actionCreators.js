export function activateCard(id) {
  return {
    type: 'ACTIVATE_CARD',
    id,
  };
}

function animateOutActiveCards() {
  return {
    type: 'ANIMATE_OUT_ACTIVE_CARDS',
  };
}

export function closeEndGamePopup() {
  return {
    type: 'CLOSE_END_GAME_POPUP',
  };
}

export function hideActiveCards() {
  return {
    type: 'HIDE_ACTIVE_CARDS',
  };
}

export function manageActiveCards() {
  return (dispatch) => {
    dispatch(setActiveCardsOnReset());
    setTimeout(() => dispatch(animateOutActiveCards()), 500);

    setTimeout(() => {
      dispatch(hideActiveCards());
      dispatch(resetActiveCards());
    }, 1400);
  };
}

export function resetActiveCards() {
  return {
    type: 'RESET_ACTIVE_CARDS',
  };
}

export function revealActiveCards() {
  return {
    type: 'REVEAL_ACTIVE_CARDS',
  };
}

export function resetReveals() {
  return {
    type: 'RESET_REVEALS',
  };
}

function setActiveCardsOnReset() {
  return {
    type: 'SET_ACTIVE_CARDS_ON_RESET',
  };
}

export function setCards(cards) {
  return {
    type: 'SET_CARDS',
    cards,
  };
}

export function showEndGamePopup() {
  return {
    type: 'SHOW_END_GAME_POPUP',
  };
}
