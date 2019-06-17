/* Author: Dick van Delft (2019) */
startInstructions = () => {
    stateController.setLocalStorage('instructionsViewed', true)


    document.getElementById('backButton').addEventListener('click', () => {
        stateController.changeState(2)
    })

}

startInstructions();



var room = document.querySelector(".room");
var headset = document.querySelector(".headset");
var instructionStep = 0;
document.getElementById('nextButton').addEventListener('click', () => {
  switch (instructionStep) {
    case 0:
      room.style.display = "none";
      headset.style.display = "block";
      instructionStep++;
      break;
    case 1:
      room.style.display = "none";
      headset.style.display = "none";
      instructionStep++;
      break;
    case 2:
      room.style.display = "none";
      headset.style.display = "none";
      break;
    default:
      room.style.display = "block";
      headset.style.display = "none";
      instructionStep++;
  }
})

document.getElementById('prevButton').addEventListener('click', () => {
  switch (instructionStep) {
    case 0:
      room.style.display = "block";
      headset.style.display = "none";
      break;
    case 1:
      room.style.display = "block";
      headset.style.display = "none";
      instructionStep--;
      break;
    case 2:
      room.style.display = "none";
      headset.style.display = "block";
      instructionStep--;
      break;
    default:
      room.style.display = "block";
      headset.style.display = "none";
      instructionStep++;
  }
})
