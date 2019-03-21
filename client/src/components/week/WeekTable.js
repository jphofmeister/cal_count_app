import React, { Fragment } from 'react';
import styled from 'styled-components';

import findDay from '../common/findDay';
import { isToday, addHours } from 'date-fns';

const WeekTableCard = styled.div`
  border: none;
  
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,.2);

  height: 100vh;
  //width: 150px;
  //position: fixed;
  padding: 1rem;
  padding-top: 1rem;
  margin-right: 2rem;

  @media (max-width: 768px) {
    height: 120px;
    width: 100%;
    white-space:nowrap;
    overflow-x: scroll;
  }
`;

const DayCalContainer = styled.div`
  padding-bottom: 1rem;

  @media (max-width: 768px) {
    display: inline-block;
    padding-right: 8%;
  }
`;

const DayDisplay = styled.div`
  color: #746A6A;
  font-size: 14px;
  font-weight: 700;
`;

const CalDisplay = styled.div`
  font-size: 20px;
`;

const TodayDayDisplay = styled.div`
  font-size: 14px;
  color: #8C81F2;
  font-weight: 700;
`;

const TodayCalDisplay = styled.div`
  font-size: 20px;
  color: #5F51E4;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
`;

const WeekTable = ({ days, week }) => {
  //let week = days;
  let fullDaysArray = days;

  //if a day in the week doesn't have any data, can fill array with 0's
  let calorieRow;
  if (days === null) {
    calorieRow = "No date for this week.";
  } else {
    if (days.length < 7) {
      for (let i = days.length; i < 7; i++) {
        fullDaysArray.push({ _id: i, calories: '-' });
      }
    }

    console.log(fullDaysArray);

    calorieRow = fullDaysArray.map((day, i) =>
      <DayCalContainer>
        {day.date &&
          <Fragment>
            {isToday(addHours(day.date, 5)) &&
              <Fragment>
                <TodayDayDisplay>{findDay(i)}</TodayDayDisplay>
                <TodayCalDisplay key={day._id}>{day.calories}</TodayCalDisplay>
              </Fragment>
            }
            {!isToday(addHours(day.date, 5)) &&
              <Fragment>
                <DayDisplay>{findDay(i)}</DayDisplay>
                <CalDisplay key={day._id}>{day.calories}</CalDisplay>
              </Fragment>
            }
          </Fragment>
        }
        {!day.date &&
          <Fragment>
            <DayDisplay>{findDay(i)}</DayDisplay>
            <CalDisplay key={day._id}>{day.calories}</CalDisplay>
          </Fragment>
        }
      </DayCalContainer>
    );
  }

  return (
    <WeekTableCard>
      <h2>This Week</h2>
      {calorieRow}
    </WeekTableCard>
  )
}

export default WeekTable;