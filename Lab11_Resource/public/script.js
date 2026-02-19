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
document.getElementById('addStudentForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const grade = document.getElementById('grade').value;

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age, grade })
    })
    .then(res => res.json())
    .then(() => {
        fetchStudents(); // Refresh the student list
        this.reset(); // Clear input fields
    })
    .catch(error => console.error('Error adding student:', error));
});

// Your task is to write function enableEdit(id) for the student's grade. 
// @param {number} id - The ID of the student to be updated 
// 1. Get the grade input and update button for the specific student
// 2. Check if input is enable then create a PUT request to update the student's grade 
function enableEdit(id) {
const gradeInput = document.getElementById(`grade-${id}`);
    const updateBtn = document.getElementById(`update-${id}`);

    // If the input is disabled, enable it and change button text to "Save"
    if (gradeInput.disabled) {
        gradeInput.disabled = false;
        gradeInput.focus();
        updateBtn.innerText = 'Save';
    } else {
        const newGrade = gradeInput.value;

        fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ grade: newGrade })
        })
        // Handle the response to check if the update was successful
        .then(res => {
            if (res.ok) {
                gradeInput.disabled = true;
                updateBtn.innerText = 'Update';
                alert('Grade updated!');
            } else {
                alert('Update failed (Check range 0-100)');
            }
        })
        .catch(error => console.error('Error updating grade:', error));
    }

}


// Fetch and display students when the page loads
window.onload = fetchStudents;
