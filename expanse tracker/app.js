// Retrieve expenses from local storage or initialize an empty array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to display expenses based on category
function displayExpenses(category = 'all') {
  const expenseList = document.getElementById('expenseList');
  expenseList.innerHTML = '';

  const filteredExpenses = category === 'all' ? expenses : expenses.filter(expense => expense.category === category);

  filteredExpenses.forEach((expense, index) => {
    const expenseItem = document.createElement('div');
    expenseItem.classList.add('alert', 'alert-primary', 'd-flex', 'justify-content-between', 'align-items-center');
    expenseItem.innerHTML = `<span>${index + 1}. ${expense.description} - $${expense.amount}</span>
                             <div>
                               <button class="btn btn-warning btn-sm me-2" onclick="editExpense(${index})">Edit</button>
                               <button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button>
                             </div>`;

    expenseList.appendChild(expenseItem);
  });
}

// Function to add expense
function addExpense(description, amount, category) {
  expenses.push({ description, amount, category });
  localStorage.setItem('expenses', JSON.stringify(expenses));
  displayExpenses(category);
}

// Function to delete expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  displayExpenses();
}

// Function to edit expense
function editExpense(index) {
  const newDescription = prompt('Enter new description:');
  const newAmount = parseFloat(prompt('Enter new amount:'));

  if (newDescription && !isNaN(newAmount)) {
    expenses[index].description = newDescription;
    expenses[index].amount = newAmount;
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
  } else {
    alert('Invalid input!');
  }
}

// Function to add a custom category
function addCustomCategory() {
  const customCategoryInput = document.getElementById('customCategory');
  const customCategoryName = customCategoryInput.value.trim();

  if (customCategoryName !== '') {
    const categoriesTab = document.getElementById('categoriesTab');
    const newCategoryTab = document.createElement('li');
    newCategoryTab.classList.add('nav-item');

    const newCategoryButton = document.createElement('button');
    newCategoryButton.classList.add('nav-link');
    newCategoryButton.setAttribute('role', 'tab');
    newCategoryButton.textContent = customCategoryName;
    newCategoryButton.dataset.bsToggle = 'tab';
    newCategoryButton.dataset.bsTarget = `#${customCategoryName}`;
    newCategoryButton.setAttribute('aria-controls', customCategoryName);

    newCategoryTab.appendChild(newCategoryButton);
    categoriesTab.appendChild(newCategoryTab);

    // Clear input field after adding category
    customCategoryInput.value = '';

    // Create a new tab pane for the added category
    const expenseList = document.getElementById('expenseList');
    const newCategoryPane = document.createElement('div');
    newCategoryPane.classList.add('tab-pane');
    newCategoryPane.id = customCategoryName;
    newCategoryPane.setAttribute('role', 'tabpanel');
    expenseList.appendChild(newCategoryPane);

    newCategoryButton.addEventListener('click', function () {
      displayExpenses(customCategoryName);
    });

    // Display expenses for the added category
    displayExpenses(customCategoryName);

    // Add category option in the expense form
    const expenseCategory = document.getElementById('expenseCategory');
    const newCategoryOption = document.createElement('option');
    newCategoryOption.value = customCategoryName;
    newCategoryOption.textContent = customCategoryName;
    expenseCategory.appendChild(newCategoryOption);
  } else {
    alert('Please enter a valid category name.');
  }
}

// Event listener for adding a custom category
const addCustomCategoryButton = document.getElementById('addCustomCategory');
addCustomCategoryButton.addEventListener('click', addCustomCategory);

// Form submission to add expense
const expenseForm = document.getElementById('expenseForm');
expenseForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const description = document.getElementById('expenseDescription').value;
  const amount = parseFloat(document.getElementById('expenseAmount').value);
  const category = document.getElementById('expenseCategory').value;

  if (description && !isNaN(amount) && category) {
    addExpense(description, amount, category);
    expenseForm.reset();
  } else {
    alert('Please fill in all fields.');
  }
});

// Initial display of expenses when the page loads
displayExpenses();
