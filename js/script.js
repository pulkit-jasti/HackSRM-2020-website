var options = {
	strings: [
		'Create',
		'Ideate',
		'Innovate',
		'Design',
		'Prototype',
		'Coffee',
		'Interact',
		'Test',
		'Break',
		'Learn',
		'Coffee',
		'Build',
		'Deploy',
		'Document',
		'Hack',
		'Pitch',
		'Network',
	],
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

// Contact section image change on reload
//document.getElementById('contact-image').innerHTML = `<img src="assets/images/contact/contact-${Math.floor(Math.random() * 8) + 1}.svg" alt="" />`;

//SMOOTH SCROLLING
$(document).ready(function () {
	// Add smooth scrolling to all links
	$('a').on('click', function (event) {
		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== '') {
			// Prevent default anchor click behavior
			event.preventDefault();

			// Store hash
			var hash = this.hash;

			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body').animate(
				{
					scrollTop: $(hash).offset().top,
				},
				800,
				function () {
					// Add hash (#) to URL when done scrolling (default click behavior)
					window.location.hash = hash;
				}
			);
		} // End if
	});
});
