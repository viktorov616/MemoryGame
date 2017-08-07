import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.handleHotkeys = this.handleHotkeys.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleHotkeys);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleHotkeys);
  }

  handleHotkeys(e) {
    if (e.keyCode === 13) {
      this.props.ok.onClick();
    } else if (e.keyCode === 27) {
      this.props.close.onClick();
    }
  }

  render() {
    const { close, ok, textArr } = this.props;

    return (
      <div className="panel panel-default popup">
        <div className="panel-body">
          <div className="popup__text-block">
            { textArr.map(({ key, text }) => <p key={key}>{ text }</p>) }
          </div>
          <div className="popup__btn-block">
            <button
              className="btn btn-default popup__btn"
              onClick={ok.onClick}
            >
              { ok.text }
            </button>
            <button
              className="btn btn-default popup__btn"
              onClick={close.onClick}
            >
              { close.text }
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Popup.propTypes = {
  close: PropTypes.object.isRequired,
  ok: PropTypes.object.isRequired,
  textArr: PropTypes.array.isRequired,
};
