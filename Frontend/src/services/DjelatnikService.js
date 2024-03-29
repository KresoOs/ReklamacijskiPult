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

export default{
    get,
    post
}