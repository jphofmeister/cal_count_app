import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDays } from '../../actions/dayActions';

import { startOfWeek, endOfWeek, eachDay, format } from 'date-fns';
import WeekTable from './WeekTable';

class Week extends Component {
  constructor(props) {
    super(props);
    this.state = {
      week: []
    }
  }

  componentDidMount() {
    let todaysDate = new Date().toISOString().slice(0, 10);
    let weekStart = startOfWeek(todaysDate);
    let weekEnd = endOfWeek(todaysDate);

    let week = eachDay(weekStart, weekEnd);

    let formattedWeek = [];
    week.forEach(date => {
      formattedWeek.push(format(date, 'YYYY-MM-DD'));
    });

    this.setState({
      week: week
    });

    this.props.getDays(formattedWeek.toString());
  }

  render() {
    const { days } = this.props.day;

    return (
      <div className="week">
        <WeekTable days={days} week={this.state.week} />
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