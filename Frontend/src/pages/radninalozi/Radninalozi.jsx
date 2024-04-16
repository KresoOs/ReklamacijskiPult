
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';


import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import ProizvodService from '../../services/ProizvodService';







export default function Radninalozi(){

  const[Proizvodi,setProizvodi] = useState();
  const navigate = useNavigate();

  async function dohvatiProizvode(){
    await ProizvodService.get()
    .then((odg)=>{


      setProizvodi(odg);

    })
    .catch((e=>{

      console.log(e);

    }));
  }
  useEffect(()=>{

    dohvatiProizvode();

},[]);

async function obrisiAsync(sifra){
  const odgovor = await ProizvodService._delete(sifra);
  if(odgovor.greska){
      console.log(odgovor.poruka);
      alert('Pogledaj konzolu');
      return;
  }
  dohvatiProizvode();
}

function obrisi(sifra){
  
  obrisiAsync(sifra);


}



    
return(
    
    <Container>
     <Link to={RoutesNames.PROIZVOD_NOVI}>Dodaj</Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              Ime
            </th>
            <th>
              Opis
            </th>
            <th>
              Jedinica Količine
            </th>
            <th>
              Akcija
            </th>

          </tr>
        </thead>
        <tbody>
          {Proizvodi && Proizvodi.map((proizvod,index)=>(

           <tr key={index}>
            <td>{proizvod.ime}</td>
            <td>{proizvod.opis}</td>
            <td>{proizvod.jedinica_Kolicine}</td>
            <td>
              <Button onClick={()=>obrisi(proizvod.sifra)}variant='danger'>Obriši</Button>
              <Button onClick={()=>{navigate(`/proizvodi/${proizvod.sifra}`)}} >Promijeni</Button>
            </td>

           </tr>

          ))}
        </tbody>
      </Table>

    </Container>
    
    
);
}
