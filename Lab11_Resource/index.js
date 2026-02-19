const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const cors = require('cors');
const app = express();

app.use(cors());  // Allow Cross-Origin requests

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));  // Serve static files



// Get all students


// Add a new student


// Update a student's grade


// Delete a student


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
