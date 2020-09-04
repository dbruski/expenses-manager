import React, { useState, useEffect, useContext } from 'react';
import PageTemplate from '../templates/PageTemplate';
import styled from 'styled-components';
import { AppContext } from '../context';
import Header from '../components/organisms/Header/Header';
import Modal from '../components/molecules/Modal/Modal';
import ExpensesList from '../components/organisms/ExpensesList/ExpensesList';
import { months } from '../helpers/months';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const StyledDateContainer = styled.div`
  width: 220px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Home = () => {
  const { month, year, setMonth, setYear } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNextMonth = () => {
    if (month + 1 < 12) {
      setMonth(month + 1);
    } else {
      setMonth(0);
      setYear(year + 1);
    }
  };

  const handlePrevMonth = () => {
    if (month - 1 >= 0) {
      setMonth(month - 1);
    } else {
      setMonth(11);
      setYear(year - 1);
    }
  };
  return (
    <PageTemplate>
      <>
        <Header title="Expenses">
          <StyledDateContainer>
            <NavigateBeforeIcon
              fontSize="large"
              onClick={handlePrevMonth}
              style={{ cursor: 'pointer' }}
            />
            {typeof month === 'number' ? `${months[month].name} ${year}` : null}
            <NavigateNextIcon
              fontSize="large"
              onClick={handleNextMonth}
              style={{ cursor: 'pointer' }}
            />
          </StyledDateContainer>
        </Header>
        <ExpensesList />
        {isModalOpen && (
          <Modal
            header="Title"
            closeModalFunction={() => setIsModalOpen(false)}
          ></Modal>
        )}
      </>
    </PageTemplate>
  );
};

export default Home;
