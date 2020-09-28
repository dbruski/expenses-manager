import React from 'react';
import styled from 'styled-components';
import SidebarItem from './SidebarItem';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';
import { device } from '../../../helpers';
import HomeIcon from '@material-ui/icons/Home';
import BarChartIcon from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings';

const StyledWrapper = styled.nav`
  position: fixed;
  left: 0;
  bottom: 0;
  background: ${({ theme }) => theme.primary};
  width: 100vw;
  height: 10vh;
  z-index: 99;
  box-shadow: 0 0 15px 0 #000;
  @media ${device.desktop} {
    width: 8vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledLogo = styled.div`
  display: none;

  @media ${device.desktop} {
    display: flex;
    margin: 5vh auto 15vh auto;
    justify-content: center;
    align-items: center;
    height: 78px;
    width: 78px;
    font-size: 58px;
    border-radius: 50px;
    color: #fff;
    font-weight: ${({ theme }) => theme.bold};
    border: 10px solid #fff;
  }
`;

const StyledList = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;

  justify-content: center;
  align-items: center;

  @media ${device.desktop} {
    width: auto;
    display: block;
  }
`;

const Sidebar = () => (
  <StyledWrapper>
    <StyledList>
      <StyledLogo as={Link} to={routes.home}>
        $
      </StyledLogo>
      <SidebarItem to={routes.home} label="home">
        <HomeIcon style={{ fontSize: '60px' }} />
      </SidebarItem>
      <SidebarItem to={routes.chart} label="chart">
        <BarChartIcon style={{ fontSize: '60px' }} />
      </SidebarItem>
      <SidebarItem to={routes.settings} label="settings">
        <SettingsIcon style={{ fontSize: '60px' }} />
      </SidebarItem>
    </StyledList>
  </StyledWrapper>
);

export default Sidebar;
