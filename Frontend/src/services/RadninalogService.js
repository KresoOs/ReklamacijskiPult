
import {naziv_proizvod, naziv_radninalog } from "../constants";
import {HttpService} from "./HttpService";






async function get(){

    return await HttpService.get(naziv_radninalog)
    .then((odgovor)=>{

//console.table(odgovor.data);
return odgovor.data;

    })
    .catch((e)=>{

       // console.log(e);
       return e;
    })

}
async function post(radninalog){

    return await HttpService.post(naziv_radninalog,radninalog)
    .then((odgovor)=>{

//console.table(odgovor.data);
return { greska: false, poruka: odgovor.data};

    })
    .catch((e)=>{

       // console.log(e);
       return {greska: true, poruka: e };
    })

}
async function put(sifra,radninalog){

    return await HttpService.put(naziv_radninalog+'/'+sifra,radninalog)
    .then((odgovor)=>{

//console.table(odgovor.data);
return { greska: false, poruka: odgovor.data};

    })
    .catch((e)=>{

       // console.log(e);
       return {greska: true, poruka: e };
    })

}
async function _delete(sifraRadnognaloga){

    return await HttpService.delete(naziv_radninalog + '/'+sifraRadnognaloga)
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
    return await HttpService.get(naziv_radninalog+'/'+sifra)
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