module.exports = {
  init: function(pool){
    pool.query('DROP TABLE IF EXISTS devices', function(err) {
      if(err){
        console.log(err.message);
        return;
      }
      console.log('dropped');
      pool.query('CREATE TABLE devices (ID SERIAL PRIMARY KEY, name VARCHAR(40), status BOOLEAN)', function (err) {
      console.log('created');
        if (err) {
          console.log(err.message);
          return;
        }
      });
    });
  }
};
