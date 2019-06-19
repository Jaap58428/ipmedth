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
var gekeurd = document.querySelector(".gekeurd");
var ademhaling = document.querySelector(".ademhaling");
var voortbeweging = document.querySelector(".voortbeweging");

var instructionStep = "Headset_instruction";
document.getElementById('nextButton').addEventListener('click', () => {
  switch (instructionStep) {
    case "Headset_instruction":
      console.log("Headset Settings");
      headset.style.display = "block";
      room.style.display = "none";
      instructionStep = "Gekeurd_instruction";
      break;
    case "Gekeurd_instruction":
      console.log("Gekeurd Settings");
      gekeurd.style.display = "block";
      headset.style.display = "none";
      instructionStep = "Ademhaling_instruction";
      break;
    case "Ademhaling_instruction":
      console.log("Gekeurd Settings");
      ademhaling.style.display = "block";
      gekeurd.style.display = "none";
      instructionStep = "Voortbeweging_instruction";
      break;
    case "Voortbeweging_instruction":
      console.log("Voortbeweging Settings");
      voortbeweging.style.display = "block";
      ademhaling.style.display = "none";
      instructionStep = "empty_instruction";
      break;
    case "empty_instruction":
      stateController.changeState(2);
      break;
    default:
    instructionStep = "empty_instruction";
  }
})
