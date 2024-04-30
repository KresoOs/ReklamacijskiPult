import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusService from "../../services/StatusService";

export default function Statusi(){

const[Statusi,setStatusi]=useState();
const navigate = useNavigate();
async function dohvatiStatuse(){
    await StatusService.get()
    .then((odg=>{
        setStatusi(odg);
    }))
    .catch((e=>{
        console.log(e);
    }));
}
useEffect(()=>{
    dohvatiStatuse();
},[]);

async function obrisiAsync(sifra){
    const odgovor = await StatusService._delete(sifra);
    if(odgovor.greska){
        console.log(odgovor.poruka);
        alert('Pogledaj konzolu');
        return;
    }
    dohvatiStatuse();
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
          {Statusi && Statusi.map((Status,index)=>(

           <tr key={index}>
            <td>{Stanje.naziv}</td>
            
            <td>
              <Button onClick={()=>obrisi(stanje.sifra)}variant='danger'>Obriši</Button>
              <Button onClick={()=>{navigate(`/radninalozi/${radninalog.sifra}`)}} >Promijeni</Button>
            </td>

           </tr>

          ))}
        </tbody>
      </Table>

    </Container>
    
    
);
}






}