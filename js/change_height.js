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
        testSliderInput()
        stateController.setLocalStorage('playerHeight', slider.value)
        stateController.changeState(5)
    })

    document.getElementById('returnButton').addEventListener('click', ()=>{
        stateController.changeState(5)
    })

    // check if slider.value is a legitamate input
    testSliderInput = () => {
        testAssert(typeof slider.value === 'string', 'Slider input expected to be a string.')
        testAssert(Number(slider.value) > 0, 'Slider input expected to be greater than zero.')
        testAssert(Number(slider.value) < 300, 'Slider input expected to be lesser than 300.')
    }



}

startSettings();