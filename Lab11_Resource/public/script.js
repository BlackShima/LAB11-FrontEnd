// Base URL for API requests
const API_URL = 'http://localhost:3000/students';

/**
 * Fetch and display all students
 */
function fetchStudents() {
    // Send a GET request to retrieve all students
    fetch(API_URL)
        .then(res => res.json()) // Parse the response as JSON
        .then(data => {
            // Get the table body element
            const tbody = document.getElementById('studentTableBody');
            tbody.innerHTML = ''; // Clear existing rows

            // Loop through each student and create table rows
            data.forEach(student => {
                tbody.innerHTML += `
                    <tr id="student-${student.id}">
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.age}</td>
                        <td>
                            <input type="number" step="0.1" id="grade-${student.id}" value="${student.grade}" disabled>
                        </td>
                        <td>
                            <!-- Update and Delete buttons -->
                            <button onclick="enableEdit(${student.id})" id="update-${student.id}">Update</button>
                            <button onclick="deleteStudent(${student.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Error fetching students:', error));
}


/**
 * Delete a student by ID
 * @param {number} id - The ID of the student to be deleted
 */
function deleteStudent(id) {
    // Create a DELETE request to remove the student by ID
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        // Refresh the student list after deletion
        fetchStudents();
    })
    .catch(error => console.error('Error deleting student:', error));
}


 //  Your task is to write event listener for the Add Student form submission
 // 1. Prevent the default form submission 
 // 2. Get input values from the form
 // 3. Create a POST request to add a new student and Refresh the student list after adding a new student
 // 4. Clear input fields after submission


// Your task is to write function enableEdit(id) for the student's grade. 
// @param {number} id - The ID of the student to be updated 
// 1. Get the grade input and update button for the specific student
// 2. Check if input is enable then create a PUT request to update the student's grade 
function enableEdit(id) {




}


// Fetch and display students when the page loads
window.onload = fetchStudents;
