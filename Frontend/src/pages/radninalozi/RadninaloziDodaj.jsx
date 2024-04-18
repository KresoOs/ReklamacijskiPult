import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {  Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";

import RadninalogService from "../../services/RadninalogService";






export default function RadninaloziDodaj(){

    const navigate = useNavigate();
    
    async function dodaj(radninalog){
        const odgovor = await RadninalogService.post(radninalog);
        if(odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.RADNINALOG_PREGLED);
    }

    function obradiSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        const radninalog = {
           proizvodSifra: podaci.get('proizvodSifra'),
           kupacSifra: podaci.get('kupacSifra'),
           datum: podaci.get('datum'),
           napomena: podaci.get('napomena')

        };
        dodaj(radninalog);
    }

return(

    <Container>
        <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="proizvodSifra">
                <Form.Label>Šifra proizvoda</Form.Label>
                <Form.Control type="int" name="proizvodSifra"/>
            </Form.Group>
            <Form.Group controlId="kupacSifra">
                <Form.Label>Šifra Kupca</Form.Label>
                <Form.Control type="int" name="kupacSifra"/>
            </Form.Group>
            <Form.Group controlId="datum">
                <Form.Label>Datum</Form.Label>
                <Form.Control type=""/>
            </Form.Group>
            
            <Form.Group controlId="napomena">
                <Form.Label>Napomena</Form.Label>
                <Form.Control type="text" name="napomena"/>
            </Form.Group>

        
            <hr/>

         <Row>
            <Col xs={6} sm={6} md={3} lg={6}xl={6}>
            <Link className="btn btn-danger siroko" to={RoutesNames.RADNINALOG_PREGLED}>
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