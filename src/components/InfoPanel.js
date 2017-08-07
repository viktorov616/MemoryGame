import React from 'react';
import PropTypes from 'prop-types';

export default function InfoPanel({ cardsLeft, restart, reveals }) {
  return (
    <div className="col-xs-12 col-sm-3 col-md-3 info-panel">
      <div className="info-panel__stats">
        <p className="info-panel__text">Reveals: { reveals }</p>
        <p className="info-panel__text">Cards left: { cardsLeft }</p>
      </div>
      <button
        className="btn btn-default info-panel__btn"
        onClick={restart}
      >
        Restart
      </button>
    </div>
  );
}

InfoPanel.propTypes = {
  cardsLeft: PropTypes.number.isRequired,
  restart: PropTypes.func.isRequired,
  reveals: PropTypes.number.isRequired,
};
