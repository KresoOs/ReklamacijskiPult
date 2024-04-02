
import {naziv_proizvod } from "../constants";
import {HttpService} from "./HttpService";






async function get(){

    return await HttpService.get(naziv_proizvod)
    .then((odgovor)=>{

//console.table(odgovor.data);
return odgovor.data;

    })
    .catch((e)=>{

       // console.log(e);
       return e;
    })

}
async function post(proizvod){

    return await HttpService.post(naziv_proizvod,proizvod)
    .then((odgovor)=>{

//console.table(odgovor.data);
return { greska: false, poruka: odgovor.data};

    })
    .catch((e)=>{

       // console.log(e);
       return {greska: true, poruka: e };
    })

}
async function put(sifra,proizvod){

    return await HttpService.put(naziv_proizvod+'/'+sifra,proizvod)
    .then((odgovor)=>{

//console.table(odgovor.data);
return { greska: false, poruka: odgovor.data};

    })
    .catch((e)=>{

       // console.log(e);
       return {greska: true, poruka: e };
    })

}
async function _delete(sifraProizvoda){

    return await HttpService.delete(naziv_proizvod + '/'+sifraProizvoda)
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
    return await HttpService.get(naziv_proizvod+'/'+sifra)
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