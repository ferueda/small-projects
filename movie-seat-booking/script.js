const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.seat--occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = Number(movieSelect.value);

// Update total and count
function updateCountAndPrice() {
  const selectedSeats = document.querySelectorAll('.row .seat--selected')
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = Number(e.target.value);
  updateCountAndPrice();
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