import styled, { css } from 'styled-components';
import { device } from '../../../helpers';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  border-radius: 12px;
  border: 2px solid;
  padding: 5px;
  font-weight: ${({ theme }) => theme.bold};
  transition: 0.2s ease-in-out;

  ${({ primary }) =>
    primary &&
    css`
      color: ${({ theme }) => theme.primary};
      background: ${({ theme }) => theme.white};
      border-color: ${({ theme }) => theme.primary};

      :hover {
        color: ${({ theme }) => theme.white};
        background: ${({ theme }) => theme.primary};
        border-color: ${({ theme }) => theme.white};
        transform: scale(1.19);
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${({ theme }) => theme.grey200};
      background: ${({ theme }) => theme.white};
      border-color: ${({ theme }) => theme.grey200};
      cursor: default;
    `} {
    ${({ auto }) =>
      auto &&
      css`
        color: ${({ theme }) => theme.white};
        background: ${({ theme }) => theme.primary};
        border-color: ${({ theme }) => theme.primary};
        cursor: default;
      `}
  }

  ${({ addExpense }) =>
    addExpense &&
    css`
      position: fixed;
      /* position: absolute; */
      bottom: 10vh;
      /* top: 10vh; */
      right: 20px;
      width: 80px;
      height: 80px;
      border-radius: 50px;
      background: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.white};
      font-size: ${({ theme }) => theme.fontSize.xl};
      z-index: 100;
      transition: 0.2s ease-in-out;

      :hover {
        font-size: 64px;
        transform: scale(1.09);
      }
      @media ${device.desktop} {
        bottom: 20px;
        right: 20px;
        width: 100px;
        height: 100px;
      }
    `}

  ${({ deleteButton }) =>
    deleteButton &&
    css`
      background: ${({ theme }) => theme.white};
      color: ${({ theme }) => theme.danger};
      border-color: ${({ theme }) => theme.danger};

      :hover {
        background: ${({ theme }) => theme.danger};
        color: ${({ theme }) => theme.white};
        border-color: ${({ theme }) => theme.white};
        transform: scale(1.19);
      }
    `}
`;

export default Button;
