const axios = require('axios');




exports.getProducts=(req,res)=> {


    
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://parveshkverma01.myshopify.com//admin/api/2023-10/products.json',
        headers: { 
          'X-Shopify-Access-Token': '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'
        }
      };
      
      axios.request(config)
      .then((response) => {
        res.status(200).json({status:"success",message:response.data})
       // console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      
}