const movieGrid = document.getElementById('movie-grid');
const tvShowGrid = document.getElementById('tvshow-grid');
const videoModal = document.getElementById('video-modal');
const videoContainer = document.getElementById('video-container');

function openModal(videoUrl) {
  videoContainer.innerHTML = `<iframe width="100%" height="450" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
  videoModal.classList.add('active');
}

function closeModal() {
  videoModal.classList.remove('active');
  videoContainer.innerHTML = '';
}

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('video-card');
      card.innerHTML = `
        <img src="${item.thumbnail}" alt="${item.title}" />
        <h3>${item.title}</h3>
        <p>${item.year} • ${item.rating}</p>
      `;
      card.addEventListener('click', () => openModal(item.video));
      if (item.category === "Movie") {
        movieGrid.appendChild(card);
      } else {
        tvShowGrid.appendChild(card);
      }
    });
  });
  

// Open modal and embed video
function openModal(videoUrl) {
  videoContainer.innerHTML = `<iframe width="100%" height="450" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
  videoModal.classList.add('active');
}

// Close modal
function closeModal() {
  videoModal.classList.remove('active');
  videoContainer.innerHTML = '';
}

// Detect current page
const page = window.location.pathname;

// Load and render video cards
fetch('data.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('video-card');
      card.innerHTML = `
        <img src="${item.thumbnail}" alt="${item.title}" />
        <h3>${item.title}</h3>
        <p>${item.year} • ${item.rating}</p>
      `;
      card.addEventListener('click', () => openModal(item.video));

      // Handle different pages
      if (page.includes('movies.html') && item.category === 'Movie') {
        movieGrid?.appendChild(card);
      } else if (page.includes('tvshows.html') && item.category === 'TV Show') {
        movieGrid?.appendChild(card);
      } else if (page.includes('index.html') || page.endsWith('/')) {
        // Home page (show both)
        if (item.category === 'Movie') {
          movieGrid?.appendChild(card);
        } else if (item.category === 'TV Show') {
          tvShowGrid?.appendChild(card);
        }
      }
    });
  });

// Theme Toggle
document.getElementById("theme-toggle")?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// Load saved theme
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
});

