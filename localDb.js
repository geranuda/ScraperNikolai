var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

db.serialize(function() {
  // db.run("CREATE TABLE users (user TEXT, email TEXT)");

  // var stmt = db.prepare("INSERT INTO users VALUES (?, ?)");
  // for (var i = 0; i < 10; i++) {
  //     stmt.run(i, `email${i}@example.com`);
  // }
  // stmt.finalize();

  db.each("SELECT * FROM users WHERE user=1", function(err, row) {
      console.log(row);
  });
});

db.close();