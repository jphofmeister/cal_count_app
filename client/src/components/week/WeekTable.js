import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';

import findDay from '../common/findDay';
import { isToday, addHours, isEqual, format } from 'date-fns';

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
  const [fullDaysArray, setFullDaysArray] = useState([]);

  useEffect(() => {
    let emptyWeek = week.map(day => {
      return { key: format(day, 'YYYY-MM-DD'), date: format(day, 'YYYY-MM-DD'), calories: '-' };
    });

    setFullDaysArray(emptyWeek);

    if (days !== null) {
      fullDaysArray.forEach((e1, index) => days.forEach((e2) => {
        if (isEqual(e1.date, format(addHours(e2.date, 5), 'YYYY-MM-DD'))) {
          let updatedDays = [...fullDaysArray];
          updatedDays[index].calories = e2.calories;
          setFullDaysArray(updatedDays);
        }
        else {
          return false;
        }
      }));
    }
  }, [days, week]);

  console.log(fullDaysArray);

  let calorieRow;
  if (days === null || fullDaysArray === undefined || fullDaysArray === null) {
    calorieRow = "No data for this week.";
  } else {
    calorieRow = fullDaysArray.map((day, i) =>
      <DayCalContainer>
        {day.date &&
          <Fragment>
            {isToday(addHours(day.date, 4)) &&
              <Fragment>
                <TodayDayDisplay>{findDay(i)}</TodayDayDisplay>
                <TodayCalDisplay key={day._id}>{day.calories}</TodayCalDisplay>
              </Fragment>
            }
            {!isToday(addHours(day.date, 4)) &&
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