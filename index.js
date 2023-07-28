require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const server = express();
const path = require('path');
const productRouter = require('./routes/product')
console.log('env',process.env.DB_PASSWORD)



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('database connected')
}




//bodyParser
server.use(express.json());
server.use(morgan('default'))
server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)));
server.use('/products', productRouter.router);
server.use('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'build','index.html'))
})



server.listen(process.env.PORT, () => {
  console.log('server started');
});