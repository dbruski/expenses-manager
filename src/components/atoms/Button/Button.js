import styled, { css } from 'styled-components';

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
`;

export default Button;
