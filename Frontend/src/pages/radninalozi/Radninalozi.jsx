
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';


import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';

import RadninalogService from '../../services/RadninalogService';







export default function Radninalozi(){

  const[Radninalozi,setRadninalozi] = useState();
  const navigate = useNavigate();

  async function dohvatiRadnenaloge(){
    await RadninalogService.get()
    .then((odg)=>{


      setRadninalozi(odg);

    })
    .catch((e=>{

      console.log(e);

    }));
  }
  useEffect(()=>{

    dohvatiRadnenaloge();

},[]);

async function obrisiAsync(sifra){
  const odgovor = await RadninalogService._delete(sifra);
  if(odgovor.greska){
      console.log(odgovor.poruka);
      alert('Pogledaj konzolu');
      return;
  }
  dohvatiRadnenaloge();
}

function obrisi(sifra){
  
  obrisiAsync(sifra);


}



    
return(
    
    <Container>
     <Link to={RoutesNames.RADNINALOG_NOVI}>Dodaj</Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              Šifra proizvoda
            </th>
            <th>
              Šifra kupca
            </th>
            <th>
              Datum
            </th>
            <th>
              Napomena
            </th>
            <th>
              Status
            </th>
            <th>
              Akcija
            </th>

          </tr>
        </thead>
        <tbody>
          {Radninalozi && Radninalozi.map((radninalog,index)=>(

           <tr key={index}>
            <td>{radninalog.proizvodIme}</td>
            <td>{radninalog.kupacImePrezime}</td>
            <td>{radninalog.datum}</td>
            <td>{radninalog.napomena}</td>
            <td>{radninalog.trenutnoStanje}</td>
            <td>
              <Button onClick={()=>obrisi(radninalog.sifra)}variant='danger'>Obriši</Button>
              <Button onClick={()=>{navigate(`/radninalozi/${radninalog.sifra}`)}} >Promijeni</Button>
            </td>

           </tr>

          ))}
        </tbody>
      </Table>

    </Container>
    
    
);
}
