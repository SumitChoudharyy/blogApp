
const express = require("express");
const app = express();

require("dotenv").config();
const PORT = 3000;

// Middle Ware
app.use(express.json());

const blog = require("./routes/blog")
// Mount
app.use("/api/v1",blog);

// Connection with Database
const connectWithDb = require("./config/database");
connectWithDb();

// start the server
app.listen(PORT, ()=>{
    console.log(`App is Started at ${PORT}`);
})

// Default Routes
app.get("/",(req,res) =>{
    res.send(`<h1>This is My Home Page</h1>`);
})