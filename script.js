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

// Function showData / show song and artist in DOM
function showData(data) {}

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
