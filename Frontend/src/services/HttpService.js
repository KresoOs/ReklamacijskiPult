
import axios from "axios";






 export const HttpService =  axios.create({

          baseURL: 'https://reklamacijski-001-site1.ftempurl.com/api/v1/',
          headers: {'content-type' : 'application/json'}


});

  