

//selected DOM
const movieSelector = document.getElementById('movie_select_option');
let movieSelector_price = +document.getElementById('movie_select_option').value;

const seatContainer = document.querySelector('.move_seats_container');
const seat = document.querySelectorAll('.row .seat:not(.Occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');

populate();


//storing movie in localstorage
function movie_storage(movie_index, movie_value){

localStorage.setItem('movieIndex', movie_index);
localStorage.setItem('movieValue', movie_value);

}


//change movie price
movieSelector.addEventListener('change', (e)=>{
	movieSelector_price = +e.target.value;
	movie_storage(e.target.value, e.target.selectedIndex);

	updateCountTotal();
})



//updated count and price
function updateCountTotal(){
	const selectedSeat = document.querySelectorAll('.row .seat.selected'); 
	const selectedSeatLength = selectedSeat.length;
	const seatIndex = [...selectedSeat].map((seatItem)=>{
		return [...seat].indexOf(seatItem);

	})

	localStorage.setItem('seatSelected', JSON.stringify(seatIndex));

	count.innerHTML = selectedSeatLength;
	total.innerHTML =selectedSeatLength * movieSelector_price;
}

//populate UI
function populate(){
	const selectedSeats = JSON.parse(localStorage.getItem('seatSelected'));

	if (selectedSeats !==null && selectedSeats.length > 0) {
		seat.forEach((seats, index)=>{
			if (selectedSeats.indexOf(index) > -1) {
				seats.classList.add('selected');
			}
		})
	}

	//getting selected movies index from localstorage
	const selectedMovieIndex = localStorage.getItem('movieIndex');
	if (selectedMovieIndex !==null) {
		movieSelector_price.selectedIndex = selectedMovieIndex;
	}

}



//event listener
seatContainer.addEventListener('click', (e)=>{
	if(e.target.classList.contains('seat') && !e.target.classList.contains('Occupied')){
		 e.target.classList.toggle('selected');

		updateCountTotal();

	}

})


//initial count
updateCountTotal();
