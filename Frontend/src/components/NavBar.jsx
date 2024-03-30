
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { RoutesNames } from '../constants';
import { useNavigate } from 'react-router-dom';








export default function NavBar(){
    const navigate = useNavigate();
return(
    <>
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand 
        onClick={()=>navigate(RoutesNames.HOME)}
        className='kursor'
        
        >Reklamacijski Pult</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="https://kresimir-001-site1.jtempurl.com/swagger/index.html" target='_blank'>API</Nav.Link>
            <NavDropdown title="Reklamacije" id="collapsible-nav-dropdown">
              <NavDropdown.Item 
              onClick={()=>navigate(RoutesNames.DJELATNIK_PREGLED)}>Djelatnici
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate(RoutesNames.KORISNIK_PREGLED)}>Korisnici
                
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate(RoutesNames.PROIZVOD_PREGLED)}>Proizvodi</NavDropdown.Item>
              
              <NavDropdown.Item onClick={()=>navigate(RoutesNames.RADNINALOG_PREGLED)}>
                Radni nalozi
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate(RoutesNames.STATUS_PREGLED)}>
                Statusi
              </NavDropdown.Item>
            </NavDropdown>
            
           

          </Nav>
        <Nav>

        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    </>
);
}
