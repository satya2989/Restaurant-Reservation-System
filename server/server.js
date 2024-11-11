
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors=require("cors")
const app = express();
const port = 5000;
 app.use(bodyParser.json()); 
app.use(cors({ origin: 'http://localhost:3000' }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'restro'
});
db.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});
app.post('/signup', (req, res) => {
  const { username, mobile, password } = req.body;
  console.log("request :", req.body);
  const query = `insert into users (user_name, MobileNo, password) VALUES ("${username}",${mobile},"${password}")`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(201).send('User registered');
  });
});
app.post('/login', (req, res) => {
  const { mobile,password} = req.body;
  console.log(req.body)
  const query = `SELECT user_id,password FROM users WHERE MobileNo =${mobile}`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Server error');
      return;
    }
    if (results.length === 0) {
      res.status(401).send('User not found');
      return;
    }
    const storedPasswordHash = results[0].password;
    const userid=results[0].user_id;
      if(password===storedPasswordHash)
        res.status(200).json({password :storedPasswordHash,user_id:userid});
      else
       res.status(401).send('Password incorrect')
  });
});
app.post('/restaurants', (req, res) => {
  const {location, rating ,sorting} = req.body;
  console.log(req.body);
  let c=0;
  if(sorting!="")
    c=1;
  let query = 'SELECT * FROM restaurant where';
  const queryParams = [];
  if (location) {
      query += '  restaurant_city = ?';
      queryParams.push(location);
  }
  if (rating) {
      query += ' AND restaurant_rating >= ?';
      queryParams.push(rating);
  }
  if(c)
  {
    if(sorting==="ASC"){
    query+= ' order by restaurant_rating ASC'
    }
    else{
      query+= ' order by restaurant_rating DESC '  
    }
  }

  console.log(query);
  db.query(query, queryParams, (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Database query failed' });
          return;
      }
      res.status(200).json(results);
  });
});
app.post('/booking', (req, res) => {
  const { restaurantId,usid,reservationTime} = req.body;
  console.log(req.body)
  const query = `INSERT INTO booking( user_id, restaurant_id, reservation_time) VALUES (${usid},${restaurantId},"${reservationTime}")`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).json(results);
  });
});
app.post('/reservationsdata', (req, res) => {
  const { usid} = req.body;
  console.log(req.body)
  if (!usid) {
    return res.status(400).send('User ID is required');
}
  const query = `SELECT 
    users.user_id, 
    users.user_name, 
    users.MobileNo,
    restaurant.restaurant_id,
    restaurant.restaurant_name, 
    restaurant.restaurant_city, 
    booking.reservation_time
    FROM 
    booking
    JOIN 
    users ON booking.user_id = users.user_id
    JOIN 
    restaurant ON booking.restaurant_id = restaurant.restaurant_id
    WHERE 
    users.user_id = ?
    ORDER BY 
    booking.reservation_time;`;
    db.query(query, [usid], (err, results) => {
      if (err) {
          console.error('Error querying the database:', err);
          res.status(500).send('Server error');
          return;
      }
      
      res.status(200).json(results);
  });
  });
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});