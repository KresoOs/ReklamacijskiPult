import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StanjeService from "../../services/StanjeService";
import { Button, Container, Table } from "react-bootstrap";
import { RoutesNames } from '../../constants';

export default function Stanja(){

const[Stanja,setStanje]=useState();
const navigate = useNavigate();
async function dohvatiStanje(){
    await StanjeService.get()
    .then((odg=>{
        setStanje(odg);
    }))
    .catch((e=>{
        console.log(e);
    }));
}
useEffect(()=>{
    dohvatiStanje();
},[]);

async function obrisiAsync(sifra){
    const odgovor = await StanjeService._delete(sifra);
    if(odgovor.greska){
        console.log(odgovor.poruka);
        alert('Pogledaj konzolu');
        return;
    }
    dohvatiStanje();
  }
  
  function obrisi(sifra){
    
    obrisiAsync(sifra);
  
  
  }

  return(
    
    <Container>
     <Link to={RoutesNames.STANJE_NOVI}>Dodaj</Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              Šifra 
            </th>
            <th>
              Naziv
            </th>
            
            <th>
              Akcija
            </th>

          </tr>
        </thead>
        <tbody>
          {Stanja && Stanja.map((stanje,index)=>(

           <tr key={index}>
            <td>{stanje.naziv}</td>
            
            <td>
              <Button onClick={()=>obrisi(stanje.sifra)}variant='danger'>Obriši</Button>
              <Button onClick={()=>{navigate(`/stanja/${stanje.sifra}`)}} >Promijeni</Button>
            </td>

           </tr>

          ))}
        </tbody>
      </Table>

    </Container>
    
    
);
}






