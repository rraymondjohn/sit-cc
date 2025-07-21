// Simple dropdown handler for form-select elements
document.addEventListener("DOMContentLoaded", function () {
  // Find all form-select dropdown buttons
  const dropdownButtons = document.querySelectorAll('.form-select[data-bs-toggle="dropdown"]');

  dropdownButtons.forEach((button) => {
    const dropdownMenu = button.nextElementSibling;

    if (dropdownMenu && dropdownMenu.classList.contains("dropdown-menu")) {
      // const buttonSpan = button.querySelector("span");
      const dropdownItems = dropdownMenu.querySelectorAll(".dropdown-item");

      dropdownItems.forEach((item) => {
        item.addEventListener("click", function (e) {
          e.preventDefault();

          dropdownItems.forEach((el) => el.classList.remove("active"));
          this.classList.add("active");

          // Update button text with selected value
          const selectedText = this.innerHTML.trim();
          // buttonSpan.textContent = selectedText;
          // buttonSpan.classList.remove("text-muted");
          button.innerHTML = "";
          button.innerHTML = selectedText;

          // Store the selected value
          const selectedValue = this.getAttribute("data-value") || selectedText;
          button.setAttribute("data-selected-value", selectedValue);
        });
      });
    }
  });
});
