document.getElementById('userForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevents the form from submitting and refreshing the page

  // Get user input
  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;

  // Create an object with user details
  var userDetails = {
    username: username,
    email: email
  };

  // Store user details in local storage
  localStorage.setItem('user', JSON.stringify(userDetails));
  
  alert('User details stored successfully!');
});