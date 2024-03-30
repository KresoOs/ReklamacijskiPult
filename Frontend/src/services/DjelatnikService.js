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

export default{
    get
}