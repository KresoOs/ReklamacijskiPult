
import {naziv_stanje } from "../constants";
import {HttpService} from "./HttpService";






async function get(){

    return await HttpService.get(naziv_stanje)
    .then((odgovor)=>{

//console.table(odgovor.data);
return odgovor.data;

    })
    .catch((e)=>{

       // console.log(e);
       return e;
    })

}
async function post(stanje){

    return await HttpService.post(naziv_stanje,stanje)
    .then((odgovor)=>{

//console.table(odgovor.data);
return { greska: false, poruka: odgovor.data};

    })
    .catch((e)=>{

       // console.log(e);
       return {greska: true, poruka: e };
    })

}
async function put(sifra,stanje){

    return await HttpService.put(naziv_stanje+'/'+sifra,stanje)
    .then((odgovor)=>{

//console.table(odgovor.data);
return { greska: false, poruka: odgovor.data};

    })
    .catch((e)=>{

       // console.log(e);
       return {greska: true, poruka: e };
    })

}
async function _delete(sifraStanja){

    return await HttpService.delete(naziv_stanje + '/'+sifraStanja)
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
    return await HttpService.get(naziv_stanje+'/'+sifra)
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