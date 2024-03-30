
import axios from "axios";






 export const HttpService =  axios.create({

          baseURL: 'https://kresimir-001-site1.jtempurl.com/api/v1',
          headers: {'content-type' : 'application/json'}


});

  