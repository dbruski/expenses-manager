import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AppContext } from '../../../context';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButotnsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 40%;
  margin: 10px auto;
`;

const StyledWarning = styled.p`
  color: ${({ theme }) => theme.danger};
`;

const CategoryForm = ({ id, closeModalFunction }) => {
  const { categories, addCategory, editCategory, deleteCategory } = useContext(
    AppContext,
  );
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (id) {
      const selectedCategory = categories.find(
        (category) => category.id === id,
      );
      setInputValue(selectedCategory.name);
    }
  }, [id]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (inputValue) {
      addCategory({ id: Date.now(), name: inputValue });
      closeModalFunction();
    }
  };

  const handleEditCategory = (e) => {
    e.preventDefault();
    if (inputValue) {
      editCategory({ id, name: inputValue });
      closeModalFunction();
    }
  };

  const handleDeleteCategory = (e) => {
    e.preventDefault();
    if (inputValue) {
      deleteCategory(id);
      closeModalFunction();
    }
  };

  return (
    <StyledForm>
      <label htmlFor="name">category name</label>
      <Input
        type="text"
        name="name"
        id="name"
        placeholder="category name*"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <ButotnsContainer>
        {id ? (
          <Button primary onClick={handleEditCategory}>
            edit
          </Button>
        ) : (
          <Button primary onClick={handleAddCategory}>
            add
          </Button>
        )}
        {id && (
          <Button deleteButton onClick={handleDeleteCategory}>
            delete
          </Button>
        )}
      </ButotnsContainer>
      {id && (
        <StyledWarning>
          deleteting category may cause wrong results in bar chart
        </StyledWarning>
      )}
    </StyledForm>
  );
};

CategoryForm.propTypes = {
  id: PropTypes.number,
  closeModalFunction: PropTypes.func.isRequired,
};

export default CategoryForm;
