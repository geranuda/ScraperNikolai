var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

const localDb = {
  init: function(){
    db.serialize(function() {
      db.run("CREATE TABLE users (firstName TEXT,lastName TEXT,propertyAddress TEXT,PhoneNumber TEXT,maxOffer TEXT)");
    });
    
  },

  insert: function(userData){

    db.serialize(function() {
      var stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?, ?, ?)");
      // loop over userData object entries and insert into db
      stmt.run(userData.firstName, userData.lastName, userData.propertyName, userData.phoneNumber, userData.maxOffer);

      stmt.finalize();
    });
    
    
  },

  getUsers: async function(){
    return new Promise((resolve, reject) => {
      let users = [];
  
      // get all users from db and resolve promise
      db.serialize(function() {
        db.each("SELECT * FROM users", function(err, row) {
          users.push(row);
        }, function() {
          resolve(users);
        });
      });
      
      // db.close();
      // console.log("Users are: ",users);
      // return users;
    });
  }
}

//localDb.init();
// localDb.insert({firstName: "Junaid",lastName: "Anwar",propertyAddress: "Pakistan",PhoneNumber: "30123032",maxOffer: "100000"});

//localDb.getUsers().then(users => console.log("resolved users ",users));

module.exports = localDb;