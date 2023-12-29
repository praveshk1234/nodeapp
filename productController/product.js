const axios = require('axios');

const findAll = async (req, res) => {
  const products = await resProducts();
  res.status(200).send(products);
};



const resProducts = function(){
  return "hello";
  // let config = {
  //   method: 'get',
  //   maxBodyLength: Infinity,
  //   url: 'https://testvishaldamein.myshopify.com/admin/api/2023-10/products.json',
  //   headers: { 
  //     'X-Shopify-Access-Token': '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'
  //   }
  // };
  
  // axios.request(config)
  // .then((response) => {

  //    return JSON.stringify(response.data);

  //  // console.log();
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
}