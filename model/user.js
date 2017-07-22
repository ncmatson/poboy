var db = require('../db')

function User(username, password) {
  this.id = 0;
  this.username = username
  this.password = password;
}


User.prototype.save = function (username, pass, callback) {
  console.log('tryna save '+username);

  // check to see if user is already there
  db.query("SELECT * FROM users WHERE username = $1::varchar", [username], function(err, result){
    // if somethin happened in this query we're screwed
    if (err) {
      console.log('preoops');
      console.log(err);
      return callback(err);
    }
    // if we gucci
    else {
      // if there were no were no body named that add'em
      if (result.rows.length == 0) {
        db.query("INSERT INTO users(username, password) VALUES ($1, $2)", [username, password], function(err, result) {
          if (err) {
            console.log('oops');
            console.log(err);
            return callback(err);
          }
          else {
            // now select to get the info
            db.query("SELECT * FROM users WHERE username = $1::varchar", [username], function(err, result){
              if (err){
                console.log('real wierd');
                console.log(err);
                return err;
              }
              else{
                var user = new User();
                user.username = result.rows[0]['username'];
                user.password = result.rows[0]['password'];
                user.id = result.rows[0]['id'];
                return callback(user.username);
              }
            });
          }
        });
      }
      else{
        console.log('that username already existed ('+username+')');
        return callback(null);
      }
    }
  });
};

// User.prototype.findOne = function (username, callback) {
//     //TODO THIS IS NOT GOING TO WORK, FIGURE OUT HOW TO GET DB INTO THIS PLACE
//     var client = this.connection;
//
//     var isNotAvailable = false; //we are assuming the username is taking
//
//     client.query("SELECT * FROM users WHERE username = $1::varchar", [username], function(err, result){
//         if(err){
//             return callback(err, isNotAvailable, this);
//         }
//         //if no rows were returned from query, then new user
//         if (result.rows.length > 0){
//             isNotAvailable = true; // update the user for return in callback
//             console.log(username + ' is am not available!');
//         }
//         else{
//             isNotAvailable = false;
//             console.log(username + ' is available');
//         }
//         //the callback has 3 parameters:
//         // parameter err: false if there is no error
//         // parameter isNotAvailable: whether the username is available or not
//         // parameter this: the User object;
//
//         client.end();
//         return callback(false, isNotAvailable, this);
//     });
// //});
// };

module.exports = User;
