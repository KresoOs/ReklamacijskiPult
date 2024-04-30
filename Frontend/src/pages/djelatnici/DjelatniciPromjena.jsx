import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {  Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import DjelatnikService from "../../services/DjelatnikService";
import { useEffect, useState } from "react";



export default function DjelatniciPromjena(){

    const navigate = useNavigate();

    const [setDjelatnik] = useState({});

    const routeParams = useParams();
    
    async function dohvatiDjelatnika(){
        const o = await DjelatnikService.getBySifra(routeParams.sifra);
        if(o.greska){
            console.log(o.poruka);
            alert('pogledaj konzolu');
            return;
        }
        setDjelatnik(o.poruka);

    }
    async function promjeni(djelatnik){
        const odgovor = await DjelatnikService.put(routeParams.sifra,djelatnik);
        if(odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.DJELATNIK_PREGLED);
    }




    useEffect(()=>{

        dohvatiDjelatnika();
    },[]);



    function obradiSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        const djelatnik = {
           ime: podaci.get('ime'),
           prezime: podaci.get('prezime'),

        };
        promjeni(djelatnik);
    }

return(

    <Container>
        <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="ime">
                <Form.Label>Ime</Form.Label>
                <Form.Control type="text" name="ime" defaultValue={djelatnik.ime}/>
            </Form.Group>
            <Form.Group controlId="prezime" >
                <Form.Label>Prezime</Form.Label>
                <Form.Control type="text" name="prezime" defaultValue={djelatnik.prezime} />
            </Form.Group>

        
            <hr/>

         <Row>
            <Col >
            <Link className="btn btn-danger siroko" to={RoutesNames.DJELATNIK_PREGLED}>
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