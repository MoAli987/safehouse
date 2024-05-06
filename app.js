// const config = require("config");
const express = require("express");
const app = express();
var path = require('path')
app.use(express.json());
require('./src/db');
const routs = require("./src/routs/routs");
const http = require("http")
const cros = require("cors")

// const server=http.createServer(app)
// const io= require('socket.io')(server,{
//     cros:{

//     }
// })
app.use(cros({
    origin: "*",
    methods: ['GET', 'POST','DELETE','PUT','PATCH']
}))
// mention the routs 
app.use('/api/property', routs);
app.use('/api/user', routs);
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use('/images', express.static('upload/profile'));
app.use('/images', express.static('upload/property'));
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send(`Done to Done`);
})

app.listen(port, () => {
    console.log(`Done to Done ${port}`);
})