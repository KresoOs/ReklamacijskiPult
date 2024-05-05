
import {naziv_djelatnik } from "../constants";
import {HttpService} from "./HttpService";






async function get(){

    return await HttpService.get(naziv_djelatnik)
    .then((odgovor)=>{

//console.table(odgovor.data);
return odgovor.data;

    })
    .catch((e)=>{

       // console.log(e);
       return e;
    })

}
async function post(djelatnik){

    return await HttpService.post(naziv_djelatnik,djelatnik)
    .then((odgovor)=>{

//console.table(odgovor.data);
return { greska: false, poruka: odgovor.data};

    })
    .catch((e)=>{

       // console.log(e);
       return {greska: true, poruka: e };
    })

}
async function put(sifra,djelatnik){

    return await HttpService.put(naziv_djelatnik+'/'+sifra,djelatnik)
    .then((odgovor)=>{

//console.table(odgovor.data);
            return { greska: false, poruka: odgovor.data};

    })
    .catch((e)=>{

       // console.log(e);
       return {greska: true, poruka: e };
    })

}
async function _delete(sifraDjelatnika){

    return await HttpService.delete(naziv_djelatnik + '/'+sifraDjelatnika)
    .then((odgovor)=>{

//console.table(odgovor.data);
return { greska: false, poruka: odgovor.data};

    })
    .catch((e)=>{

       // console.log(e);
       return {greska: true, data: e };
    })

}
async function getBySifra(sifra){
    return await HttpService.get(naziv_djelatnik+'/'+sifra)
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