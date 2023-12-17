import express from 'express';
import mysql from 'mysql2';

const app = express();

// MySQL database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rpl',
});

// Check the database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.get('/', (req, res) => {
  // Perform a simple database query
  db.query('SELECT * FROM pc_profit', (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error executing query');
    } else {
      res.json(results);
    }
  });
});

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});
