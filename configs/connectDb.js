const mongoose= require('mongoose');
const colors= require('colors');
mongoose.set('strictQuery', true)
const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true});
        console.log("connect successfully on"+`${mongoose.connection.host}`.bgGreen)

    }catch(error){
        
        console.log(`${error}`.bgRed);
    }
}

module.exports=connectDb;