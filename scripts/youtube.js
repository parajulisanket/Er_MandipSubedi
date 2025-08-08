// Replace these with your actual YouTube video IDs and titles
const videos = [
  {
    id: "wew7eD6dLiM",
    title:
      "Visionary behind Geomandu & Premier Engineering College ft. Dr. Mandip Subedi",
    thumb: "/assets/thumbnel1.png",
  },
  {
    id: "2WkEB75nqKY",
    title: "Nepal Geotechnical Society",
    thumb: "/assets/thumbneil2.png",
  },
  {
    id: "AHRba8P_Ngw",
    title: "Gandaki Youth Speaker 2019_ Mandip Subedi",
    thumb: "/assets/thumbneil3.jpg",
  },
];

// Initialize with the first video
function loadMainVideo(index) {
  const mainPlayer = document.getElementById("main-player");
  const videoTitle = document.getElementById("video-title");
  mainPlayer.src = `https://www.youtube.com/embed/${videos[index].id}?autoplay=1&rel=0`;
  videoTitle.textContent = videos[index].title;

  // Highlight selected
  document.querySelectorAll(".sidebar-video").forEach((el, i) => {
    if (i === index) {
      el.classList.add("ring-2", "ring-[#2B3990]", "bg-white");
    } else {
      el.classList.remove("ring-2", "ring-[#2B3990]", "bg-white");
    }
  });
}

// Render the sidebar list
function renderVideoList() {
  const list = document.getElementById("video-list");
  list.innerHTML = "";
  videos.forEach((video, idx) => {
    const el = document.createElement("div");
    el.className =
      "sidebar-video cursor-pointer flex items-center gap-4 p-2 rounded-md transition hover:bg-[#DFA958]/10";
    el.innerHTML = `
        <img src="${video.thumb}" class="w-20 h-14 object-cover rounded shadow" alt="${video.title}">
        <span class="text-base font-medium">${video.title}</span>
      `;
    el.onclick = () => loadMainVideo(idx);
    list.appendChild(el);
  });
  // Load the first video by default
  loadMainVideo(0);
}

// On page load
document.addEventListener("DOMContentLoaded", renderVideoList);
