import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

export default function Card({ active, activateCard, flippingOut, id, revealed, symbol }) {
  function handleRevealCard() {
    if (active || revealed) return;

    activateCard(id);
  }

  return (
    <div
      onClick={handleRevealCard}
      role="button"
      className={classNames('card', {
        animated: active || revealed,
        flipInY: active || revealed,
        flipOutY: flippingOut,
        'card--active': active,
        'card--revealed': revealed,
      })}
    >
      { (active || revealed) ? symbol : null }
    </div>
  );
}

Card.propTypes = {
  active: PropTypes.bool.isRequired,
  activateCard: PropTypes.func.isRequired,
  flippingOut: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  revealed: PropTypes.bool.isRequired,
  symbol: PropTypes.string.isRequired,
};
