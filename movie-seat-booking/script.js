const moviePicker = document.querySelector("select.movie-picker");
const seats = Array.from(document.querySelectorAll("div.row > .seat")).filter(seat => !seat.classList.contains("occupied"));
const countSpan = document.getElementById("count");
const priceSpan = document.getElementById("price");

function calculateMoviePrice() {
  const count = seats.filter(seat => seat.classList.contains("selected")).length;
  const price = Number(moviePicker.options[moviePicker.selectedIndex].value);

  countSpan.innerHTML = count;
  priceSpan.innerHTML = price * count;
}

function handleGetLocalStorage() {
  moviePicker.selectedIndex = Number(localStorage.getItem("movieIndex")) || 0;
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
  seats.forEach((seat, idx) => {
    if (selectedSeats?.[idx]) {
      seat.classList.add("selected");
    }
  });
  calculateMoviePrice();
}

function handleSetMovieIndexToLocalStorage() {
  localStorage.setItem("movieIndex", moviePicker.selectedIndex || 0);
  calculateMoviePrice();
}

function handleSetSelectedSeatsToLocalStorage() {
  const selectedSeats = seats.map(seat => {
    if (seat.classList.contains("selected")) {
      return true;
    }
    return false;
  })
  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
}

function handleSelectSeat(e) {
  const seat = e.target;
  if (!seat.classList.contains("selected")) {
    e.target.classList.add("selected");
  } else {
    e.target.classList.remove("selected");
  }
  calculateMoviePrice();
}

function handleSelectMovie() {
  calculateMoviePrice();
}

window.addEventListener("load", handleGetLocalStorage);

moviePicker.addEventListener("change", handleSelectMovie);
moviePicker.addEventListener("change", handleSetMovieIndexToLocalStorage);

seats
  .filter(seat => !seat.classList.contains("occupied"))
  .forEach(seat => {
    seat.addEventListener("click", handleSelectSeat);
    seat.addEventListener("click", handleSetSelectedSeatsToLocalStorage);
  })