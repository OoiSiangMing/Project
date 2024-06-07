// Reference to the Realtime Database
var database = firebase.database();

// Function to write user data to the database
function writeUserData(userId, name, email, password) {
  database.ref('users/' + userId).set({
    username: name,
    email: email,
    password: password
  });
}

// Event listener for form submission
document.getElementById('signUpForm').addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the form from submitting normally

  // Retrieve values from input fields
  var username = document.getElementById('signUpUsername').value;
  var email = document.getElementById('signUpEmail').value;
  var password = document.getElementById('signUpPassword').value;
  
  // Generate a unique user ID
  const userId = database.ref().child('users').push().key;

  // Save the user data to the database
  writeUserData(userId, username, email, password);

  // Optional: Clear the form after submission
  document.getElementById('signUpForm').reset();
  
  alert('User data saved successfully!');
});
