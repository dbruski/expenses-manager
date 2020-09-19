import React, { useState, useEffect, useContext } from 'react';
import PageTemplate from '../templates/PageTemplate';
import styled from 'styled-components';
import { AppContext } from '../context';
import Header from '../components/organisms/Header/Header';
import { Bar } from 'react-chartjs-2';
import { months } from '../helpers';

const StyledContainer = styled.section`
  margin: 10vh 5vw;
  max-height: 70vh;
`;

const Chart = () => {
  const { expenses, categories, month, year } = useContext(AppContext);
  const [data, setData] = useState({});

  useEffect(() => {
    let categoriesData = categories.map((category) => ({
      name: category.name,
      amount: 0,
    }));

    expenses.forEach(({ category, paid }) => {
      paid.map((payment) => {
        if (payment.month === month && payment.year === year) {
          categoriesData.map((obj) => {
            console.log(obj, category);
            if (obj.name === category.name) {
              obj.amount += payment.amount;
            }
          });
        }
      });
    });
    setData({
      labels: categoriesData.map((cat) => cat.name),
      datasets: [
        {
          label: 'Expense',
          backgroundColor: ['#008000'],
          borderColor: '#000',
          borderWidth: 2,
          data: categoriesData.map((cat) => cat.amount),
        },
      ],
    });
  }, [month, year, expenses, categories]);

  const options = {
    title: {
      display: true,
      text: `Expenses in ${months[month].name} ${year}`,
      fontSize: 25,
    },
    legend: { display: false },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <PageTemplate>
      <>
        <Header title="Chart" withNav />
        <StyledContainer>
          <Bar data={data} options={options} />
        </StyledContainer>
      </>
    </PageTemplate>
  );
};

export default Chart;
