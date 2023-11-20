document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Get user input
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;

    // Create an object with user details
    var userDetails = {
      username: username,
      email: email
    };

    // Get existing user data from local storage (if any)
    var storedUserDetails = JSON.parse(localStorage.getItem('user')) || {};

    // Merge new user details with existing data (if any)
    var updatedUserDetails = { ...storedUserDetails, ...userDetails };

    // Store updated user details in local storage
    localStorage.setItem('user', JSON.stringify(updatedUserDetails));
    
    alert('User details stored successfully!');
  });