
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';


import { Button,  Dropdown,  Table } from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
import { RoutesNames } from '../../constants';

import RadninalogService from '../../services/RadninalogService';



export default function Radninalozi(){

  const[Radninalozi,setRadninalozi] = useState();
  const navigate = useNavigate();
  const[Stanja,setStanja] = useState();
 

  async function dohvatiRadnenaloge(){
    await RadninalogService.get()
    .then((odg)=>{


      setRadninalozi(odg);

    })
    .catch((e=>{

      console.log(e);

    }));
  }
  async function getStanja(){

    return await RadninalogService.getStanje()
    .then((odgovor)=>{
  
    
     setStanja(odgovor);
  
    })
    .catch((e)=>{
  
       // console.log(e);
       return e;
    })
   
  
  }
  useEffect(()=>{

    dohvatiRadnenaloge();
    getStanja();
   
    }

,[]);

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
async function statusProm(sifra, statusSifra) {
  const odgovor = await RadninalogService.statusProm(sifra, statusSifra);
  if (odgovor.greska) {
    console.log(odgovor.poruka);
    alert('Pogledaj konzolu');
    return;
  }
  dohvatiRadnenaloge();
}



return(
    
    <Container>
     <Link to={RoutesNames.RADNINALOG_NOVI}>Dodaj</Link>
    
      <Table striped bordered hover responsive>
      
        <thead>
          <tr>
            <th>
              Proizvod
            </th>
            <th>
              Kupac
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
              <Dropdown>
                  <Dropdown.Toggle variant='secondary'>
                    Promijeni Status
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {Stanja &&
                      Stanja.map((stanje, index) => (
                        <Dropdown.Item key={index} onClick={() => statusProm(radninalog.sifra, stanje.sifra)}>
                          {stanje.naziv}
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
             </td>
             



           </tr>

          ))}
        </tbody>
      </Table>

    </Container>
    
    
);
}
