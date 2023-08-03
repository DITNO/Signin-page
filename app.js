const express = require('express');
const app = express();

// Set up the static files middleware
app.use(express.static(__dirname));

// Parse JSON request bodies
app.use(express.json());

// Create a new SQLite database and table
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('users.db');

db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, username TEXT, password TEXT, education TEXT, city TEXT, country TEXT, phone TEXT, pincode TEXT)');

// Route to handle login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Route to handle education form submissions
app.post('/education', (req, res) => {
    const { email, username, password, education, city, country, phone, pincode } = req.body;
  
    // Perform education form submission(store the data in the database)
    db.run('INSERT INTO users (email, username, password, education, city, country, phone, pincode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [email, username, password, education, city, country, phone, pincode],
      function (err) {
        if (err) {
          console.error('Error storing data in the database:', err);
          res.status(500).json({ message: 'Error storing data in the database' });
        } else {
          res.json({ message: 'Education form submission successful!' });
        }
      }
    );
  });
  


// Route to save user data from Google Sign-In
app.post('/save_user_data', (req, res) => {
    const { email, username, imageUrl } = req.body;
  
    // Perform logic to save the user data to the 'users' table in the database
    db.run(
      'INSERT INTO users (email, username, imageUrl) VALUES (?, ?, ?)',
      [email, username, imageUrl],
      function (err) {
        if (err) {
          console.error('Error saving user data to the database:', err);
          res.status(500).json({ message: 'Error saving user data to the database' });
        } else {
          res.json({ message: 'User data saved successfully' });
        }
      }
    );
  });

// Route to fetch all user data
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('Error fetching user data from the database:', err);
      res.status(500).json({ message: 'Error fetching user data from the database' });
    } else {
      // Debug log: Check if you are retrieving the data from the database
      console.log('Fetched data:', rows);

      res.json(rows);
    }
  });
});



// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
