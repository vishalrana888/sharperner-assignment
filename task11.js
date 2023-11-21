document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    var userDetails = {
      username: username,
      email: email,
      phone: phone
    };

    var existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    existingUsers.push(userDetails);

    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    displayAllUserDetails();
    alert('User details stored successfully!');
  });

  function displayAllUserDetails() {
    var displayDiv = document.getElementById('userDetailsDisplay');
    var allUsers = JSON.parse(localStorage.getItem('users')) || [];

    displayDiv.innerHTML = '';

    if (allUsers.length > 0) {
      allUsers.forEach(function(userDetails, index) {
        var userDiv = document.createElement('div');
        userDiv.innerHTML = `
          <h2>User Details:</h2>
          <p>Username: ${userDetails.username}</p>
          <p>Email: ${userDetails.email}</p>
          <p>Phone: ${userDetails.phone}</p>
          <button onclick="editUser(${index})">Edit</button>
          <button onclick="deleteUser(${index})">Delete</button>
          <hr>
        `;
        displayDiv.appendChild(userDiv);
      });
    } else {
      displayDiv.innerHTML = '<p>No user details found.</p>';
    }
  }

  function deleteUser(index) {
    var allUsers = JSON.parse(localStorage.getItem('users')) || [];
    allUsers.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(allUsers));
    displayAllUserDetails();
  }

  function editUser(index) {
    var allUsers = JSON.parse(localStorage.getItem('users')) || [];
    var userDetailsToEdit = allUsers[index];

    allUsers.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(allUsers));
    
    document.getElementById('username').value = userDetailsToEdit.username;
    document.getElementById('email').value = userDetailsToEdit.email;
    document.getElementById('phone').value = userDetailsToEdit.phone;
  }

  displayAllUserDetails();