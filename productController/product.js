const axios = require('axios');

exports.findAll = async (req, res) => {
 fetchdata.then((data)=>{
  res.render('index',{ title: 'Hey',name:data['products']});
  });
  
};
 
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://testvishaldamein.myshopify.com/admin/api/2023-10/products.json',
    headers: { 
      'X-Shopify-Access-Token': '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'
    }
  };
  
 const fetchdata = axios.request(config)
  .then((response) => {

   return  response.data;

  })
  .catch((error) => {
    console.log(error);
  });
