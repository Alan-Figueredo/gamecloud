import { Container, Navbar, NavLink } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./NavBar.css"
export const NavBar = () => {
    return (
        <Navbar>
            <Container>
                <NavLink>
                    <Link to="/"><h1>GAME STORE</h1></Link>
                </NavLink>
            </Container>
        </Navbar>
    )
}