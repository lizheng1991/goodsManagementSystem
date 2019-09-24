var mysql = require('mysql');
var config = require('./defaultConfig');

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let allServices = {
    query: function (sql, values) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })
    },
    getGoodDetail: function (id) {
        let _sql = `select * from goods where id="${id}";`
        return allServices.query(_sql)
    },
    add: (obj) => {
        let _sql = `insert into goods set name=${obj.name},count=${obj.count},unit=${obj.unit},remark=${obj.remark};`
        return allServices.query(_sql, obj)
    },
}

module.exports = allServices;