const axios = require('axios');

exports.getProducts =(req,res) =>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://testvishaldamein.myshopify.com/admin/api/2023-10/products.json',
        headers: { 
          'X-Shopify-Access-Token': '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'
        }
      };
      
      axios.request(config)
      .then((response) => {
        res.send(response.data)
       // console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
};