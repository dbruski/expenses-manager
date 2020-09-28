import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from '../context';
import PageTemplate from '../templates/PageTemplate';
import Checkbox from '../components/atoms/Input/Checkbox';
import Header from '../components/organisms/Header/Header';
import Modal from '../components/molecules/Modal/Modal';
import CategoryForm from '../components/organisms/Forms/CategoryForm';
import ExpenseForm from '../components/organisms/Forms/ExpenseForm';

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 90%;
  margin: 5vh auto;
  padding: 5px;
`;

const StyledActionsContainer = styled.div`
  width: 90%;
  margin: 5vh auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${({ theme }) => theme.black};
`;

const StyledSingleAction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledHeader = styled.h1`
  color: ${({ theme }) => theme.primary};
`;

const StyledButton = styled.button`
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.black};
  background: transparent;
  outline: none;
  border: none;
  margin: 0 5px;
`;

const StyledHeading = styled.div`
  color: ${({ theme }) => theme.white};
  font-weight: ${({ theme }) => theme.bold};
  background: ${({ theme }) => theme.primary};
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSize.l};
  width: 100%;
`;

const StyledCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 40px;
  font-size: ${({ theme }) => theme.fontSize.m};
  border: 2px solid ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.black};
  border-radius: 12px;
  padding: 5px 10px;
  margin: 5px;
  transition: 0.2s ease-in-out;
  cursor: pointer;

  ${({ add }) =>
    add &&
    css`
      height: 40px;
      width: 40px;
      font-size: ${({ theme }) => theme.fontSize.xl};
      font-weight: ${({ theme }) => theme.bold};
      color: ${({ theme }) => theme.primary};
    `}

  :hover {
    transform: scale(1.19);
    background: ${({ theme }) => theme.grey50};
  }
`;

const StyledWarning = styled.p`
  color: ${({ theme }) => theme.danger};
  font-size: ${({ theme }) => theme.fontSize.m};
  padding: 0 10vh;
`;

const Settings = () => {
  const {
    expenses,
    categories,
    isThemeDark,
    changeTheme,
    daysToRemind,
    setDaysToRemind,
  } = useContext(AppContext);
  const [categoryModal, setCategoryModal] = useState(false);
  const [clickedCategoryId, setClickedCategoryId] = useState(null);
  const [expenseModal, setExpenseModal] = useState(false);
  const [clickedExpenseId, setClickedExpenseId] = useState(null);
  const [activeExpenses, setActiveExpenses] = useState([]);
  const [unusedExpenses, setUnusedExpenses] = useState([]);
  const [expensesWithoutCategory, setExpensesWithoutCategory] = useState([]);

  useEffect(() => {
    setActiveExpenses(
      expenses.filter(
        (expense) => expense.constantly || expense.inMonthAndYear.length,
      ),
    );

    setUnusedExpenses(
      expenses.filter(
        (expense) => !expense.constantly && !expense.inMonthAndYear.length,
      ),
    );

    setExpensesWithoutCategory(
      expenses.filter((expense) => !expense.category.name),
    );
  }, [expenses]);

  const handleCategoryClick = (id) => {
    setClickedCategoryId(id);
    setCategoryModal(true);
  };

  const handleAddCategoryClick = () => {
    setClickedCategoryId(null);
    setCategoryModal(true);
  };

  const handleExpenseClick = (id) => {
    setClickedExpenseId(id);
    setExpenseModal(true);
  };

  const handleThemeChange = (isThemeDark) => changeTheme(!isThemeDark);

  const incrementDaysToRemind = () => setDaysToRemind(daysToRemind + 1);
  const decrementDaysToRemind = () => {
    if (daysToRemind > 1) setDaysToRemind(daysToRemind - 1);
  };

  return (
    <PageTemplate>
      <>
        <Header title="Settings" />
        <StyledActionsContainer>
          <StyledSingleAction>
            <StyledHeader>Change theme</StyledHeader>
            <Checkbox
              checked={isThemeDark}
              changeFunction={handleThemeChange}
            />
          </StyledSingleAction>
          <StyledSingleAction>
            <StyledHeader>Remind {daysToRemind} days before</StyledHeader>
            <div>
              <StyledButton onClick={decrementDaysToRemind}>-1</StyledButton>
              <StyledButton onClick={incrementDaysToRemind}>+1</StyledButton>
            </div>
          </StyledSingleAction>
        </StyledActionsContainer>
        <StyledContainer>
          <StyledHeading>Categories</StyledHeading>
          {categories
            .sort((a, b) => a.id - b.id)
            .map(({ id, name }) => (
              <StyledCategory key={id} onClick={() => handleCategoryClick(id)}>
                {name}
              </StyledCategory>
            ))}
          <StyledCategory add onClick={handleAddCategoryClick}>
            +
          </StyledCategory>
        </StyledContainer>
        {expensesWithoutCategory.length ? (
          <StyledWarning>
            The following expense(s):
            {expensesWithoutCategory
              .sort((a, b) => a.id - b.id)
              .map((expense) => (
                <span key={expense.id}> {expense.name}</span>
              ))}
            {expensesWithoutCategory > 1 ? " don't" : " doesn't"} have specified
            category. Select the category to have proper data on chart
          </StyledWarning>
        ) : null}
        {activeExpenses.length ? (
          <StyledContainer>
            <StyledHeading>Active expenses</StyledHeading>
            {activeExpenses
              .sort((a, b) => a.id - b.id)
              .map(({ id, name }) => (
                <StyledCategory key={id} onClick={() => handleExpenseClick(id)}>
                  {name}
                </StyledCategory>
              ))}
          </StyledContainer>
        ) : null}
        {unusedExpenses.length ? (
          <StyledContainer>
            <StyledHeading>Unused expenses</StyledHeading>
            {unusedExpenses
              .sort((a, b) => a.id - b.id)
              .map(({ id, name }) => (
                <StyledCategory key={id} onClick={() => handleExpenseClick(id)}>
                  {name}
                </StyledCategory>
              ))}
          </StyledContainer>
        ) : null}
        {categoryModal && (
          <Modal
            header="Category management"
            closeModalFunction={() => setCategoryModal(false)}
          >
            <CategoryForm
              id={clickedCategoryId}
              closeModalFunction={() => setCategoryModal(false)}
            />
          </Modal>
        )}
        {expenseModal && (
          <Modal
            header="Expense management"
            closeModalFunction={() => setExpenseModal(false)}
          >
            <ExpenseForm
              id={clickedExpenseId}
              closeModalFunction={() => setExpenseModal(false)}
            />
          </Modal>
        )}
      </>
    </PageTemplate>
  );
};

export default Settings;
