import React from 'react';
import styled from 'styled-components';

import findDay from '../common/findDay';

const WeekTableCard = styled.div`
  border: none;
  
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,.2);

  height: 100%;
  width: 200px;
  position: fixed;
  padding: 1rem;
  padding-top: 1rem;
  }
`;

const DayCalContainer = styled.div`
  padding-bottom: 1rem;
`;

const DayDisplay = styled.div`
  color: #746A6A;
  font-size: 14px;
  font-weight: 700;
`;

const CalDisplay = styled.div`
  font-size: 20px;
`;

const WeekTable = ({ days, week }) => {
  //let week = days;
  let fullDaysArray = days;

  //if a day in the week doesn't have any data, can fill array with 0's
  if (days.length < 7) {
    for (let i = days.length; i < 7; i++) {
      fullDaysArray.push({ _id: i, calories: 0 });
    }
  }

  let calorieRow = fullDaysArray.map((day, i) =>
    <DayCalContainer>
      <DayDisplay>{findDay(i)}</DayDisplay>
      <CalDisplay key={day._id}>{day.calories}</CalDisplay>
    </DayCalContainer>
  );

  return (
    <WeekTableCard>
      <h2>This Week</h2>
      {calorieRow}
    </WeekTableCard>
  )
}

export default WeekTable;