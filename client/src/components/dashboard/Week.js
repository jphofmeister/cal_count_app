import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDays } from '../../actions/dayActions';

import { startOfWeek, endOfWeek, eachDay, format } from 'date-fns';
import WeekTable from './WeekTable';

class Week extends Component {

  componentDidMount() {
    let todaysDate = new Date().toISOString().slice(0, 10);
    let weekStart = startOfWeek(todaysDate);
    let weekEnd = endOfWeek(todaysDate);

    let week = eachDay(weekStart, weekEnd);

    let formattedWeek = [];
    week.forEach(date => {
      formattedWeek.push(format(date, 'YYYY-MM-DD'));
    });

    this.props.getDays(formattedWeek.toString());
  }

  render() {
    const { days } = this.props.day;

    return (
      <div className="week">
        <h2>This Week</h2>
        <WeekTable days={days} />
      </div>
    )
  }
}

Week.propTypes = {
  getDays: PropTypes.func.isRequired,
  day: PropTypes.object
}

const mapStateToProps = state => ({
  day: state.day
})

export default connect(mapStateToProps, { getDays })(Week);