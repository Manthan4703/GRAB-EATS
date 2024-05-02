// backend/index.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const mongoDB = require("./db");
const path=require("path");
mongoDB();

// Middleware
app.use(express.json());
const_dirname=path.dirname("")
const buildpath = path.join(__dirname,"./build")
app.use(express.static(buildpath));

// CORS
app.use(cors());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000"),
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    next();
});

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!!!!');
});

// User Routes
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
