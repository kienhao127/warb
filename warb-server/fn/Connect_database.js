var mysql = require('mysql');

// thưc thi các query select database
exports.load = function(sql) {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: '',
            database: 'db_wrab'
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
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: '',
            database: 'db_wrab'
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