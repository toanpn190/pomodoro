const States = {
  OFF: 0,
  ON: 1,
}

let timer = States.OFF;
let testSound = States.OFF;
let totalCountdown = 0;
let audio = new Audio("60832__pogotron__music-box.wav");


function changeDisplayTime() {
  let hours = Math.floor(totalCountdown / 3600);
  let minutes = Math.floor((totalCountdown - 3600 * hours) / 60);
  let seconds = Math.floor(totalCountdown - 3600 * hours - 60 * minutes);

  document.getElementById("timer").innerHTML = hours.toString(10).padStart(2, "0") + ":" 
                                             + minutes.toString(10).padStart(2, "0") + ":"
                                             + seconds.toString(10).padStart(2, "0");
}


let countdownInterval = setInterval(() => {
  changeDisplayTime();

  if ((timer === States.ON) && (totalCountdown > 0)) {
    totalCountdown--;
    
    // The first time it reaches 0, alarm sound starts
    if (totalCountdown === 0) {
      audio.load();
      audio.play();
    }
  }
}, 1000);


document.addEventListener("DOMContentLoaded", function() {

  // Modifying START/STOP button & reset timer when STOP
  let startButton = document.getElementById("timer-start");
  startButton.onclick = () => {
    if (timer === States.OFF) {
      timer = States.ON;
      startButton.innerHTML = "Stop";
    } else {
      timer = States.OFF;
      totalCountdown = 0;
      startButton.innerHTML = "Start";
    }
  };

  // Modifying SOUND TEST/STOP button
  let soundButton = document.getElementById("sound-test");
  soundButton.onclick = () => {
    if (testSound === States.OFF) {
      testSound = States.ON;
      soundButton.innerHTML = "Stop";
      audio.load();
      audio.play();
    } else {
      testSound = States.OFF;
      soundButton.innerHTML = "Sound Test";
      audio.pause();
    }
  }

  let buttons = document.querySelectorAll(".button-add-time");
  for (let i = 0; i < buttons.length; i++) {
    buttons.item(i).onclick = () => {
      totalCountdown += parseInt(buttons.item(i).innerHTML) * 60;
      changeDisplayTime();
    };
  }
});