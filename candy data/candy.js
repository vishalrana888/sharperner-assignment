// Function to get candy data
function getCandyData() {
    axios.get('https://crudcrud.com/api/ee811b02a2244d0490c0cab9ffc77fe1/candydata')
      .then(response => {
        displayCandyData(response.data);
      })
      .catch(error => {
        console.error('GET Error:', error);
      });
  }
 // Function to handle buying candies
function buyCandy(candyId, quantityToBuy) {
    axios.get(`https://crudcrud.com/api/your-api-endpoint/${candyId}`)
        .then(response => {
            const candy = response.data;
            if (candy.quantity >= quantityToBuy) {
                candy.quantity -= quantityToBuy;

                axios.put(`https://crudcrud.com/api/your-api-endpoint/${candyId}`, candy)
                    .then(response => {
                        getCandyData();
                    })
                    .catch(error => {
                        console.error('PUT Error:', error);
                    });
            } else {
                console.error('Insufficient quantity!');
            }
        })
        .catch(error => {
            console.error('GET Error:', error);
        });
}

// Function to display candy data with buy buttons
function displayCandyData(data) {
    const displayDiv = document.getElementById('displayData');
    displayDiv.innerHTML = '';

    data.forEach(candy => {
        const candyEntry = document.createElement('div');
        candyEntry.innerHTML = `
            <h3>${candy.candyName}</h3>
            <p><strong>Description:</strong> ${candy.description}</p>
            <p><strong>Price:</strong> Rs.${candy.price ? candy.price.toFixed(2) : 'N/A'}</p>
            <p><strong>Quantity:</strong> ${candy.quantity}</p>
            <button onclick="deleteCandy('${candy._id}')">Delete</button>
            <button onclick="displayUpdateForm('${candy._id}', '${candy.candyName}', '${candy.description}', ${candy.price}, ${candy.quantity})">Update</button>
            <button onclick="buyCandy('${candy._id}', 1)">Buy 1</button>
            <button onclick="buyCandy('${candy._id}', 2)">Buy 2</button>
            <button onclick="buyCandy('${candy._id}', 3)">Buy 3</button>
        `;
        displayDiv.appendChild(candyEntry);
    });
}
  
  // Function to handle adding a new candy
  function addNewCandy() {
    const candyObject = {
      candyName: document.getElementById('candyName').value,
      description: document.getElementById('description').value,
      price: parseFloat(document.getElementById('price').value),
      quantity: parseInt(document.getElementById('quantity').value)
    };
  
    axios.post('https://crudcrud.com/api/ee811b02a2244d0490c0cab9ffc77fe1/candydata', candyObject)
      .then(response => {
        getCandyData();
        candyForm.reset(); // Clear the form fields after adding a new candy
      })
      .catch(error => {
        console.error('POST Error:', error);
      });
  }
  
  // Function to display the update form with candy details
  function displayUpdateForm(id, name, description, price, quantity) {
    updateForm.style.display = 'block';
    // Populate update form fields with the selected candy's details
    document.getElementById('updateCandyName').value = name;
    document.getElementById('updateDescription').value = description;
    document.getElementById('updatePrice').value = price;
    document.getElementById('updateQuantity').value = quantity;
  
    // Set up an event listener for the update button
    updateItemButton.onclick = function () {
      updateCandy(id);
    };
  }
  
  // Function to handle updating candy details
  function updateCandy(candyId) {
    const updatedCandyData = {
      candyName: document.getElementById('updateCandyName').value,
      description: document.getElementById('updateDescription').value,
      price: parseFloat(document.getElementById('updatePrice').value),
      quantity: parseInt(document.getElementById('updateQuantity').value)
    };
  
    axios.put(`https://crudcrud.com/api/ee811b02a2244d0490c0cab9ffc77fe1/candydata/${candyId}`, updatedCandyData)
      .then(response => {
        getCandyData();
        updateForm.style.display = 'none'; // Hide the update form after updating
      })
      .catch(error => {
        console.error('PUT Error:', error);
      });
  }
  
  // Function to delete a candy
  function deleteCandy(candyIdToDelete) {
    axios.delete(`https://crudcrud.com/api/ee811b02a2244d0490c0cab9ffc77fe1/candydata/${candyIdToDelete}`)
      .then(response => {
        getCandyData();
      })
      .catch(error => {
        console.error('DELETE Error:', error);
      });
  }
  
  // Event listener for adding a new candy
  const addItemButton = document.getElementById('addItemButton');
  addItemButton.addEventListener('click', addNewCandy);
  
  // Get reference to form elements
  const candyForm = document.getElementById('candyForm');
  const updateForm = document.getElementById('updateForm');
  const updateItemButton = document.getElementById('updateItemButton');
  
  // Initial call to get and display candy data when the script loads
  getCandyData();
  
  
  