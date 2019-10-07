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
    // goods
    getGoodList: async (obj) => {
      let option = '';
      let sort = '';
      if(obj.data.name.length) {
        option+= ` name like '%${obj.data.name}%' and`;
      }
      if(obj.data.sort && obj.data.sort.key && obj.data.sort.order && obj.data.sort.order !== 'normal') {
        sort = `order by ${obj.data.sort.key} ${obj.data.sort.order}`;
      }
      let _sql = `select * from goods where${option} (deleted!=1 or deleted is null) ${sort} limit ${(obj.page.current-1)*obj.page.size},${obj.page.size};`
      let result = await allServices.query(_sql);
      let total = await allServices.query(`select count(*) from goods where${option} (deleted!=1 or deleted is null);`)
      return {
        list: result,
        page: {
          current: obj.page.current,
          size: obj.page.size,
          total: total[0]['count(*)']
        }
      }
    },
    getGoodNameList: (id) => {
      let _sql = `select id,name from goods where deleted!=1 or deleted is null`
      return allServices.query(_sql)
    },
    getGoodDetail: (id) => {
        let _sql = `select * from goods where id=${id};`
        return allServices.query(_sql)
    },
    addGood: (obj) => {
        let _sql = `insert into goods set name='${obj.name}',count=${obj.count},unit='${obj.unit}',remark='${obj.remark}';`
        return allServices.query(_sql, obj)
    },
    updateGood: (obj) => {
      let _sql = `update goods set name='${obj.name}',count=${obj.count},unit='${obj.unit}',remark='${obj.remark}' where id=${obj.id};`
      console.log(_sql)
      return allServices.query(_sql, obj)
    },
    deleteGood: (id) => {
      let _sql = `update goods set deleted=1 where id=${id};`
      console.log(_sql)
      return allServices.query(_sql)
    },
    // records
    import: (obj) => {
      let _sql = `insert into records set user_id='${obj.user_id}',good_id='${obj.good_id}',count=${obj.count},createdate='${obj.createdate}',remark='${obj.remark}';`
      return allServices.query(_sql, obj)
    },
    getRecordList: async (obj) => {
      let good = '';
      let user = '';
      let sort = '';
      if(obj.data.goodId) {
        good = ` a.good_id=${obj.data.goodId} and`;
      }
      if(obj.data.userId) {
        user = ` a.user_id=${obj.data.userId} and`;
      }
      if(obj.data.sort && obj.data.sort.key && obj.data.sort.order && obj.data.sort.order !== 'normal') {
        sort = `order by ${obj.data.sort.key} ${obj.data.sort.order}`;
      }
      let _sql = `select a.id,a.good_id,a.user_id,a.count,a.createdate,a.remark,b.name good_name,b.unit,c.name user_name from records a join goods b join users c on a.good_id=b.id and a.user_id=c.id where${good}${user} a.id>0 ${sort} limit ${(obj.page.current-1)*obj.page.size},${obj.page.size};`
      let result = await allServices.query(_sql);
      let total = await allServices.query(`select count(*) from records a join goods b join users c on a.good_id=b.id and a.user_id=c.id where${good}${user} a.id>0;`)
      return {
        list: result,
        page: {
          current: obj.page.current,
          size: obj.page.size,
          total: total[0]['count(*)']
        }
      }
    },
    getRecordDetail: (id) => {
      let _sql = `select a.id,a.good_id,a.user_id,a.count,a.createdate,a.remark,b.name good_name,b.unit,c.name user_name from records a join goods b join users c on a.good_id=b.id and a.user_id=c.id where a.id=${id};`
      return allServices.query(_sql)
    },

    // user
    login: (data) => {
      let _sql = `select * from users where name='${data.name}' and password=${data.password} and (deleted!=1 or deleted is null);`
      return allServices.query(_sql)
    },
    getUserNameList: (data) => {
      let _sql = `select id,name from users where deleted!=1 or deleted is null`
      return allServices.query(_sql)
    },
    getUserList: (data) => {
      let _sql = `select id,name,role,remark from users where deleted!=1 or deleted is null`
      return allServices.query(_sql)
    },
    getUserDetail: (id) => {
        let _sql = `select * from users where id=${id};`
        return allServices.query(_sql)
    },
    addUser: (obj) => {
        let _sql = `insert into users set name='${obj.name}',role=${obj.role},password=${obj.password},remark='${obj.remark}';`
        return allServices.query(_sql, obj)
    },
    updateUser: (obj) => {
      let _sql = `update users set name='${obj.name}',role=${obj.role},password=${obj.password},remark='${obj.remark}' where id=${obj.id};`
      return allServices.query(_sql, obj)
    },
    deleteUser: (id) => {
      let _sql = `update users set deleted=1 where id=${id};`
      return allServices.query(_sql)
    }
}

module.exports = allServices;