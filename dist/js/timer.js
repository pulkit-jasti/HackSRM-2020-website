// Set the date we're counting down to
var countDownDate = new Date('Nov 22, 2020 11:30:00').getTime();

// Update the count down every 1 second
var x = setInterval(function () {
	var now = new Date().getTime();

	// Find the distance between now and the count down date
	var distance = countDownDate - now;

	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

	document.getElementById('dayTens').innerHTML = places(days).tens;
	document.getElementById('dayOnes').innerHTML = places(days).ones;

	document.getElementById('hourTens').innerHTML = places(hours).tens;
	document.getElementById('hourOnes').innerHTML = places(hours).ones;

	document.getElementById('minTens').innerHTML = places(minutes).tens;
	document.getElementById('minOnes').innerHTML = places(minutes).ones;

	if (places(hours).ones < 0 && places(minutes).ones < 0) {
		clearInterval(x);
		console.log('Hackathon Begins');
		hackathonBegins();

		document.getElementById('dayTens').innerHTML = '0';
		document.getElementById('dayOnes').innerHTML = '0';

		document.getElementById('hourTens').innerHTML = '0';
		document.getElementById('hourOnes').innerHTML = '0';

		document.getElementById('minTens').innerHTML = '0';
		document.getElementById('minOnes').innerHTML = '0';
	}
}, 1000);

function places(num) {
	let ones = num % 10;
	let tens = (num - ones) / 10;

	return {
		ones: ones,
		tens: tens,
	};
}

function hackathonBegins() {
	document.getElementById('startsIn').innerHTML = 'Hackathon has started 🎉🎊';
	confetti.start(20000);
}
