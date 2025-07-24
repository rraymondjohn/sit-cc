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

/* 
  Auth Services 
  - Login (POST)
  - Register (POST)
*/
require("dotenv").config();
const API_BASE_URL = process.env.API_BASE_URL + "/auth";

// Login
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      sessionStorage.setItem("vitals_cloud_token", "dummy_token");
      sessionStorage.setItem("vitals_user", JSON.stringify(data.user));
      window.location.href = "index.html";
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    alert("Network error");
  }
});

// Register
document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();
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

  try {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password, role }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Registration successful! Please log in.");
      window.location.href = "index.html";
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (err) {
    alert("Network error");
  }
});
