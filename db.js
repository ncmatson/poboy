var pg   = require('pg');
var pool = new pg.Pool();
console.log('making a new pool');

module.exports = {
  init: function(){
    pool.query('DROP TABLE IF EXISTS devices', function(err) {
      if(err){
        console.log(err.message);
        return;
      }
      console.log('dropped');
      pool.query('CREATE TABLE devices (ID SERIAL PRIMARY KEY, name VARCHAR(40), status BOOLEAN)', function (err) {
        if (err) {
          console.log(err.message);
          return;
        }
        console.log('created');
      });
    });

    pool.query('DROP TABLE IF EXISTS users', function(err) {
      if(err){
        console.log(err.message);
        return;
      }
      console.log('dropped users');
      pool.query('CREATE TABLE users (u_id SERIAL PRIMARY KEY, email VARCHAR(40), password VARCHAR(40))', function(err) {
        if (err) {
          console.log(err.message);
          return;
        }
        console.log('created');
      })
    });
  },

  query: function(text, values, callback) {
    return pool.query(text, values, callback);
  }
};
