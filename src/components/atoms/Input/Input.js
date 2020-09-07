import styled from 'styled-components';

const Input = styled.input`
  font-size: ${({ theme }) => theme.fontSize.m};
  outline: none;
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.black};
  padding: 5px 10px;
  width: 180px;
  transition: 0.2s ease-in-out;

  :focus {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }
`;
export default Input;
