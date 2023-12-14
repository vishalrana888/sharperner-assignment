document.addEventListener('DOMContentLoaded',  ()=> {
  axios.get("https://crudcrud.com/api/c672e5d0ab014f27a52ed76e6eb5dd3e/appointmentdata")
  .then((response)=>{
      console.log(response)
  })
  .catch((error)=>{
      console.log(error)
  })
  const form = document.getElementById('appointmentForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const appointmentsList = document.getElementById('appointments');
  const enteredDataDisplay = document.getElementById('enteredUserData'); // Updated display area

  form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = nameInput.value;
      const email = emailInput.value;
      const phone = phoneInput.value;

      if (name && email && phone) {
          const appointment = { name, email, phone };
          saveAppointment(appointment);
          updateAppointmentsList();
          clearFormInputs();

          // Display entered data below the screen
          enteredDataDisplay.textContent = `Name: ${name}, Email: ${email}, Phone: ${phone}`;
      } else {
          alert('Please fill in all fields');
      }
  });

  function saveAppointment(appointment) {
      axios.post("https://crudcrud.com/api/c672e5d0ab014f27a52ed76e6eb5dd3e/appointmentdata", appointment)
          .then((response) => {
              console.log(response.data);
          })
          .catch((error) => {
              console.error("Error saving appointment:", error);
          });
  }

  function updateAppointmentsList() {
      const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
      appointmentsList.innerHTML = '';

      appointments.forEach((appointment, index) => {
          const listItem = document.createElement('li');
          listItem.textContent = `${appointment.name} - ${appointment.email} - ${appointment.phone}`;

          const deleteButton = createButton('Delete', () => deleteAppointment(index));
          const editButton = createButton('Edit', () => editAppointment(index));

          listItem.appendChild(deleteButton);
          listItem.appendChild(editButton);

          appointmentsList.appendChild(listItem);
      });
  }

  function createButton(text, onClick) {
      const button = document.createElement('button');
      button.textContent = text;
      button.addEventListener('click', onClick);
      return button;
  }

  function deleteAppointment(index) {
      let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
      appointments.splice(index, 1);
      localStorage.setItem('appointments', JSON.stringify(appointments));
      updateAppointmentsList();
  }

  function editAppointment(index) {
      let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
      const appointmentToEdit = appointments[index];

      // Populate form with the selected appointment's data
      nameInput.value = appointmentToEdit.name;
      emailInput.value = appointmentToEdit.email;
      phoneInput.value = appointmentToEdit.phone;

      // Show selected appointment details on the screen
      enteredDataDisplay.textContent = `Selected Appointment: ${appointmentToEdit.name} - ${appointmentToEdit.email} - ${appointmentToEdit.phone}`;

      // Remove the selected appointment from the list
      appointments.splice(index, 1);

      // Update local storage and the UI
      localStorage.setItem('appointments', JSON.stringify(appointments));
      updateAppointmentsList();
  }

  function clearFormInputs() {
      nameInput.value = '';
      emailInput.value = '';
      phoneInput.value = '';

      // Clear entered data display below the screen
      enteredDataDisplay.textContent = '';
  }

  // Initial update
  updateAppointmentsList();
});