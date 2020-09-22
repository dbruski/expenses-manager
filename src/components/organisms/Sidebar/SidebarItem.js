import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { device } from '../../../helpers';
const StyledLink = styled.li`
  position: relative;
  color: ${({ theme }) => theme.white};
  cursor: pointer;
  border-radius: 12px;
  padding: 0 20px;
  transition: all 0.4s;

  :hover {
    background: ${({ theme }) => theme.primary100};
  }

  @media ${device.desktop} {
    box-shadow: 0;
    padding: 0;
    margin: 20px;

    :hover {
      transform: scale(1.09);
    }
  }
`;

const StyledBadge = styled.div`
  display: none;

  @media ${device.desktop} {
    display: block;
    position: absolute;
    left: 50%;
    top: 120%;
    width: 70px;
    height: 20px;
    border-radius: 6px;
    background: ${({ theme }) => theme.black};
    text-align: center;
    transform: translate(-50%, -50%);

    ::after {
      content: '';
      position: absolute;
      top: -70%;
      left: 50%;
      transform: translateX(-50%);
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-bottom: 15px solid black;
    }
  }
`;

const SidebarItem = ({ children, label, to }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavLink exact to={to}>
      <StyledLink
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
        {isHovered && <StyledBadge>{label}</StyledBadge>}
      </StyledLink>
    </NavLink>
  );
};

SidebarItem.propTypes = {
  children: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
};

export default SidebarItem;
