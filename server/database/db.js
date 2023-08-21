import mongoose from "mongoose";

const DbConnection = async() =>{
    const MONGODB_URI = `mongodb://202003039prithvibhs:XyBj1Duy3E7RD7bt@ac-czd3fha-shard-00-00.eellkgj.mongodb.net:27017,ac-czd3fha-shard-00-01.eellkgj.mongodb.net:27017,ac-czd3fha-shard-00-02.eellkgj.mongodb.net:27017/?ssl=true&replicaSet=atlas-3xkree-shard-0&authSource=admin&retryWrites=true&w=majority`;

    try{
await mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
console.log("DB Connected succesfully ")
    }
    catch(error){
        console.error('Error while connecting with database',error.message);

    }
}

export default DbConnection;