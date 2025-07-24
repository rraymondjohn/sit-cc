import AuthService from "../service/auth-service.js";

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
// Login
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const data = await AuthService.login({ email, password });
    console.log(data);
    sessionStorage.setItem("vitals_cloud_token", "dummy_token");
    sessionStorage.setItem("vitals_user", JSON.stringify(data.user));
    window.location.href = "index.html";
  } catch (err) {
    alert(err.message || "Network error");
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
    const data = await AuthService.register({ firstName, lastName, email, password, role });
    console.log(data);
    alert("Registration successful! Please log in.");
    window.location.href = "index.html";
  } catch (err) {
    alert(err.message || "Network error");
  }
});
