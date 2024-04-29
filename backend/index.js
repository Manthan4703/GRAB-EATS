// backend/index.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const mongoDB = require("./db");
mongoDB();

// Middleware
app.use(express.json());

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
