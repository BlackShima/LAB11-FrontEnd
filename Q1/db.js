const mysql = require('mysql2');

//connect to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'student',
    password: 'student123',
    database: 'school_db'
});

// Create the "students" table if it doesn't exist
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS students (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            age INT CHECK (age BETWEEN 18 AND 30),
            grade FLOAT CHECK (grade BETWEEN 0 AND 100)
        );
    `;
    db.query(createTableQuery, (err, result) => {
        if (err) console.error('Error creating table:', err);
        else console.log('Table "students" is ready.');
    });
});

module.exports = db;