
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';

import DjelatnikService from '../../services/DjelatnikService';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RoutesNames } from '../../constants';







export default function Djelatnici(){

  const[djelatnici,setDjelatnici] = useState();

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

},[]

  );
    
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
          </tr>
        </thead>
        <tbody>
          {djelatnici && djelatnici.map((djelatnik,index)=>(

           <tr key={index}>
            <td>{djelatnik.ime}</td>
            <td>{djelatnik.prezime}</td>

           </tr>

          ))}
        </tbody>
      </Table>

    </Container>
    
    
);
}
