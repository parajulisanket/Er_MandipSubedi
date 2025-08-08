document.querySelectorAll(".accordion-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const idx = this.getAttribute("data-accordion-btn");

    document.querySelectorAll(".accordion-panel").forEach((panel, i) => {
      const button = document.querySelector(`[data-accordion-btn="${i}"]`);
      const icon = document.querySelector(`[data-accordion-icon="${i}"]`);
      if (String(i) === idx) {
        // Open the clicked one
        panel.classList.remove("hidden");
        // Make button and panel blue
        button.classList.remove("bg-[#f4f4f6]", "text-black");
        button.classList.add("bg-[#2B3990]", "text-white");
        panel.classList.remove("bg-[#f4f4f6]", "text-gray-700");
        panel.classList.add("bg-[#2B3990]", "text-white");
        if (icon) icon.textContent = "-";
      } else {
        // Close others
        panel.classList.add("hidden");
        // Make button and panel normal
        button.classList.remove("bg-[#2B3990]", "text-white");
        button.classList.add("bg-[#f4f4f6]", "text-black");
        panel.classList.remove("bg-[#2B3990]", "text-white");
        panel.classList.add("bg-[#f4f4f6]", "text-gray-700");
        if (icon) icon.textContent = "+";
      }
    });
  });
});
