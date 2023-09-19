const express= require('express');
const cors= require('cors');
const morgan= require('morgan');
const colors= require('colors')
const dotenv= require('dotenv');
const  connectDb = require('./configs/connectDb');
// config dotenv file
dotenv.config();

//database call
connectDb();

//rest object
const app=express();

// middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// user routes
app.use('/api/v1/users',require('./routes/userRoute'));

//transections routes
app.use('/api/v1/transections',require('./routes/transectionRoutes'));

// port
const PORT= 8080 || process.env.PORT;

//listen
app.listen(PORT,()=>{
    console.log("server running on port "+PORT);
});
