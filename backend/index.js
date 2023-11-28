const express=require('express');
const { connection } = require('./config/db');
const {UserRouter}=require("./routers/User.Router");
const {CategoryRouter}=require("./routers/Category.Router")
const errorMiddleware=require("./middlewares/Error");
const { productRouter } = require('./routers/Product.Router');
const { OrderRouter } = require('./routers/Order.Router');
const app=express();
const cors=require("cors");
const { CartRouter } = require('./routers/Cart.Router');
const { PaymentRouter } = require('./routers/Payment.Router');


process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log("shutting down server due to Uncaught Exception");
    process.exit(1);
})
// app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use('/api/v1',UserRouter);
app.use('/api/v1',CategoryRouter);
app.use('/api/v1',productRouter);
app.use('/api/v1',CartRouter);
app.use('/api/v1',OrderRouter);
app.use('/api/v1',PaymentRouter);





app.use(errorMiddleware)

const server=app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("db is connected")
    } catch (error) {
        console.log("db is not connected",error)
    }
    console.log(`http://localhost:${process.env.port}`)
})

process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`)
    console.log("shutting down server due to unhandled promise rejection")

    server.close(()=>{
        process.exit(1)
    })
})