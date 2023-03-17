import CardWidget from "../CardWidget/CardWidget";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./style.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Navbar bg="light" id="nav">
      <Container fluid>
        <Nav.Link as={Link} to="/" id="nombreNav">
          {" "}
          Home
        </Nav.Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 navBarBootstrap"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/allclothes">
              All clothes
            </Nav.Link>
            <Nav.Link as={Link} to="/category/shoes">
              Shoes
            </Nav.Link>
            <Nav.Link as={Link} to="/category/socks">
              Socks
            </Nav.Link>
            <Nav.Link as={Link} to="/category/t-shirts">
              T-shirts
            </Nav.Link>
            <NavDropdown title="More" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#Contact">Contact</NavDropdown.Item>
              <NavDropdown.Item href="#Latest Shoes">
                Latest Shoes
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#Create">
                Create your own shoes
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/cart">
              <CardWidget cantidadCarrito={4} />
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
