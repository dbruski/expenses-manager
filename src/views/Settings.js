import React, { useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from '../context';
import PageTemplate from '../templates/PageTemplate';
import Header from '../components/organisms/Header/Header';
import Modal from '../components/molecules/Modal/Modal';
import CategoryForm from '../components/organisms/Forms/CategoryForm';

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 90%;
  margin: 5vh auto;
  padding: 5px;
`;

const StyledHeading = styled.div`
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
    background: ${({ theme }) => theme.grey};
  }
`;

const Settings = () => {
  const { expenses, categories } = useContext(AppContext);
  const [categoryModal, setCategoryModal] = useState(false);
  const [clickedCategoryId, setClickedCategoryId] = useState(null);

  const handleCategoryClick = (id) => {
    setClickedCategoryId(id);
    setCategoryModal(true);
  };

  const handleAddCategoryClick = () => {
    setClickedCategoryId(null);
    setCategoryModal(true);
  };

  return (
    <PageTemplate>
      <>
        <Header title="Settings" />
        <StyledContainer>
          <StyledHeading>categories</StyledHeading>
          {categories.map(({ id, name }) => (
            <StyledCategory key={id} onClick={() => handleCategoryClick(id)}>
              {name}
            </StyledCategory>
          ))}
          <StyledCategory add onClick={handleAddCategoryClick}>
            +
          </StyledCategory>
        </StyledContainer>
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
      </>
    </PageTemplate>
  );
};

export default Settings;
