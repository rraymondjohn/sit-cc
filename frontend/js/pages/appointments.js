import TreatmentsService from "../service/treatments-service.js";
import UsersService from "../service/users-service.js";
import AppointmentsService from "../service/appointments-service.js";

const user = JSON.parse(sessionStorage.getItem("vitals_user"));

document.addEventListener("DOMContentLoaded", async () => {
  if (user.role !== "patient" || user.role !== "admin") {
    window.location.href = "index.html";
  }

  loadUserAppointments();

  const treatments = await TreatmentsService.getAllTreatments();

  if (treatments && treatments.length > 0) {
    populateTreatmentsDropdown(treatments);
  }

  setPatientName();
  // Set minimum date to tomorrow
  setMinAppointmentDate();

  // Set placeholder for appointment date
  const appointmentDateInput = document.getElementById("appointmentDate");
  appointmentDateInput.placeholder = "Select appointment date";
});

function setPatientName() {
  const patientNameInput = document.getElementById("patientName");
  patientNameInput.value = `${user.firstName} ${user.lastName}` || "";
}

function populateTreatmentsDropdown(treatments) {
  const treatmentDropdown = document.getElementById("treatmentSelect");
  const dropdownMenu = document.getElementById("treatmentsSelectList");

  dropdownMenu.innerHTML = "";

  treatments.forEach((treatment) => {
    const treatmentItem = document.createElement("li");
    treatmentItem.innerHTML = `<a class="dropdown-item" href="#" data-value="${treatment.id}">${treatment.name}</a>`;
    treatmentItem.addEventListener("click", async () => {
      // Set the selected treatment ID in the hidden input
      treatmentDropdown.textContent = treatment.name;
      treatmentDropdown.setAttribute("data-selected-value", treatment.id);

      // Get Doctor by ID
      const doctor = await UsersService.getUserById(treatment.doctorId);
      const doctorNameInput = document.getElementById("doctorName");
      doctorNameInput.value = `Dr. ${doctor.firstName} ${doctor.lastName}`;
    });
    dropdownMenu.appendChild(treatmentItem);
  });
}

function setMinAppointmentDate() {
  const appointmentDateInput = document.getElementById("appointmentDate");
  const today = new Date();
  today.setDate(today.getDate() + 3);
  appointmentDateInput.min = today.toISOString().split("T")[0];
}

// Get all appointments for the user
async function loadUserAppointments() {
  const appointmentsTableBody = document.getElementById("appointmentsTableBody");

  try {
    const appointments = await AppointmentsService.getAllAppointmentsByPatientId(user.id);
    if (!appointments || appointments.length === 0) {
      appointmentsTableBody.innerHTML = "<tr><td colspan='5'>No appointments found</td></tr>";
      return;
    }

    appointmentsTableBody.innerHTML = "";

    appointments.forEach(async (appointment) => {
      const row = document.createElement("tr");
      const treatment = await TreatmentsService.getTreatmentById(appointment.treatmentId);
      const doctor = await UsersService.getUserById(treatment.doctorId);
      row.innerHTML = `
        <td>${treatment.name}</td>
        <td>${doctor ? `Dr. ${doctor.firstName} ${doctor.lastName}` : ""}</td>
        <td>${new Date(appointment.date).toLocaleDateString("en-GB")}</td>
        <td>${new Date(`1970-01-01T${appointment.time}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}</td>
        <td>${appointment.reason}</td>
      `;
      appointmentsTableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching user appointments:", error);
  }
}

// Event listener for new appointment form submission
const newAppointmentForm = document.getElementById("newAppointmentForm");
if (newAppointmentForm) {
  newAppointmentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const treatmentId = document.getElementById("treatmentSelect").getAttribute("data-selected-value");
    const apptDate = document.getElementById("appointmentDate").value;
    const apptTime = document.getElementById("appointmentTime").getAttribute("data-selected-value");
    const reason = document.getElementById("appointmentReason").value;

    if (!treatmentId || !apptDate || !apptTime || !reason) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await AppointmentsService.createAppointment({
        patientId: user.id,
        treatmentId: parseInt(treatmentId),
        date: apptDate,
        time: apptTime,
        reason,
      });

      newAppointmentForm.reset();
      loadUserAppointments();
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  });
}
