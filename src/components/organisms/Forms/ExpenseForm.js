import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';
import Checkbox from '../../atoms/Input/Checkbox';
import Radio from '../../atoms/Input/Radio';
import MonthBox from '../../atoms/MonthBox/MonthBox';
import { months, emptyForm } from '../../../helpers';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { AppContext } from '../../../context';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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

const ExpenseForm = ({ closeModalFunction }) => {
  const { day, currentYear, currentMonth, categories, addExpense } = useContext(
    AppContext,
  );
  const [formValue, setFormValue] = useState(emptyForm);
  const [modalYear, setModalYear] = useState(currentYear);
  const [inMonthAndYear, setInMonthAndYear] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {
      id: Date.now(),
      ...formValue,
      inMonthAndYear,
      added: new Date(currentYear, currentMonth, day),
    };
    if (!form.constantly && !form.inMonthAndYear.length) {
      return;
    } else if (form.auto === null) {
      return;
    } else {
      addExpense(form);
      closeModalFunction();
    }
  };

  const handleInputChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]:
        e.target.type === 'checkbox'
          ? e.target.checked
          : e.target.type === 'radio'
          ? handleRadioChange(e.target.value)
          : e.target.value,
    });
  };

  const handleRadioChange = (value) => {
    if (value && typeof value === 'string') {
      if (value === 'true') return true;
      else if (value === 'false') return false;
    }
  };

  const handleAddMonth = (month, modalYear) => {
    setInMonthAndYear([
      ...inMonthAndYear,
      { month: month.number, year: modalYear },
    ]);
  };

  const handleRemoveMonth = (month, modalYear) => {
    setInMonthAndYear([
      ...inMonthAndYear.filter(
        (obj) => obj.month !== month.number || obj.year !== modalYear,
      ),
    ]);
  };
  return (
    <StyledForm autoComplete="off" onSubmit={handleSubmit}>
      <Input
        placeholder="name*"
        onChange={handleInputChange}
        name="name"
        type="text"
        required
        value={formValue.name}
      />
      <Input
        placeholder="amount*"
        onChange={handleInputChange}
        name="amount"
        type="number"
        min="1"
        required
        value={formValue.amount}
      />
      <Input
        placeholder="deadline*"
        onChange={handleInputChange}
        name="deadline"
        type="number"
        min="1"
        max="31"
        required
        value={formValue.deadline}
      />
      <p>category</p>
      <select name="category" onChange={handleInputChange}>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <p>Type:</p>
      <div onChange={handleInputChange} required>
        <Radio id="auto" name="auto" value="true" label={'auto'} />
        <Radio id="manual" name="auto" value="false" label={'manual'} />
      </div>
      Constantly:
      <Checkbox
        checked={formValue.constantly}
        changeFunction={handleInputChange}
      />
      {formValue.constantly ? null : (
        <>
          <StyledYearNav>
            <NavigateBeforeIcon onClick={() => setModalYear(modalYear - 1)} />
            {modalYear}
            <NavigateNextIcon onClick={() => setModalYear(modalYear + 1)} />
          </StyledYearNav>
          <StyledMonthsContainer>
            {months.map((month) => (
              <MonthBox
                key={month.name}
                month={month.number}
                year={modalYear}
                when={inMonthAndYear}
                addMonthFc={() => handleAddMonth(month, modalYear)}
                removeMonthFc={() => handleRemoveMonth(month, modalYear)}
              >
                {month.name}
              </MonthBox>
            ))}
          </StyledMonthsContainer>
        </>
      )}
      <Button type="submit" primary>
        add expense
      </Button>
    </StyledForm>
  );
};

export default ExpenseForm;
