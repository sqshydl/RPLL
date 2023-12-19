import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON requests

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

// Endpoint for inserting data into the database
app.post('/insert', (req, res) => {
  const { pcName, totalProfit, date, time } = req.body;

  // Perform the insertion query
  const sql = 'INSERT INTO pc_profit (pc_name, total_profit, Date, Time) VALUES (?, ?, ?, ?)';
  db.query(sql, [pcName, totalProfit, date, time], (error, results) => {
    if (error) {
      console.error('Error inserting data:', error.message);
      res.status(500).send('Error inserting data');
    } else {
      res.json({ message: 'Data inserted successfully', results });
    }
  });
});

// Example endpoint for fetching data
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
