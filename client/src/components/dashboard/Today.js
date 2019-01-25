import React, { Component } from 'react';
import { Input, Col, Table } from 'reactstrap';
import { isToday } from 'date-fns';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import { getDays, getDay, deleteFoodFromDay } from '../../actions/dayActions';

import TableItem from '../common/TableItem';
import Spinner from '../common/Spinner';

class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toISOString().slice(0, 10),
      food: {},
      calories: 0
    }

    this.onChange = this.onChange.bind(this);
    this.onDeleteFood = this.onDeleteFood.bind(this);
  }

  componentDidMount() {
    this.props.getDays();
    let newDate = this.state.date;
    this.props.getDay(newDate);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    let newDate = this.state.date;
    this.props.getDay(newDate);
  }

  onDeleteFood(id) {
    let date = this.state.date;
    this.props.deleteFoodFromDay(date, id);
  }

  render() {
    //if (this.props.day) {
    const { day, loading } = this.props.day;
    const { foodEaten } = day;

    let dayContent;

    if (foodEaten === null || foodEaten === undefined || loading) {
      dayContent = <Spinner />
    } else {
      dayContent = <Table>
        <tbody>
          <TableItem items={foodEaten} onDeleteClick={this.onDeleteFood} />
        </tbody>
      </Table>
    }


    return (
      <Col xs="3">
        <h3>Today {this.state.date}</h3>
        <Input name="date" type="date" value={this.state.date} onChange={this.onChange} />
        {dayContent}
      </Col>
    )
  }
}

Today.propTypes = {
  getDay: PropTypes.func.isRequired,
  getDays: PropTypes.func.isRequired,
  deleteFoodFromDay: PropTypes.func,
  day: PropTypes.object,
  days: PropTypes.array
}

const mapStateToProps = state => ({
  day: state.day
})

export default connect(mapStateToProps, { getDays, getDay, deleteFoodFromDay })(Today);