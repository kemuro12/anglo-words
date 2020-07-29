const axios = require('axios');
const express = require('express');
const app = express();

app.get("/",(req,res) => {
    res.sendfile("index.html");
})

app.listen(3000, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${3000}`)
    axios.get("http://localhost:4040/",{withCredentials: true})
        .then(res => {
            console.log(res.data);
        })
})

