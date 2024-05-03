import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {  Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";

import { useEffect, useState } from "react";

import StanjeService from "../../services/StanjeService";



export default function ProizvodiPromjena(){

    const navigate = useNavigate();

    const [stanje, setStanje] = useState({});

    const routeParams = useParams();
    
    async function dohvatiStanje(){
        const o = await StanjeService.getBySifra(routeParams.sifra);
        if(o.greska){
            console.log(o.poruka);
            alert('pogledaj konzolu');
            return;
        }
        setStanje(o.poruka);

    }
    async function promjeni(stanje){
        const odgovor = await StanjeService.put(routeParams.sifra,stanje);
        if(odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.STANJE_PREGLED);
    }




    useEffect(()=>{

        dohvatiStanje();
    },[]);



    function obradiSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        const stanje = {
           naziv: podaci.get('naziv'),
           
           
        };
        promjeni(stanje);
    }

return(

    <Container>
        <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="ime">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" defaultValue={stanje.naziv}/>
            </Form.Group>
          

        
            <hr/>

         <Row>
            <Col >
            <Link className="btn btn-danger siroko" to={RoutesNames.STANJE_PREGLED}>
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