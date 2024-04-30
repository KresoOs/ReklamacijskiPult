
import {naziv_kupac } from "../constants";
import {HttpService} from "./HttpService";






async function get(){

    return await HttpService.get(naziv_kupac)
    .then((odgovor)=>{

//console.table(odgovor.data);
return odgovor.data;

    })
    .catch((e)=>{

       // console.log(e);
       return e;
    })

}
async function post(kupac){

    return await HttpService.post(naziv_kupac,kupac)
    .then((odgovor)=>{

//console.table(odgovor.data);
return { greska: false, poruka: odgovor.data};

    })
    .catch((e)=>{

       // console.log(e);
       return {greska: true, poruka: e };
    })

}
async function put(sifra,kupac){

    return await HttpService.put(naziv_kupac+'/'+sifra,kupac)
    .then((odgovor)=>{

//console.table(odgovor.data);
return { greska: false, poruka: odgovor.data};

    })
    .catch((e)=>{

       // console.log(e);
       return {greska: true, poruka: e };
    })

}
async function _delete(sifraKupca){

    return await HttpService.delete(naziv_kupac + '/'+sifraKupca)
    .then((odgovor)=>{

//console.table(odgovor.data);
return { greska: false, poruka: odgovor.data.poruka};

    })
    .catch((e)=>{

       // console.log(e);
       return {greska: true, poruka: e };
    })

}
async function getBySifra(sifra){
    return await HttpService.get(naziv_kupac+'/'+sifra)
    .then((o)=>{

        return {greska: false, poruka: o.data}
    })

    
    .catch((e)=>{
        return {greska: true,poruka: e}
    })

    
}


export default{
    get,
    put,
    post,
    _delete,
    getBySifra
    
}