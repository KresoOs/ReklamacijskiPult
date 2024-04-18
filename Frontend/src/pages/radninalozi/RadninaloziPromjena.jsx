import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {  Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import ProizvodService from "../../services/ProizvodService";
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
        const odgovor = await ProizvodService.put(routeParams.sifra,radninalog);
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
            datum: podaci.get(Date),
            napomena: podaci.get('napomena')
        };
        promjeni(radninalog);
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