import React from 'react';
import styled from 'styled-components';
import SidebarItem from './SidebarItem';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../routes';
import HomeIcon from '@material-ui/icons/Home';
import BarChartIcon from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings';

const StyledWrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  background: green;
  width: 8vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogo = styled.div`
  margin: 5vh auto 15vh auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78px;
  width: 78px;
  font-size: 58px;
  border-radius: 50px;
  color: white;
  font-weight: bold;
  border: 10px solid white;
`;

const StyledList = styled.ul``;

const Sidebar = () => (
  <StyledWrapper>
    <StyledList>
      <StyledLogo as={NavLink} exact to={routes.home}>
        $
      </StyledLogo>
      <SidebarItem as={NavLink} exact to={routes.home} label="home">
        <HomeIcon style={{ fontSize: '60px' }} />
      </SidebarItem>
      <SidebarItem as={NavLink} exact to={routes.home} label="chart">
        <BarChartIcon style={{ fontSize: '60px' }} />
      </SidebarItem>
      <SidebarItem as={NavLink} exact to={routes.home} label="settings">
        <SettingsIcon style={{ fontSize: '60px' }} />
      </SidebarItem>
    </StyledList>
  </StyledWrapper>
);

export default Sidebar;
