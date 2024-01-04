const axios = require('axios');

exports.findAll =  (req, res) => {

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

   //return  response.data;
   res.render('index',{ title: 'Hey',data:response.data});
  })
  .catch((error) => {
    console.log(error);
  });

  
};

exports.getSingleProduct = async (req,res) =>{
  try{
let {id} = req.params;
let productid = id.split('=')[1]


let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://testvishaldamein.myshopify.com/admin/api/2023-10/products/'+productid+'.json',
  headers: { 
    'X-Shopify-Access-Token': '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'
  }
};

const response=await axios.request(config)

res.render('product',{ data:response.data});
}
 catch (error) {
  console.error(error);
  // Handle the error by sending an error response to the client or other appropriate actions.
  res.status(500).send('Internal Server Error');
}

}


