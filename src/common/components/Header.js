import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';
import { Link } from 'react-router';

class Header extends React.Component {

  render() {
    return (
      <Navbar brand={<Link to='/'>LJTC</Link>} staticTop toggleNavKey={0}>
        <Nav eventKey={0}>
          <NavItemLink to='champions'>Champions</NavItemLink>
          <NavItemLink to='items'>Items</NavItemLink>
          <NavItemLink to='runes'>Runes</NavItemLink>
          <NavItemLink to='spells'>Spells</NavItemLink>
        </Nav>
      </Navbar>
    );
  }

}

export default Header;

