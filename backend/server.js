import express from 'express';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRouter from './routes/orderRouter';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl || 'mongodb+srv://dbUser:dbUser123@cluster0.nrpsz.mongodb.net/webshopping?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
// .then(ok=>{
//     console.log("Connect successfully");
// }).catch(error => console.log(error.reason




app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use('/api/orders', orderRouter);
app.use('/api/config/paypal', (req, res) => {
    res.send(config.PAYPAL_CLIENT_ID || 'sb');
})
app.get('/', (req, res) => {
    res.send('Server is ready');
});
app.listen(5000, ()=>{ console.log("Server started at http://localhost:5000")})