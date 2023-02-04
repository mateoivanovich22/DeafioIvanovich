import CardWidget from "../CardWidget/CardWidget";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './style.css'

export default function NavBar() {
  return (
    <Navbar bg="light" id="nav">
      <Container fluid>
        <Navbar.Brand href="#" id="nombreNav">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 navBarBootstrap"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#Shoes">Shoes</Nav.Link>
            <Nav.Link href="#Contact">Contact</Nav.Link>
            <NavDropdown title="More" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#Discount">Discount</NavDropdown.Item>
              <NavDropdown.Item href="#Latest Shoes">
                Latest Shoes
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#Create">
                Create your own shoes
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#carrito">
              <CardWidget cantidadCarrito={4}/>
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
