var options = {
	strings: ['Ideate', 'Innovate', 'Create', 'Hack', 'Some', 'More', 'Random', 'Buzz', 'Words'],
	typeSpeed: 100,
	loop: true,
	smartBackspace: false,
	showCursor: true,
	cursorChar: '_',
	backSpeed: 40,
	backDelay: 2000,
};
var typed = new Typed('.typed', options);

document.getElementById('day-1').addEventListener('click', () => {
	document.getElementById('schedule-D1').style.display = 'unset';
	document.getElementById('schedule-D2').style.display = 'none';
});

document.getElementById('day-2').addEventListener('click', () => {
	document.getElementById('schedule-D1').style.display = 'none';
	document.getElementById('schedule-D2').style.display = 'unset';
});
