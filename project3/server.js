const express = require('express');
const port = 9000;
const path = require('path');

const server = express();

server.use(express.urlencoded());
server.set("view engine","ejs");

server.use("/",express.static(path.join(__dirname,"public")));

server.get('/', (req, res) => {
    res.render('index');
});

server.get('/charts', (req, res) => {
    res.render('charts');
});

server.get('/widgets', (req, res) => {
    res.render('widgets');
});

server.get('/tables', (req, res) => {
    res.render('tables');
});

server.get('/grid', (req, res) => {
    res.render('grid');
});

server.get('/form-basic', (req, res) => {
    res.render('form-basic');
});

server.get('/form-wizard', (req, res) => {
    res.render('form-wizard');
});

server.get('/icon-fontawesome', (req, res) => {
    res.render('icon-fontawesome');
});

server.get('/authentication-login', (req, res) => {
    res.render('authentication-login');
});

server.get('/authentication-register', (req, res) => {
    res.render('authentication-register');
});

server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});










