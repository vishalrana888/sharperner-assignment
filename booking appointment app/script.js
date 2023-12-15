document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('appointmentForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const appointmentsList = document.getElementById('appointments');
    const enteredDataDisplay = document.getElementById('enteredUserData'); // Updated display area

    // Fetch appointments from the API and display them on the screen
    function fetchAppointmentsAndDisplay() {
        axios.get("https://crudcrud.com/api/d54a3c7aea824eb485c73c97c5658b50/appointmentData")
            .then((response) => {
                const appointments = response.data;
                updateAppointmentsList(appointments);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = nameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;

        if (name && email && phone) {
            const appointment = { name, email, phone };
            saveAppointment(appointment);
        } else {
            alert('Please fill in all fields');
        }
    });

    function saveAppointment(appointment) {
        axios.post("https://crudcrud.com/api/d54a3c7aea824eb485c73c97c5658b50/appointmentData", appointment)
            .then((response) => {
                console.log(response.data);
                fetchAppointmentsAndDisplay(); // Fetch and display updated appointments after saving
                clearFormInputs();
            })
            .catch((error) => {
                console.error("Error saving appointment:", error);
            });
    }

    function updateAppointmentsList(appointments) {
        appointmentsList.innerHTML = '';

        appointments.forEach((appointment) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${appointment.name} - ${appointment.email} - ${appointment.phone}`;

            const editButton = createButton('Edit', () => editDisplayedAppointment(appointment));
            const deleteButton = createButton('Delete', () => deleteDisplayedAppointment(appointment._id));

            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);

            appointmentsList.appendChild(listItem);
        });
    }

    function createButton(text, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }

    function deleteDisplayedAppointment(appointmentId) {
        axios.delete(`https://crudcrud.com/api/d54a3c7aea824eb485c73c97c5658b50/appointmentData/${appointmentId}`)
            .then((response) => {
                console.log(response.data);
                fetchAppointmentsAndDisplay(); // Fetch and display updated appointments after deletion
            })
            .catch((error) => {
                console.error("Error deleting appointment:", error);
            });
    }

    function editDisplayedAppointment(appointment) {
        nameInput.value = appointment.name;
        emailInput.value = appointment.email;
        phoneInput.value = appointment.phone;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const updatedName = nameInput.value;
            const updatedEmail = emailInput.value;
            const updatedPhone = phoneInput.value;

            if (updatedName && updatedEmail && updatedPhone) {
                appointment.name = updatedName;
                appointment.email = updatedEmail;
                appointment.phone = updatedPhone;

                axios.put(`https://crudcrud.com/api/d54a3c7aea824eb485c73c97c5658b50/appointmentData/${appointment._id}`, appointment)
                    .then((response) => {
                        console.log(response.data);
                        fetchAppointmentsAndDisplay(); // Fetch and display updated appointments after editing
                        clearFormInputs();
                    })
                    .catch((error) => {
                        console.error("Error updating appointment:", error);
                    });
            } else {
                alert('Please fill in all fields');
            }
        });
    }

    function clearFormInputs() {
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        enteredDataDisplay.textContent = '';
    }

    // Fetch appointments on page load and display them
    fetchAppointmentsAndDisplay();
});

