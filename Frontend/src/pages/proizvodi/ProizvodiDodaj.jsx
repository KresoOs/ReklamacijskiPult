import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {  Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import ProizvodService from "../../services/ProizvodService";




export default function DjelatniciDodaj(){

    const navigate = useNavigate();
    
    async function dodaj(proizvod){
        const odgovor = await ProizvodService.post(proizvod);
        if(odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.PROIZVOD_PREGLED);
    }

    function obradiSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        const proizvod = {
           ime: podaci.get('ime'),
           opis: podaci.get('opis'),
           jedinica_Kolicine: podaci.get('jedinica_Kolicine')

        };
        dodaj(proizvod);
    }

return(

    <Container>
        <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="ime">
                <Form.Label>Ime</Form.Label>
                <Form.Control type="text" name="ime"/>
            </Form.Group>
            <Form.Group controlId="opis">
                <Form.Label>Opis</Form.Label>
                <Form.Control type="text" name="opis"/>
            </Form.Group>
            <Form.Group controlId="jedinica_Kolicine">
                <Form.Label>Jedinica Količine</Form.Label>
                <Form.Control type="text" name="jedinica_Kolicine"/>
            </Form.Group>

        
            <hr/>

         <Row>
            <Col xs={6} sm={6} md={3} lg={6}xl={6}>
            <Link className="btn btn-danger siroko" to={RoutesNames.PROIZVOD_PREGLED}>
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