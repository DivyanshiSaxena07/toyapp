import express from 'express';
import categoryRouter from './routes/category.route.js';
import productRouter from './routes/product.route.js';
import userRouter from './routes/user.route.js';
import adminRouter from './routes/admin.route.js';
import path from 'path';
import {fileURLToPath} from 'url';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import cartRouter from './routes/cart.route.js';
const app = express();

app.set("view engine","ejs");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname,'public');
app.use(express.static(publicPath));
app.use(session({secret: 'dadereccvdreeer'}));

// http://loalhost:3000/category/list --> GET
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://divyanshi:root@cluster.1wtwgej.mongodb.net/shoeApp?retryWrites=true&w=majority',err=>{
    if(err)
     console.log(err);
    else{
        console.log("mongo atlas connected....");
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        
        app.use("/",adminRouter);
          
        app.use("/category",categoryRouter);
        app.use("/product",productRouter);
        app.use("/user",userRouter);
        app.use("/admin",adminRouter);
        app.use("/cart",cartRouter);
        app.listen(5000,()=>{
            console.log("server started....");
        });
    } 
});
