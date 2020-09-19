import React, { useState, useContext, useEffect } from 'react';
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
import { NO_CATEGORY } from '../../../consts';

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

const StyledError = styled.p`
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.danger};
  padding: 5px;
  text-align: center;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 20%;
  margin: 10px auto;
`;

const ExpenseForm = ({ id, closeModalFunction }) => {
  const {
    day,
    currentYear,
    currentMonth,
    categories,
    expenses,
    addExpense,
    editExpense,
    deleteExpenseSoft,
    deleteExpenseHard,
  } = useContext(AppContext);
  const [formValue, setFormValue] = useState({ ...emptyForm });
  const [modalYear, setModalYear] = useState(currentYear);
  const [inMonthAndYear, setInMonthAndYear] = useState([]);
  const [error, setError] = useState('');
  const [todaysDate, setTodaysDate] = useState(null);
  const [selectedExpense] = useState(
    expenses.find((expense) => expense.id === id),
  );

  useEffect(() => {
    setTodaysDate(new Date(currentYear, currentMonth, day));
    if (id) {
      setInMonthAndYear(
        selectedExpense.inMonthAndYear ? selectedExpense.inMonthAndYear : [],
      );
      setFormValue({
        ...selectedExpense,
        category: selectedExpense.category.name || NO_CATEGORY,
        inMonthAndYear,
      });
    }
  }, [id, currentYear, currentMonth, day]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {
      id: Date.now(),
      ...formValue,
      category: categories.find(
        (category) => category.name === formValue.category,
      ),
      inMonthAndYear,
      added: todaysDate,
    };
    if (validate(form, todaysDate)) {
      addExpense(form);
      closeModalFunction();
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const form = {
      ...formValue,
      inMonthAndYear,
    };
    if (validate(form, todaysDate)) {
      editExpense(form);
      closeModalFunction();
    }
  };
  const handleDelete = (e) => {
    e.preventDefault();
    deleteExpenseSoft(formValue);
    closeModalFunction();
  };
  const handleHardDelete = (e) => {
    e.preventDefault();
    deleteExpenseHard(id);
    closeModalFunction();
  };

  const validate = (form, todaysDate) => {
    if (form.auto === null) {
      setError('Set the payment as auto or manual');
      return false;
    } else if (!form.constantly && !form.inMonthAndYear.length) {
      setError('Select months or mark as a constant expense');
      return false;
    } else if (form.category === 'NO_CATEGORY') {
      setError('Select category');
      return false;
    } else {
      const selectedDatesLastDays = form.inMonthAndYear.map(
        (obj) => new Date(obj.year, obj.month + 1, 0),
      );
      const isPassedMonthSelected = selectedDatesLastDays.some(
        (date) => todaysDate - date >= 0,
      );

      if (isPassedMonthSelected) {
        setError('Delete months that have already passed.');
        return false;
      } else {
        return true;
      }
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

  const handleCategoryChange = (e) => {
    setFormValue({
      ...formValue,
      category: categories.find((category) => category.name === e.target.value),
    });
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
    <StyledForm autoComplete="off">
      <label htmlFor="name">name</label>
      <Input
        placeholder="name*"
        onChange={handleInputChange}
        id="name"
        name="name"
        type="text"
        required
        value={formValue.name}
      />
      <label htmlFor="amount">amount</label>
      <Input
        placeholder="amount*"
        onChange={handleInputChange}
        id="amount"
        name="amount"
        type="number"
        min="1"
        required
        value={formValue.amount}
      />
      <label htmlFor="deadline">deadline</label>
      <Input
        placeholder="deadline*"
        onChange={handleInputChange}
        id="deadline"
        name="deadline"
        type="number"
        min="1"
        max="31"
        required
        value={formValue.deadline}
      />
      {categories.length ? (
        <>
          <label htmlFor="category">category</label>
          <select
            name="category"
            id="category"
            onChange={handleCategoryChange}
            defaultValue={
              selectedExpense?.category.name
                ? selectedExpense?.category.name
                : NO_CATEGORY
            }
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
            {selectedExpense?.category.name ? null : (
              <option value={NO_CATEGORY}>no category</option>
            )}
          </select>
        </>
      ) : null}
      <label htmlFor="auto">type</label>
      <div required>
        <Radio
          id="auto"
          name="auto"
          value="true"
          label={'auto'}
          onChange={handleInputChange}
          checked={formValue.auto === true}
        />
        <Radio
          id="manual"
          name="auto"
          value="false"
          label={'manual'}
          onChange={handleInputChange}
          checked={formValue.auto === false}
        />
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
      {error && <StyledError>{error}</StyledError>}
      {categories.length ? (
        <StyledButtonsContainer>
          {id ? (
            <Button type="submit" onClick={handleEdit} primary>
              edit
            </Button>
          ) : (
            <Button type="submit" primary onClick={handleSubmit}>
              add expense
            </Button>
          )}
          {id && (
            <>
              <Button deleteButton onClick={handleDelete}>
                softdelete
              </Button>
              <Button deleteButton onClick={handleHardDelete}>
                hard delete
              </Button>
            </>
          )}
        </StyledButtonsContainer>
      ) : (
        <StyledError>
          Add categories before {id ? 'editing' : 'adding'} an expense
        </StyledError>
      )}
    </StyledForm>
  );
};

ExpenseForm.propTypes = {
  id: PropTypes.number,
  closeModalFunction: PropTypes.func.isRequired,
};

export default ExpenseForm;
