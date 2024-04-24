const express = require("express");

const app = express();
const port = 3000;

app.get('/api', (req, res) => {
    res.send({
        name: 'jasper'
    })
})

app.listen(port, () => {
    console.log("server listening to port:", port)
})