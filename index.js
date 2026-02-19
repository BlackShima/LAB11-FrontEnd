const express = require('express');
const bodyParser = require('body-parser');
const db = require('./Lab11_Resource/db');
const cors = require('cors');
const app = express();

app.use(cors());  // Allow Cross-Origin requests

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));  // Serve static files



// Get all students
app.get('/students', (req, res) => {
    const query = 'SELECT * FROM students';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching students:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);
        }
    });
});

// Add a new student
app.post('/students', (req, res) => {
    const { name, age, grade } = req.body;
    const query = 'INSERT INTO students (name, age, grade) VALUES (?, ?, ?)';
    db.query(query, [name, age, grade], (err, result) => {
        if (err) {
            console.error('Error adding student:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json({ message: 'Student added', studentId: result.insertId });
        }
    });
});

// Update a student's grade
app.put('/students/:id', (req, res) => {
    const studentId = req.params.id;
    const { grade } = req.body;
    const query = 'UPDATE students SET grade = ? WHERE id = ?';
    db.query(query, [grade, studentId], (err, result) => {
        if (err) {
            console.error('Error updating student:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json({ message: 'Student updated' });
        }
    });
});

// Delete a student
app.delete('/students/:id', (req, res) => {
    const studentId = req.params.id;
    const query = 'DELETE FROM students WHERE id = ?';
    db.query(query, [studentId], (err, result) => {
        if (err) {
            console.error('Error deleting student:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json({ message: 'Student deleted' });
        }
    });
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
