const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.seat--occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = Number(movieSelect.value);

// Save selected seats to localStorage
function saveSelectedSeatsToLocalStorage(selectedSeats) {
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
}

// Save movie selected and price to localStorage
function saveMovieDataToLocalStorage(movieSelected, moviePrice) {
  localStorage.setItem('movieIndex', movieSelected);
  localStorage.setItem('moviePrice', moviePrice);
}

// Get selected seats from localStorage
function getSelectedSeatsFromLocalStorage() {
  const selectedSeats = localStorage.getItem('selectedSeats');

  try {
    return selectedSeats ? JSON.parse(selectedSeats) : []
  } catch (e) {
    return [];
  }
}

// Get selected movie and price from localStorage
function getMovieAndPriceFromLocalStorage() {
  const movie = localStorage.getItem('movieIndex');
  const price = localStorage.getItem('moviePrice');

  return {
    movie,
    price
  };
}

// Renders selected seats, selected movie and price
function populateUI(selectedSeats, movieAndPrice) {
  let everySeat = [...seats];
  selectedSeats.forEach(seat => everySeat[seat].classList.add('seat--selected'));

  movieSelect.selectedIndex = movieAndPrice['movie'];
  ticketPrice = movieAndPrice['price'];

  updateCountAndPrice();
}

// Update total and count
function updateCountAndPrice() {
  const selectedSeats = document.querySelectorAll('.row .seat--selected')
  const selectedSeatsCount = selectedSeats.length;

  saveSelectedSeatsToLocalStorage(selectedSeats);

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = Number(e.target.value);
  updateCountAndPrice();
  saveMovieDataToLocalStorage(e.target.selectedIndex, e.target.value);
})

// Seat click event
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') && 
    !e.target.classList.contains('seat--occupied')) {

    e.target.classList.toggle('seat--selected');

    updateCountAndPrice();
  } 
})

populateUI(getSelectedSeatsFromLocalStorage(), getMovieAndPriceFromLocalStorage());