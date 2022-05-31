/*
 * Initialize Tourguide.js
*/
var tourguide = new Tourguide();
function startTour() {
	tourguide.start();
}
// Attach the touruide start evene to the button press
var tourbutton = document.getElementById("tourbutton");
tourbutton.addEventListener("click", startTour);