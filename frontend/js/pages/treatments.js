import TreatmentsService from "../service/treatments-service.js";

const user = JSON.parse(sessionStorage.getItem("vitals_user"));

document.addEventListener("DOMContentLoaded", () => {
  // Load treatments when page loads
  loadTreatments();

  if (user && (user.role === "doctor" || user.role === "admin")) {
    // Show the doctor's treatments section
    const doctorTreatmentsSection = document.getElementById("doctorTreatmentsSection");
    doctorTreatmentsSection.classList.remove("d-none");

    // Load doctor's treatments if user is a doctor or admin
    loadDoctorTreatments(user.id);
  }
});

// Function to create a treatment card
function createTreatmentCard(treatment) {
  return `
    <div class="col-xxl-4 col-md-6 mb-3">
      <div class="card h-100">
        <div class="card-header bg-primary text-white text-center"><i class="bi ${treatment.iconClassName}"></i> ${treatment.name}</div>
        <div class="card-body text-center">
          <p class="card-text">${treatment.description}</p>
          <p class="card-text">$${treatment.cost} SGD</p>
        </div>
      </div>
    </div>
  `;
}

// Function to create a treatment card for doctor's treatments
function createDoctorTreatmentCard(treatment) {
  return `
    <div class="col-xxl-4 col-md-6 mb-3">
      <div class="card h-100">
        <div class="card-header bg-primary text-white text-center"><i class="bi ${treatment.iconClassName}"></i> ${treatment.name}</div>
        <div class="card-body text-center">
          <p class="card-text">${treatment.description}</p>
          <p class="card-text">$${treatment.cost} SGD</p>
          <div class="d-grid gap-2">
            <button class="btn btn-outline-primary">Edit</button>
            <button class="btn btn-outline-danger" data-action="delete" data-id="${treatment.id}">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Load all treatments
async function loadTreatments() {
  const allTreatmentsList = document.getElementById("allTreatmentsList");

  try {
    const treatments = await TreatmentsService.getAllTreatments();

    if (!treatments || treatments.length === 0) {
      allTreatmentsList.innerHTML = '<p class="text-center">No treatments available.</p>';
      return;
    }

    allTreatmentsList.innerHTML = treatments.map((treatment) => createTreatmentCard(treatment)).join("");
  } catch (error) {
    console.error("Error loading treatments:", error);
    allTreatmentsList.innerHTML = '<p class="text-center">Error loading treatments. Please try again later.</p>';
  }
}

// Load all doctor's treatments
async function loadDoctorTreatments(doctorId) {
  const doctorTreatmentsList = document.getElementById("doctorTreatmentsList");

  try {
    const treatments = await TreatmentsService.getTreatmentsByDoctor(doctorId);

    if (!treatments || treatments.length === 0) {
      doctorTreatmentsList.innerHTML = '<p class="text-center">No treatments available for this doctor.</p>';
      return;
    }

    doctorTreatmentsList.innerHTML = treatments.map((treatment) => createDoctorTreatmentCard(treatment)).join("");
  } catch (error) {
    console.error("Error loading doctor's treatments:", error);
    doctorTreatmentsList.innerHTML = '<p class="text-center">Error loading treatments. Please try again later.</p>';
  }
}

// EVent listener for creating new traetments
const addTreatmentForm = document.getElementById("addTreatmentForm");
if (addTreatmentForm) {
  addTreatmentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const treatmentData = {
      name: document.getElementById("treatmentName").value,
      description: document.getElementById("treatmentDesc").value,
      cost: parseFloat(document.getElementById("treatmentCost").value),
      iconClassName: document.getElementById("treatmentIcon").getAttribute("data-selected-value"),
      doctorId: parseInt(user.id), // Assuming the logged-in user is the doctor
    };

    try {
      await TreatmentsService.createTreatment(treatmentData);
      // Optionally, reset the form
      addTreatmentForm.reset();
      loadTreatments();
      loadDoctorTreatments(user.id);
    } catch (error) {
      console.error("Error adding treatment:", error);
    }
  });
}

// Edit treatment function
export async function editTreatment(treatmentId) {
  const treatmentData = {
    name: document.getElementById("editTreatmentName").value,
    description: document.getElementById("editTreatmentDesc").value,
    cost: parseFloat(document.getElementById("editTreatmentCost").value),
    iconClassName: document.getElementById("editTreatmentIcon").getAttribute("data-selected-value"),
    doctorId: parseInt(user.id),
  };

  try {
    await TreatmentsService.updateTreatment(treatmentId, treatmentData);

    loadTreatments();
    loadDoctorTreatments(user.id);
  } catch (error) {
    console.error("Error editing treatment:", error);
  }
}

// Delete treatment function
document.addEventListener("click", async (e) => {
  if (e.target.dataset.action === "delete") {
    const treatmentId = parseInt(e.target.dataset.id);
    await deleteTreatment(treatmentId);
  }
});
export async function deleteTreatment(treatmentId) {
  try {
    await TreatmentsService.deleteTreatment(treatmentId);

    loadTreatments();
    loadDoctorTreatments(user.id);
  } catch (error) {
    console.error("Error deleting treatment:", error);
  }
}
