import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default () => {

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Link to="/">
                    <Navbar.Brand>Hackflix</Navbar.Brand>
                </Link>
                <Nav className="mr-auto ">
                    <Link to="/movies">
                        <Button variant="dark">Movies</Button>
                    </Link>
                    <Link to="/tv">
                        <Button variant="dark">Tv Series</Button>
                    </Link>
                    <Link to="/myFav">
                        <Button variant="dark">My Favorite</Button>
                    </Link>
                </Nav>
            </Navbar>
        </div>
    )
}