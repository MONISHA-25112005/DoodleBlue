const mongoose =require('mongoose');

const connectDB= async() =>{
    const MONGODB_URL= process.env.MONGODB_URL;


if(!MONGODB_URL){
    console.error(`Error: NO MONGO_URL  is defined in your environment(.env)`);
    process.exit(1);
}

  try{
    await mongoose.connect(MONGODB_URL);
    console.log(`Connected to MongoDB Successfully`);
     }catch(err){
    console.error(`Failed to connect to MongoDB:`,err.message);
    process.exit(1);
    }
};
 module.exports= connectDB;
