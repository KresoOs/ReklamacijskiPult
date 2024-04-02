
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';

import DjelatnikService from '../../services/DjelatnikService';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';







export default function Djelatnici(){

  const[djelatnici,setDjelatnici] = useState();
  const navigate = useNavigate();

  async function dohvatiDjelatnike(){
    await DjelatnikService.get()
    .then((odg)=>{


      setDjelatnici(odg);

    })
    .catch((e=>{

      console.log(e);

    }));
  }
  useEffect(()=>{

    dohvatiDjelatnike();

},[]);

async function obrisiAsync(sifra){
  const odgovor = await DjelatnikService._delete(sifra);
  if(odgovor.greska){
      console.log(odgovor.poruka);
      alert('Pogledaj konzolu');
      return;
  }
  dohvatiDjelatnike();
}

function obrisi(sifra){
  
  obrisiAsync(sifra);


}



    
return(
    
    <Container>
     <Link to={RoutesNames.DJELATNIK_NOVI}>Dodaj</Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              Ime
            </th>
            <th>
              Prezime
            </th>
            <th>
              Akcija
            </th>

          </tr>
        </thead>
        <tbody>
          {djelatnici && djelatnici.map((djelatnik,index)=>(

           <tr key={index}>
            <td>{djelatnik.ime}</td>
            <td>{djelatnik.prezime}</td>
            <td>
              <Button onClick={()=>obrisi(djelatnik.sifra)}variant='danger'>Obriši</Button>
              <Button onClick={()=>{navigate(`/djelatnici/${djelatnik.sifra}`)}} >Promijeni</Button>
            </td>

           </tr>

          ))}
        </tbody>
      </Table>

    </Container>
    
    
);
}
