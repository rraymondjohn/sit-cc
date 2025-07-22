document.addEventListener("DOMContentLoaded", () => {
  // Code to run after DOM is fully loaded
  const user = JSON.parse(sessionStorage.getItem("vitals_user"));
  const userNameElement = document.getElementById("dashboardUserName");
  if (user) {
    if (user.role === "doctor") {
      userNameElement.textContent = `Dr. ${user.firstName} ${user.lastName}`;
    } else {
      userNameElement.textContent = `${user.firstName} ${user.lastName}`;
    }
  }
});
