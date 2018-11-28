var mysql = require('mysql');

// thưc thi các query select database
exports.load = function(sql) {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection({
            host: 'us-cdbr-iron-east-01.cleardb.net',
            port: '3306',
            user: 'b040b2285b2dc9',
            password:'cf471508',
            database:'heroku_95b14113ec6af48'
        });

        connection.query(sql, (error, results, fields) => {
            if (error)
                reject(error);
            else resolve(results);

            connection.end();
        });
    });
}

//thưc thi các query insert,update,delete database
exports.write = function(sql) {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection({
            host: 'us-cdbr-iron-east-01.cleardb.net',
            port: '3306',
            user: 'b040b2285b2dc9',
            password:'cf471508',
            database:'heroku_95b14113ec6af48'
        });

        connection.connect();

        connection.query(sql, (error, value) => {
            if (error)
                reject(error);
            else resolve(value);

            connection.end();
        });
    });
}