import React, { useState } from 'react';
import PageTemplate from '../templates/PageTemplate';
import Header from '../components/organisms/Header/Header';
import Modal from '../components/molecules/Modal/Modal';
import Button from '../components/atoms/Button/Button';
import ExpensesList from '../components/organisms/ExpensesList/ExpensesList';
import ExpenseForm from '../components/organisms/Forms/ExpenseForm';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PageTemplate>
      <>
        <Header title="Expenses" withNav />
        <ExpensesList />
        {isModalOpen && (
          <Modal
            header="Add expense"
            closeModalFunction={() => setIsModalOpen(false)}
          >
            <ExpenseForm closeModalFunction={() => setIsModalOpen(false)} />
          </Modal>
        )}
        <Button addExpense onClick={() => setIsModalOpen(true)}>
          +
        </Button>
      </>
    </PageTemplate>
  );
};

export default Home;
