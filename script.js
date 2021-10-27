let lastPos = document.body.scrollTop || document.documentElement.scrollTop,
    perspective = 300,
    zSpacing = -450;

    (zVals = []),
    ($frames = $(".frame")),
    (frames = $frames.toArray()),
    (message = document.getElementById("overlay"));
    numFrames = $frames.length;

for (var i = 0; i < numFrames; i++) {
  zVals.push((numFrames - i) * zSpacing); //array of z-values
}

//function on scroll
$(window).scroll(function (d, e) {

  let top = document.body.scrollTop || document.documentElement.scrollTop,
    delta = lastPos - top;
    lastPos = top;

  // for every frame, translateZ it "newVal" pixels
  for (let i = 0; i < numFrames; i++) {
    let newZVal = (zVals[i] += delta * -1.5),
      frame = frames[i],
      transform = "translateZ(" + newZVal + "px)",
      opacity = newZVal < 200 ? 1 : 1 - parseInt(((newZVal - 200) / (perspective - 200)) * 10) / 10,
      //if the newZVal is less than 200, then the opacity is one. Else, fade out.
      display = newZVal > perspective + 100  || newZVal < -1500 ? "none" : "block";

    //if the newZVal is greater than the perspective, make the display none, if not make the display block
    frame.setAttribute("style", "-webkit-transform:" + transform + ";-moz-transform:" + transform + ";display:" + display + ";opacity:" + opacity);
  }
});
const maxRotationDegrees = 2 ;
document.body.addEventListener("mousemove", onMove);
document.body.addEventListener("touchmove", onMove);
let container = document.querySelectorAll(".frame");
function onMove(e) {
  let mousePercX = (e.pageX / document.body.clientWidth) * 2 - 1;
  let mousePercY = (e.pageY / document.body.clientHeight) * 2 - 1;

  let rotateX = mousePercX * maxRotationDegrees;
  let rotateY = mousePercY * -maxRotationDegrees * 0.5;

  for (let i = 0; i < container.length; i++) {
    container[i].style.transform = `translateZ(${zVals[i]}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  }
}
