import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';
import Checkbox from '../../atoms/Input/Checkbox';
import Radio from '../../atoms/Input/Radio';
import MonthBox from '../../atoms/MonthBox/MonthBox';
import { months } from '../../../helpers/months';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const StyledMonthsContainer = styled.div`
  padding: 10px 100px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
`;

const StyledYearNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    cursor: pointer;
  }
`;

const ExpenseForm = () => {
  const [formValue, setFormValue] = useState({ constantly: false });
  const [year, setYear] = useState(2020);
  const [inMonthAndYear, setInMonthAndYear] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
    console.log(formValue);
  };

  const handleAddMonth = (month) => {
    setInMonthAndYear([...inMonthAndYear, { month: month.number, year: year }]);
    console.log(...inMonthAndYear);
  };

  const handleRemoveMonth = (month) => {
    setInMonthAndYear([
      ...inMonthAndYear.filter(
        (obj) => obj.month !== month && obj.year !== year,
      ),
    ]);
  };
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Input
        placeholder="name*"
        onChange={handleInputChange}
        name="name"
        type="text"
        required
      />
      <Input
        placeholder="amount*"
        onChange={handleInputChange}
        name="amount"
        type="number"
        required
      />
      <Input
        placeholder="deadline*"
        onChange={handleInputChange}
        name="deadline"
        type="number"
        required
      />
      <div onChange={handleInputChange}>
        <Radio id="auto" name="type" value="auto" />
        <Radio id="manual" name="type" value="manual" />
      </div>
      Constantly:
      <Checkbox
        checked={formValue.constantly}
        changeFunction={handleInputChange}
      />
      {formValue.constantly ? null : (
        <>
          <StyledYearNav>
            <NavigateBeforeIcon onClick={() => setYear(year - 1)} />
            {year}
            <NavigateNextIcon onClick={() => setYear(year + 1)} />
          </StyledYearNav>
          <StyledMonthsContainer>
            {months.map((month) => (
              <MonthBox
                key={month.name}
                month={month.number}
                year={year}
                when={inMonthAndYear}
                addMonthFc={() => handleAddMonth(month)}
                removeMonthFc={() => handleRemoveMonth(month)}
              >
                {month.name}
              </MonthBox>
            ))}
          </StyledMonthsContainer>
        </>
      )}
      <Button type="submit" primary>
        hej
      </Button>
    </form>
  );
};

export default ExpenseForm;
