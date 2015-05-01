import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';
import { Link } from 'react-router';

class Header extends React.Component {

  render() {
    return (
      <Navbar brand={<Link to='/'>LJT</Link>} staticTop toggleNavKey={0}>
        <Nav eventKey={0}>
          <NavItemLink to='champions'>Champions</NavItemLink>
          <NavItemLink to='items'>Items</NavItemLink>
        </Nav>
      </Navbar>
    );
  }

}

export default Header;

