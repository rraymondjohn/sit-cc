document.getElementById("toggleLoginPassword").addEventListener("click", function () {
  const passwordInput = document.getElementById("loginPassword");
  const icon = this.querySelector("span");

  togglePasswordEye(passwordInput, icon);
});

document.getElementById("toggleRegisterPassword").addEventListener("click", function () {
  const passwordInput = document.getElementById("registerPassword");
  const icon = this.querySelector("span");

  togglePasswordEye(passwordInput, icon);
});

function togglePasswordEye(input, iconSpan) {
  if (input.type === "password") {
    input.type = "text";
    iconSpan.classList.replace("bi-eye-slash", "bi-eye");
  } else {
    input.type = "password";
    iconSpan.classList.replace("bi-eye", "bi-eye-slash");
  }
}

// Login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  // Handle login logic here
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  console.log("Login form submitted with:", { email, password });

  localStorage.setItem("vitals_cloud_token", "dummy_token"); // Simulate token storage

  window.location.href = "index.html"; // Adjust the path as necessary
});

// Register
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  // Handle registration logic here
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("registerEmail").value;
  const role = document.getElementById("userRole").getAttribute("data-selected-value");
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  console.log("Registration form submitted with:", { username, email, role, password });
  window.location.href = "index.html"; // Adjust the path as necessary
});
