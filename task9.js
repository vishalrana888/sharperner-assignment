document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the form from submitting and refreshing the page

    // Get user input
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    // Create an object with user details
    var userDetails = {
      username: username,
      email: email,
      phone: phone
    };

    // Retrieve existing user data from local storage (if any)
    var existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Add new user details to the existing array
    existingUsers.push(userDetails);

    // Store the updated user details array in local storage
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    displayAllUserDetails(); // Display all user details
    alert('User details stored successfully!');
  });

  // Function to display all user details
  function displayAllUserDetails() {
    var displayDiv = document.getElementById('userDetailsDisplay');
    var allUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Clear the display before updating with new details
    displayDiv.innerHTML = '';

    if (allUsers.length > 0) {
      allUsers.forEach(function(userDetails) {
        var userDiv = document.createElement('div');
        userDiv.innerHTML = `
          <h2>User Details:</h2>
          <p>Username: ${userDetails.username}</p>
          <p>Email: ${userDetails.email}</p>
          <p>Phone: ${userDetails.phone}</p>
          <hr>
        `;
        displayDiv.appendChild(userDiv);
      });
    } else {
      displayDiv.innerHTML = '<p>No user details found.</p>';
    }
  }

  // Display all user details on page load
  displayAllUserDetails();