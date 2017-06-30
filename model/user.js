function User(connection) {
  this.id = 0;
  this.email = "";
  this.password = "";

  this.connection = connection;
}

User.prototype.save = function (callback) {
  console.log('tryna save '+this.email);
  var client = this.connection

  // check to see if user is already there
  client.query("SELECT * FROM users WHERE email = $1::varchar", this.email, function(err, result){
    // if somethin happened in this query we're screwed
    if (err) {
      console.log(err);
      return err;
    }
    // if we gucci
    else {
      // if there were no were no body named that add'em
      if (result.rows.length == 0) {
        client.query("INSERT INTO users(email, password) VALUES ($1, $2)", [this.email, this.password], function(err, result) {
          if (err) {
            console.log(err);
            return err;
          }
          else {
            var user = new User();
            user.email = result.row[0]['email'];
            user.password = result.row[0]['password'];
            user.id = result.row[0]['id'];
            return callback(user);
          }
        });
      }
      else{
        console.log('that email already existed ('+this.email+')');
        return callback(null);
      }
    }
  });
};

User.prototype.findOne = function (email, callback) {
    //TODO THIS IS NOT GOING TO WORK, FIGURE OUT HOW TO GET DB INTO THIS PLACE
    var client = this.connection;

    var isNotAvailable = false; //we are assuming the email is taking

    client.query("SELECT * FROM users WHERE email = $1::varchar", [email], function(err, result){
        if(err){
            return callback(err, isNotAvailable, this);
        }
        //if no rows were returned from query, then new user
        if (result.rows.length > 0){
            isNotAvailable = true; // update the user for return in callback
            console.log(email + ' is am not available!');
        }
        else{
            isNotAvailable = false;
            console.log(email + ' is available');
        }
        //the callback has 3 parameters:
        // parameter err: false if there is no error
        // parameter isNotAvailable: whether the email is available or not
        // parameter this: the User object;

        client.end();
        return callback(false, isNotAvailable, this);
    });
//});
};
