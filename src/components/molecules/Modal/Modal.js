import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { device } from '../../../helpers';
import CloseIcon from '@material-ui/icons/Close';

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const StyledWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10001;
  width: 90vw;
  background: ${({ theme }) => theme.grey50};
  border-radius: 8px;
  @media ${device.tablet} {
    width: 50vw;
  }

  @media ${device.desktop} {
    left: calc(50% - 4vw);
    width: 30vw;
  }
`;

const StyledHeader = styled.div`
  height: 10vh;
  width: 100%;
  background: green;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 5vh;
  right: 5vh;
  transform-origin: center;
  transform: translate(50%, -50%);
  height: 30px;
  width: 30px;
  border-radius: 50px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.danger};
  transition: all 0.2s ease-in-out;

  :hover {
    transform: translate(50%, -50%) scale(1.19);
  }
`;

const StyledContent = styled.div`
  padding: 20px;
`;

const Modal = ({ header, children, closeModalFunction }) => {
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModalFunction();
      }
    });

    return () => {
      document.removeEventListener('keydown', closeModalFunction);
    };
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <StyledOverlay onClick={closeModalFunction} />
      <StyledWrapper>
        <StyledHeader>
          <h1>{header}</h1>
        </StyledHeader>
        <StyledCloseButton onClick={closeModalFunction}>
          <CloseIcon />
        </StyledCloseButton>
        <StyledContent>{children}</StyledContent>
      </StyledWrapper>
    </>
  );
};

Modal.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  closeModalFunction: PropTypes.func.isRequired,
};

export default Modal;
