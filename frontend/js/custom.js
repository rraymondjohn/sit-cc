// Sidebar toggle functionality
document.getElementById("sidebarToggle").addEventListener("click", function () {
  const sidebar = document.getElementById("sidebar");

  // Add 'expanded' class to toggle sidebar visibility
  sidebar.classList.toggle("expanded");
});

// Navigation active state
document.querySelectorAll(".sidebar-nav-link").forEach((navLink) => {
  navLink.addEventListener("click", function (e) {
    e.preventDefault();

    // Remove active class from all navs
    document.querySelectorAll(".sidebar-nav-link").forEach((link) => link.classList.remove("active"));

    // Add active class to the currently cliked nav
    this.classList.add("active");
  });
});

// Auto-hide sidebar on mobile view when clicking outside
document.addEventListener("click", function (e) {
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");

  if (window.innerWidth <= 768 && sidebar.classList.contains("expanded") && !sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
    sidebar.classList.remove("expanded");
  }
});

// Responsive sidebar handling (during resizing of window)
window.addEventListener("resize", function () {
  const sidebar = document.getElementById("sidebar");

  if (window.innerWidth > 768) {
    // When sidebar is expanded and on resize of window to desktop view, reset to collapsed state
    sidebar.classList.remove("expanded");
  }
});
