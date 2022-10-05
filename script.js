const formEl = document.getElementById("form");
const inputEl = document.getElementById("search");
const resultEl = document.getElementById("result");
const moreEl = document.getElementById("more");
const apiURL = "https://api.lyrics.ovh";

// Function searchSong
async function searchSong(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  console.log(data);
  showData(data);
}

// Function showData / UPDATE UI
function showData(data) {
  resultEl.innerHTML = `
  <ul class="songs">
    ${data.data
      .map(
        (song) => `
      <li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
        `
      )
      .join("")}
  </ul>
  `;

  if (data.preview || data.next) {
    moreEl.innerHTML = `
    ${
      data.preview
        ? `<button class="btn" onclick="getMoreSongs('${data.preview}')">Prev</button>`
        : ""
    }
    ${
      data.next
        ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
        : ""
    }
    `;
  } else {
    moreEl.innerHTML = "";
  }
}

// Function get lyrics
async function getLyrics(artist, title) {
  const res = await fetch(`${apiURL}/v1/${artist}/${title}`);
  const data = await res.json();
  console.log(data);
}

// Function get prev and next songs
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

// Form Event Listener
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = inputEl.value.trim();
  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSong(searchTerm);
  }
});

// Result Event Listener
resultEl.addEventListener("click", (e) => {
  const clickedBtn = e.target;
  if (clickedBtn.tagName == "BUTTON") {
    const artist = clickedBtn.getAttribute("data-artist");
    const songTitle = clickedBtn.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});
