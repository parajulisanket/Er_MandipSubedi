// top
const backToTopButton = document.getElementById("backToTop");
const mq = window.matchMedia("(min-width: 768px)");

function toggleBackToTop() {
  if (!mq.matches) {
    backToTopButton.style.display = "none";
    return;
  }

  backToTopButton.style.display = window.scrollY > 500 ? "block" : "none";
}

toggleBackToTop();
window.addEventListener("scroll", toggleBackToTop);
window.addEventListener("resize", toggleBackToTop);

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// scroll down
const scrollDownButton = document.querySelector('a[href="#about"]');
scrollDownButton.addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("about").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
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
