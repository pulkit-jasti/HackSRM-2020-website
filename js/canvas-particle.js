'use strict';

const state = {
	max: 70,
	canvas: null,
	context: null,
	particles: [],
	stats: null,
	/*colors: ['#FF5507', '#070E14', '#070E14', '#070E14', '#070E14', '#070E14'],*/
	/*colors: ['#FF5507', '#9663ff', '#ea3160', '#00c382', '#ffc000', '#00c3ff'],*/
	colors: ['#FF5507', '#f8f8f8', '#eee', '#fff', '#ddd', '#ccc'],
};

class Particle {
	constructor(id = 0) {
		this.id = id;
		this.type = this.randomizeType();
		this.inBounds = false;
		this.coords = {
			x: Math.round(Math.random() * state.canvas.width),
			y: Math.round(Math.random() * state.canvas.height),
		};
		this.velocity = {
			x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 0.7),
			y: (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 0.7),
		};
		this.alpha = 0.1;
		this.hex = this.randomFromArray(state.colors);
		this.color = this.hexToRGBA(this.hex, this.alpha);
		this.strokeWidth = Math.random() * (Math.random() > 0.5 ? 1.5 : 2.5);

		switch (this.type) {
			case 'bubble':
				this.diameter = this.getCircleDiameter();
				break;

			case 'line':
				this.angle = Math.atan2(this.coords.y, this.coords.x);
				this.length = this.randomFromArray([5, 7, 3, 10]);
				this.rotateSpeed = this.randomFromArray([10, 30, 60, 120]);
				this.rotateClockwise = Math.random() < 0.5;
				break;
		}
	}

	getCircleDiameter() {
		let diameter = 0;

		while (diameter < 2) {
			diameter = Math.random() * 7 * 2;
		}

		return diameter;
	}

	update() {
		if (this.alpha < 1) {
			this.alpha += 0.01;
			this.color = this.hexToRGBA(this.hex, this.alpha);
		}

		this.coords.x += this.velocity.x;
		this.coords.y += this.velocity.y;

		if (this.type === 'line') {
			let angle = Math.PI / this.rotateSpeed;
			this.angle += this.rotateClockwise ? -Math.abs(angle) : Math.abs(angle);
		}

		return this.withinBounds();
	}

	draw() {
		state.context.lineWidth = this.strokeWidth;
		state.context.strokeStyle = this.color;
		state.context.save();

		switch (this.type) {
			case 'line':
				state.context.translate(this.coords.x / 2, this.coords.y / 2);
				state.context.rotate(this.angle);
				state.context.beginPath();
				state.context.moveTo(-this.length / 2, 0);
				state.context.lineTo(this.length / 2, 0);
				break;

			case 'bubble':
				state.context.beginPath();
				state.context.arc(this.coords.x, this.coords.y, this.diameter, 0, Math.PI * 2, false);
				break;
		}

		state.context.stroke();
		state.context.restore();
	}

	withinBounds() {
		let boundX = state.canvas.width / 2 + 5;
		let boundY = state.canvas.height / 2 + 5;
		let x = this.coords.x / 2;
		let y = this.coords.y / 2;
		this.inBounds = !(x > boundX || x < 0 - 5 || y > boundY || y < 0 - 5);
		return this.inBounds;
	}

	hexToRGBA(hex, alpha) {
		const trimHex = hex => {
			return hex.replace('#', '');
		};

		let red = parseInt(trimHex(hex).substring(0, 2), 16);
		let green = parseInt(trimHex(hex).substring(2, 4), 16);
		let blue = parseInt(trimHex(hex).substring(4, 6), 16);
		return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
	}

	randomFromArray(arr) {
		return _.sample(_.shuffle(arr));
	}

	randomizeType() {
		let types = Array(4).fill('bubble');
		types.push('line');
		return this.randomFromArray(types);
	}
}

const updateCanvasSize = () => {
	state.canvas.width = state.canvas.parentNode.offsetWidth * 2;
	state.canvas.height = state.canvas.parentNode.offsetHeight * 2;
	state.canvas.style.width = state.canvas.parentNode.offsetWidth + 'px';
	state.canvas.style.height = state.canvas.parentNode.offsetHeight + 'px';
};

let pids = 0;

const generate = () => {
	if (state.particles.length < state.max) {
		for (let i = state.particles.length; i < state.max; i++) {
			state.particles.push(new Particle(pids++));
		}
	}
};

const update = () => {
	if (state.particles.length < state.max - 5) generate();
	state.particles = state.particles.filter(particle => particle.update()); // Render the canvas

	state.context.clearRect(0, 0, state.canvas.width, state.canvas.height);
	state.particles.forEach(particle => particle.draw()); // DO IT AGAIN!

	requestAnimationFrame(update);
};

const init = () => {
	state.canvas = document.querySelector('#canvas-particles');
	state.context = state.canvas.getContext('2d');
	updateCanvasSize();
	generate();
	update();
	window.addEventListener('resize', updateCanvasSize);
};

document.addEventListener('DOMContentLoaded', () => init());

window.reloadParticles = event => {
	event.preventDefault();
	state.particles = [];
	state.context.clearRect(0, 0, state.canvas.width, state.canvas.height);
};

window.logParticles = (event, type = null) => {
	event.preventDefault();

	if (type === null) {
		console.log(state.particles);
		return;
	}

	console.log(state.particles.filter(particle => particle.type === type));
};
