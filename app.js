const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const database = require("./config/database.config");
const apiRouter = require("./routers/Index.router");

const app = express();

database.connect();
//logger de las requests
app.use(logger('dev'));

app.use(cors({ origin: 'http://localhost:5173' }));

//Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Enrutador de rutas estaticas
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", apiRouter);
module.exports = app;