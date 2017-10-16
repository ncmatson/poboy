var pg   = require('pg');

var pool = new pg.Pool();

// just for debug...
console.log('making a new pool');

module.exports = {
  
  // called at app start up
  init: function(){
    pool.query('DROP TABLE IF EXISTS devices', function(err) {
      if(err){
        console.log(err.message);
        return;
      }
      console.log('dropped device table');
      pool.query('CREATE TABLE devices (ID SERIAL PRIMARY KEY, username VARCHAR(40), devicename VARCHAR(40), status BOOLEAN)', function (err) {
        if (err) {
          console.log(err.message);
          return;
        }
        console.log('created device table');
      });
    });

    pool.query('DROP TABLE IF EXISTS users', function(err) {
      if(err){
        console.log(err.message);
        return;
      }
      console.log('dropped user table');
      pool.query('CREATE TABLE users (u_id SERIAL PRIMARY KEY, username VARCHAR(40), password VARCHAR(40))', function(err) {
        if (err) {
          console.log(err.message);
          return;
        }
        console.log('created user table');
      })
    });
  },

  // helper function
  query: function(text, values, callback) {
    return pool.query(text, values, callback);
  }

};
