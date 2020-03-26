// If you don't want the particles, change the following to false:
const doParticles = true;




// Do not mess with the rest of this file unless you know what you're doing :P

function getWidth() { // credit to travis on stack overflow
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}
if (doParticles) {
	if (getWidth() < 400) $.firefly({minPixel: 1,maxPixel: 2,total: 20});
	else $.firefly({minPixel: 1,maxPixel: 3,total: 40});
}
