var mysql = require('mysql');

var pool = mysql.createPool({
    "user": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,

});

exports.pool = pool;
