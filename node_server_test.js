const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const nsq = require ( './' )();
const fs = require('fs');
const ws = fs.createWriteStream('./excel.xlsx')
//const ws = require('stream').Writable
//var MemoryStream = require('memory-stream');
//var cloneable = require('cloneable-readable')
//var ws = new MemoryStream();
//ws.on('pipe', function (data) { console.log('s1') })
//const nsq = require ( 'node-sql-query' )()

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//var http = require('http');
//var base64 = require('base64-stream');
const B64 = require('b64');
const encoder = new B64.Encoder();
//const stream = require ('stream')
//, writeableStream = new stream.Writable()
//writeableStream.end('juan')
//writeableStream.write('juan')
/*
var img = 'http://atlantic.tatseguros.com/tarificador/development/assets/img/logo.jpg';
*/
app.post('/dbq',function(req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    const params = JSON.parse(req.body.params)
    nsq.dbq ( params , function(respuesta){
        if ( ! respuesta ) respuesta = {}
        res.end(JSON.stringify(respuesta))
    } )
})
app.post('/request',function(req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    const sqlSyntax = req.body.sqlSyntax
    const connConfig = JSON.parse(req.body.connConfig)
    nsq.request ( sqlSyntax, connConfig , function(respuesta){
        if ( ! respuesta ) respuesta = {}
        res.end(JSON.stringify(respuesta))
    } )
})

app.listen(8500, function () {
    console.log('Node Server for node-sql-query is listening on port 8500!')
})

  