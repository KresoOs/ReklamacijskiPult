import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {  Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { useEffect, useState } from "react";
import KupacService from "../../services/KupacService";



export default function KupciPromjena(){

    const navigate = useNavigate();

    const [kupac, setKupac] = useState({});

    const routeParams = useParams();
    
    async function dohvatiKupca(){
        const o = await KupacService.getBySifra(routeParams.sifra);
        if(o.greska){
            console.log(o.poruka);
            alert('pogledaj konzolu');
            return;
        }
        setKupac(o.poruka);

    }
    async function promjeni(kupac){
        const odgovor = await KupacService.put(routeParams.sifra,kupac);
        if(odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.KUPAC_PREGLED);
    }




    useEffect(()=>{

        dohvatiKupca();
    },[]);



    function obradiSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        const kupac = {
           ime: podaci.get('ime'),
           prezime: podaci.get('prezime'),
           telefon: podaci.get('telefon'),
           email: podaci.get('email')
        

        };
        promjeni(kupac);
    
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
            <Col >
            <Link className="btn btn-danger siroko" to={RoutesNames.KUPAC_PREGLED}>
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