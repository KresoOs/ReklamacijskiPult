import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {  Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import KupacService from "../../services/KupacService";




export default function KupciDodaj(){

    const navigate = useNavigate();
    
    async function dodaj(kupac){
        const odgovor = await KupacService.post(kupac);
        if(odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.KUPAC_PREGLED);
    }

    function obradiSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        const kupac = {
           ime: podaci.get('ime'),
           prezime: podaci.get('prezime'),
           telefon: podaci.get('telefon'),
           email: podaci.get('email')
        

        };
        dodaj(kupac);
    }

return(

    <Container>
        <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="ime">
                <Form.Label>Ime</Form.Label>
                <Form.Control type="text" name="ime"/>
            </Form.Group>
            <Form.Group controlId="prezime">
                <Form.Label>Prezime</Form.Label>
                <Form.Control type="text" name="prezime"/>
            </Form.Group>
            <Form.Group controlId="telefon">
                <Form.Label>Telefon</Form.Label>
                <Form.Control type="text" name="telefon"/>
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="text" name="email"/>
            </Form.Group>



        
            <hr/>

         <Row>
            <Col xs={6} sm={6} md={3} lg={6}xl={6}>
            <Link className="btn btn-danger siroko" to={RoutesNames.KUPAC_PREGLED}>
                Odustani
            </Link>
            </Col>
            <Col  xs={6} sm={6} md={9} lg={6} xl={6}>

                <Button className="siroko" variant="primary" type="submit">Dodaj</Button>
            </Col>



         </Row>
        </Form>




    </Container>
);


}