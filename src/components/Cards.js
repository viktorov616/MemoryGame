import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

export default function Cards({ activateCard, cards }) {
  return (
    <div className="cards">
      { cards.map(({ active, flippingOut, id, revealed, symbol }) => (
        <Card
          key={id}
          id={id}
          active={active}
          activateCard={activateCard}
          flippingOut={flippingOut}
          revealed={revealed}
          symbol={symbol}
        />
      )) }
    </div>
  );
}

Cards.propTypes = {
  activateCard: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
};
