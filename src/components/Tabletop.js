import React from 'react';
import PropTypes from 'prop-types';

import Cards from './Cards';

export default function Tabletop({ game: { activeCards, cards }, activateCard }) {
  function handleActivateCard(id) {
    if (activeCards.length === 2) {
      return;
    }

    activateCard(id);
  }

  return (
    <div className="col-xs-12 col-sm-9 col-md-9 tabletop">
      <Cards cards={cards} activateCard={handleActivateCard} />
    </div>
  );
}

Tabletop.propTypes = {
  activateCard: PropTypes.func.isRequired,
  game: PropTypes.shape({
    activeCards: PropTypes.array.isRequired,
  }).isRequired,
};
