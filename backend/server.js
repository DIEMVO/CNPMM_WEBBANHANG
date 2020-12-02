import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'; // bosyparser is a middleware for express that provide data that user enter in the post req into node app
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';

dotenv.config();
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(ok=>{
    console.log("Connect successfully");
}).catch(error => console.log(error.reason));

const app = express();

app.use(bodyParser.json()); //to read data
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
// app.get("/api/products/:id", (req,res) =>{
//     const productId = req.params.id;
//     const product = data.products.find(x=> x._id === productId);
//     if (product)
//         res.send(product);
//     else
//         res.status(404).send({msg: "Product not found!"})
// });
// app.get("/api/products",(req,res)=>{
//     res.send(data.products);
// });
app.listen(5000, ()=>{ console.log("Server started at http://localhost:5000")})