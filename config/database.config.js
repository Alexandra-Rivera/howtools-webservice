const Mongoose = require('mongoose');
const debug = require('debug')('app:database');

// const dbhost = process.env.DBHOST || 'localhost';
// const dbport = process.env.DBPORT || '27020';
// const dbname = process.env.DBNAME || 'howtools-database';

// const dburi = process.env.DBBURI || `mongodb://${dbhost}:${dbport}/${dbname}`; //Esto lo vamos a cambiar por una cadena de conexion en mongo atlas 

const dburi = process.env.DBBURI; 

const connect = async () => {
    try {
        await Mongoose.connect(dburi);
        debug("Connection to database started");
    } catch (error) {
        console.error(error);
        debug("Cannot connect to database");
        process.exit(1);
    }
}

const disconnect = async () => {
    try {
        await Mongoose.disconnect();
        debug("Connection to database end");
    } catch (error) {
        process.exit(1);
    }
}

module.exports = {
    connect, 
    disconnect
}