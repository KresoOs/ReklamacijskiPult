import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {  Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";

import { useEffect, useState } from "react";
import ProizvodService from "../../services/ProizvodService";



export default function ProizvodiPromjena(){

    const navigate = useNavigate();

    const [proizvod, setProizvod] = useState({});

    const routeParams = useParams();
    
    async function dohvatiProizvod(){
        const o = await ProizvodService.getBySifra(routeParams.sifra);
        if(o.greska){
            console.log(o.poruka);
            alert('pogledaj konzolu');
            return;
        }
        setProizvod(o.poruka);

    }
    async function promjeni(proizvod){
        const odgovor = await ProizvodService.put(routeParams.sifra,proizvod);
        if(odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.PROIZVOD_PREGLED);
    }




    useEffect(()=>{

        dohvatiProizvod();
    },[]);



    function obradiSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        const proizvod = {
           ime: podaci.get('ime'),
           opis: podaci.get('opis'),
           jedinica_Kolicine: podaci.get('jedinica_Kolicine'),
        };
        promjeni(proizvod);
    }

return(

    <Container>
        <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="ime">
                <Form.Label>Ime</Form.Label>
                <Form.Control type="text" name="ime" defaultValue={proizvod.ime}/>
            </Form.Group>
            <Form.Group controlId="opis" >
                <Form.Label>Opis</Form.Label>
                <Form.Control type="text" name="opis" defaultValue={proizvod.opis} />
            </Form.Group>
            <Form.Group controlId="jedinica_Kolicine" >
                <Form.Label>Jedinica Količine</Form.Label>
                <Form.Control type="text" name="jedinica_Kolicine" defaultValue={proizvod.jedinica_Kolicine} />
            </Form.Group>

        
            <hr/>

         <Row>
            <Col >
            <Link className="btn btn-danger siroko" to={RoutesNames.PROIZVOD_PREGLED}>
                Odustani
            </Link>
            </Col>
            <Col  >

                <Button className="siroko" variant="primary" type="submit">Promjeni</Button>
            </Col>



         </Row>
        </Form>




    </Container>
);


}