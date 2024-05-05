import { Button, Col, Container, DropdownButton, DropdownItem, Form, Row } from "react-bootstrap";
import {  Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";

import { useEffect, useState } from "react";

import RadninalogService from "../../services/RadninalogService";



export default function RadninaloziPromjena(){

    const navigate = useNavigate();

    const [radninalog, setRadninalog] = useState({});

    const routeParams = useParams();
    
    async function dohvatiRadninalog(){
        const o = await RadninalogService.getBySifra(routeParams.sifra);
        if(o.greska){
            console.log(o.poruka);
            alert('pogledaj konzolu');
            return;
        }
        setRadninalog(o.poruka);

    }
    async function promjeni(radninalog){
        const odgovor = await RadninalogService.put(routeParams.sifra,radninalog);
        if(odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.RADNINALOG_PREGLED);
    }




    useEffect(()=>{

        dohvatiRadninalog();
    },[]);



    function obradiSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        const radninalog = {
            proizvodSifra: podaci.get('proizvodSifra'),
            kupacSifra: podaci.get('kupacSifra'),
            datum: podaci.get('datum'),
            napomena: podaci.get('napomena')
        };
        promjeni(radninalog);
    }

return(

    <Container>
        <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="proizvodSifra">
                <Form.Label>Šifra proizvoda</Form.Label>
                <Form.Control type="int" name="proizvodSifra" defaultValue={radninalog.proizvodSifra}/>
            </Form.Group>
            <Form.Group controlId="kupacSifra" >
                <Form.Label>Šifra Kupca</Form.Label>
                <Form.Control type="int" name="kupacSifra" defaultValue={radninalog.kupacSifra} />
            </Form.Group>
            <Form.Group controlId="datum" >
                <Form.Label>Datum</Form.Label>
                <Form.Control type="date" name="datum" defaultValue={radninalog.datum} />
            </Form.Group>
            
            <Form.Group controlId="napomena" >
                <Form.Label>napomena</Form.Label>
                <Form.Control type="text" name="napomena" defaultValue={radninalog.napomena} />
            </Form.Group>

        
            <hr/>

         <Row>
            <Col >
            <Link className="btn btn-danger siroko" to={RoutesNames.RADNINALOG_PREGLED}>
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