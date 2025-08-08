// top
const backToTopButton = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});
backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// testimonial left and right

const cards = Array.from(document.querySelectorAll(".testimonial-card"));
let startIdx = 0;
const visibleCount = 3;

function updateTestimonials() {
  cards.forEach((card, i) => {
    if (i >= startIdx && i < startIdx + visibleCount) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

document.getElementById("testimonial-prev").addEventListener("click", () => {
  startIdx = (startIdx - 1 + cards.length) % cards.length;
  if (startIdx + visibleCount > cards.length) {
    startIdx = cards.length - visibleCount;
  }
  updateTestimonials();
});

document.getElementById("testimonial-next").addEventListener("click", () => {
  startIdx = (startIdx + 1) % cards.length;
  if (startIdx + visibleCount > cards.length) {
    startIdx = 0;
  }
  updateTestimonials();
});

// Only show arrows if more than 3 cards
if (cards.length > visibleCount) {
  document.getElementById("testimonial-prev").classList.remove("hidden");
  document.getElementById("testimonial-next").classList.remove("hidden");
}
// Initial
updateTestimonials();
