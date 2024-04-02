import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {  Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import DjelatnikService from "../../services/DjelatnikService";



export default function DjelatniciDodaj(){

    const navigate = useNavigate();
    
    async function dodaj(djelatnik){
        const odgovor = await DjelatnikService.post(djelatnik);
        if(odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.DJELATNIK_PREGLED);
    }

    function obradiSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        const djelatnik = {
           ime: podaci.get('ime'),
           prezime: podaci.get('prezime'),

        };
        dodaj(djelatnik);
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

        
            <hr/>

         <Row>
            <Col xs={6} sm={6} md={3} lg={6}xl={6}>
            <Link className="btn btn-danger siroko" to={RoutesNames.DJELATNIK_PREGLED}>
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