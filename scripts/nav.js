const nav = document.getElementById("site-nav");
const spacer = document.getElementById("nav-spacer");

function applyScrolledState(scrolled) {
  if (scrolled) {
    // stick + white bg + subtle shadow
    nav.classList.remove("absolute", "bg-transparent");
    nav.classList.add(
      "fixed",
      "bg-white",
      "shadow-sm",
      "top-0",
      "left-0",
      "w-full"
    );
    spacer.style.height = nav.offsetHeight + "px";
  } else {
    // revert to initial
    nav.classList.remove("fixed", "bg-white", "shadow-sm");
    nav.classList.add("absolute", "bg-transparent");
    spacer.style.height = "0px";
  }
}

function onScroll() {
  applyScrolledState(window.scrollY > 200);
}

window.addEventListener("load", onScroll);
window.addEventListener("scroll", onScroll);
window.addEventListener("resize", () => {
  // keep spacer in sync while scrolled
  if (nav.classList.contains("fixed")) {
    spacer.style.height = nav.offsetHeight + "px";
  }
});
