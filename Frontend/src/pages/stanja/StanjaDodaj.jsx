import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {  Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";

import StanjeService from "../../services/StanjeService";




export default function StanjaDodaj(){

    const navigate = useNavigate();
    
    async function dodaj(stanje){
        const odgovor = await StanjeService.post(stanje);
        if(odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.STANJE_PREGLED);
    }

    function obradiSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        const stanje = {
           naziv: podaci.get('naziv'),
           

        };
        dodaj(stanje);
    }

return(

    <Container>
        <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="ime">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv"/>
            </Form.Group>
           
            

        
            <hr/>

         <Row>
            <Col xs={6} sm={6} md={3} lg={6}xl={6}>
            <Link className="btn btn-danger siroko" to={RoutesNames.STANJE_PREGLED}>
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