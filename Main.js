const express = require("express");
const http = require("http");
const mysql = require("mysql");
const app  = express();
const fs = require("fs");
const serverScoket = require("tmp/serversock/socket.sock");
// will have fun continuing the project my friend simon set out to make but cummed to hard at vlang to finish
const db = mysql(
    user = sql_user,
    password = sql_password,
    database = sql_db
);

db.Connect((err)=> {
    console.error("cannot connect to the database ");
    return;
});

app.post('/', (req, res)=>{
    events.handle_Bancho(req, res);
});

if (fs.existsSync(serverScoket)) {
    fs.unlink(serverScoket);
}

app.listen(serverScoket, () => 
    console.log(`server listening on ${serverScoket}`)
);
