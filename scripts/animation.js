const buttons = document.querySelectorAll(".accordion-btn");
const panels = document.querySelectorAll(".accordion-panel");

let current = 0; // currently open panel index
let isAnimating = false; // prevent overlapping animations

function forceReflow(el) {
  void el.offsetHeight;
}

function expandPanel(idx, { animate = true } = {}) {
  const panel = panels[idx];
  const button = document.querySelector(`[data-accordion-btn="${idx}"]`);
  const icon = document.querySelector(`[data-accordion-icon="${idx}"]`);
  const inner = panel.firstElementChild;

  // Active styles
  button.classList.remove("bg-[#f4f4f6]", "text-black");
  button.classList.add("bg-[#2B3990]", "text-white");
  panel.classList.remove("bg-[#f4f4f6]", "text-gray-700");
  panel.classList.add("bg-[#2B3990]", "text-white");

  panel.classList.remove("opacity-0");
  panel.classList.add("opacity-100");
  if (inner) inner.classList.add("px-8", "pb-6", "pt-2");

  if (!animate) {
    // Open instantly to avoid first-load measurement glitches
    panel.style.maxHeight = "none";
  } else {
    if (!panel.style.maxHeight || panel.style.maxHeight === "none") {
      panel.style.maxHeight = "0px";
    }
    forceReflow(panel);
    panel.style.maxHeight = panel.scrollHeight + "px";

    // After expand, allow natural growth
    const onEnd = (e) => {
      if (e.propertyName !== "max-height") return;
      panel.removeEventListener("transitionend", onEnd);
      panel.style.maxHeight = "none";
    };
    panel.addEventListener("transitionend", onEnd, { once: true });
  }

  button.setAttribute("aria-expanded", "true");
  if (icon) icon.textContent = "-";
}

function toMs(s) {
  s = s.trim();
  return s.endsWith("ms") ? parseFloat(s) : parseFloat(s) * 1000;
}

function collapsePanel(idx, onDone) {
  const panel = panels[idx];
  const button = document.querySelector(`[data-accordion-btn="${idx}"]`);
  const icon = document.querySelector(`[data-accordion-icon="${idx}"]`);
  const inner = panel.firstElementChild;

  // If currently 'none', set exact px height so we can animate down
  if (!panel.style.maxHeight || panel.style.maxHeight === "none") {
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
  forceReflow(panel);

  // Start collapse
  panel.style.maxHeight = "0px";
  panel.classList.remove("opacity-100");
  panel.classList.add("opacity-0");
  if (inner) inner.classList.remove("px-8", "pb-6", "pt-2");

  // Inactive styles
  button.classList.remove("bg-[#2B3990]", "text-white");
  button.classList.add("bg-[#f4f4f6]", "text-black");
  panel.classList.remove("bg-[#2B3990]", "text-white");
  panel.classList.add("bg-[#f4f4f6]", "text-gray-700");
  button.setAttribute("aria-expanded", "false");
  if (icon) icon.textContent = "+";

  // Finish after transition (with reliable fallback)
  let called = false;
  const done = () => {
    if (called) return;
    called = true;
    onDone && onDone();
  };

  const cs = getComputedStyle(panel);
  const durs = cs.transitionDuration.split(",").map(toMs);
  const delays = cs.transitionDelay.split(",").map(toMs);
  const durMs = Math.max(...durs) + Math.max(...delays);

  const onEnd = (e) => {
    if (e.propertyName !== "max-height") return;
    panel.removeEventListener("transitionend", onEnd);
    done();
  };
  panel.addEventListener("transitionend", onEnd, { once: true });

  setTimeout(done, Math.max(60, durMs + 60));
}

function openPanelSequential(targetIdx) {
  if (isAnimating || targetIdx === current) return;
  isAnimating = true;
  collapsePanel(current, () => {
    expandPanel(targetIdx);
    current = targetIdx;
    isAnimating = false;
  });
}

// Click handlers
buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const idx = Number(this.getAttribute("data-accordion-btn"));
    openPanelSequential(idx);
  });
});

// Initial open — wait for fonts/layout, then open without animation
const INITIAL_INDEX = 0;
function openFirstCleanly() {
  requestAnimationFrame(() => expandPanel(INITIAL_INDEX, { animate: false }));
}

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(openFirstCleanly);
} else {
  window.addEventListener("DOMContentLoaded", openFirstCleanly, { once: true });
}

// Keep open panel sized on resize
window.addEventListener("resize", () => {
  const panel = panels[current];
  if (!panel) return;
  if (panel.classList.contains("opacity-100")) {
    panel.style.maxHeight = panel.scrollHeight + "px";
    forceReflow(panel);
    panel.style.maxHeight = "none";
  }
});
