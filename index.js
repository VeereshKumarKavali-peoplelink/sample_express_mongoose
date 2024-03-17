const express =  require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());    
app.use(bodyParser.urlencoded({extended: true}));


const contact = require("./routes/contact.js");
app.use("/api", contact);

// /api/contact get 


//connection from mongoose to mongoDB
const connectToDB = async ()=> {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/mydatabase" 
        // , {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     autoIndex: true,
        //    //useCreateIndex: true
        // }
        );

    }catch (error){
        console.log(error.message);
        process.exit(1);
    }
}

connectToDB();


app.listen(3000, ()=> console.log("Server running on port 3000"));