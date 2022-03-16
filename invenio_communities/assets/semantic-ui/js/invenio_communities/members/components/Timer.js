import React, { Component } from "react";
import PropTypes from "prop-types";

export class Timer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { TimeAmount, onTimerFinish, showing } = this.props;

    const timerAlreadySet = !!this.successTimer;

    if (showing) {
      if (timerAlreadySet) {
        clearTimeout(this.successTimer);
      }

      this.successTimer = setTimeout(onTimerFinish, TimeAmount);
    }
  }

  componentWillUnmount() {
    this.successTimer && clearTimeout(this.successTimer);
  }

  render() {
    const { children, showing } = this.props;

    return showing ? children : null;
  }
}

Timer.propTypes = {
  TimeAmount: PropTypes.number.isRequired,
  onTimerFinish: PropTypes.func.isRequired,
  showing: PropTypes.bool.isRequired,
};
