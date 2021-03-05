//COPYRIGHT YEAR AUTOMATIC CHANGE SCRIPT

let startYear = 2020;
let currentYear = new Date().getFullYear();

if(startYear === currentYear){
	document.getElementById('copyright').innerHTML = `Copyright © ${startYear} HackSRM 3.0 | <a href="https://github.com/HackSRM/hacksrm.github.io/blob/master/LICENSE" target="_blank">License</a>`
} else {
	document.getElementById('copyright').innerHTML = `Copyright © ${startYear} - ${currentYear} HackSRM 3.0 | <a href="https://github.com/HackSRM/hacksrm.github.io/blob/master/LICENSE" target="_blank">License</a>`
}