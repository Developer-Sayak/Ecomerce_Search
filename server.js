const fs = require('fs');
const express = require('express') ;
const app = express();

app.get("/",(req,res)=>{
    res.send("Home Page");
})

app.get("/products",(req,res)=>{
if(req.query.category === 'cloths'){
  fs.readFile("products.json","utf-8",(err,data)=>{
    if(err)
     console.log("Cloths are not found");
    else{
     const products = JSON.parse(data);
     const cloths_products = products.filter(product => product.category === 'cloths');
     res.json(cloths_products);
    }
  })
}
else{
    fs.readFile("products.json","utf-8",(err,data)=>{
        if(err)
         console.log("404 Page Not Found");
        else{
         const products = JSON.parse(data);
         res.json(products);
        }
    })
}
})

app.get("/filterproducts",(req,res)=>{
   
    if(req.query.category === 'cloths' && req.query.price == 300){
        fs.readFile("products.json","utf-8",(err,data)=>{
            if(err)
             console.log("Cloths are not found at this price");
            else{
             const products = JSON.parse(data);
             const cloths_products_price = products.filter(product => product.category === 'cloths' && product.price >= 300 );
             res.json(cloths_products_price);
            }
    })
} 

})


app.listen(3001,(err)=>{
    if(err)
     console.log(err);
    else
     console.log("Server Started...");
})