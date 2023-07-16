import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Posts from "./posts";
import { resetUser } from "../store/user";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const handleLogOut = () => {
    localStorage.removeItem("user");
    dispatch(resetUser());
    navigate('/login');
  }
  return (
    <div>
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to='/' style= {{textDecoration: 'none', color: 'inherit'}}>BLOG</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            {Object.keys(user).length > 0 && (
              <div>
          <div className="ms-2">
              <Link to='/write' style= {{textDecoration: 'none', color: 'inherit'}}>Write</Link>
            </div>
            <div className="ms-2">
              <button onClick={handleLogOut} style= {{textDecoration: 'none', color: 'inherit'}}>Log Out</button>
            </div>
            </div>
            )}
            {Object.keys(user).length === 0 && (
              <div>
            <div className="ms-2">
              <Link to='/register' style= {{textDecoration: 'none', color: 'inherit'}}>Sign up</Link>
            </div>
            <div className="ms-2">
              <Link to='/login' style= {{textDecoration: 'none', color: 'inherit'}}>Log in</Link>
            </div>
            </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default Header;