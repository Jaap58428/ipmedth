startSettings = () => {

    let slider = document.getElementById("myRange");
    let output = document.getElementById("demo");
    slider.value = stateController.getLocalStorage('playerHeight')
    output.innerHTML = slider.value + " cm"; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
        output.innerHTML = this.value + " cm";
    }

    document.getElementById('submitButton').addEventListener('click', ()=>{
        stateController.setLocalStorage('playerHeight', slider.value)
        stateController.changeState(5)
    })

    document.getElementById('returnButton').addEventListener('click', ()=>{
        stateController.changeState(5)
    })




}

startSettings();