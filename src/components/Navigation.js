/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/images/logo.svg'

const Navigation = () => {
  const { currentUser } = useAuth()

  return (
    <div>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Link to='/' className='navbar-brand'>
            <img
              alt='A photo album'
              src={logo}
              width='30'
              height='30'
              className='d-inline-block align-top'
            />{' '}
            Album Cloud
          </Link>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <NavLink to='#' className='nav-link'>
                {currentUser && currentUser.email}
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigation
