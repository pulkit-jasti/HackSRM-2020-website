//SCHEDULE SECTION BUTTONS

let day1 = document.getElementById('schedule-D1');
let day2 = document.getElementById('schedule-D2');
let day3 = document.getElementById('schedule-D3');

document.getElementById('day-1').addEventListener('click', () => {
	day1.style.display = 'unset';
	day2.style.display = 'none';
	day3.style.display = 'none';
});

document.getElementById('day-2').addEventListener('click', () => {
	day1.style.display = 'none';
	day2.style.display = 'unset';
	day3.style.display = 'none';
});

document.getElementById('day-3').addEventListener('click', () => {
	day1.style.display = 'none';
	day2.style.display = 'none';
	day3.style.display = 'unset';
});

// Contact section image change on reload
document.getElementById('contact-image').innerHTML = `<img src="assets/images/contact/contact-${Math.floor(Math.random() * 6) + 1}.svg" alt="" />`;
