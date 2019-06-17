/* Author: Jaap Kanbier (2019) */
startFirstTime = () => {
    // add clicklisteners to button
    document.getElementById('backButton').addEventListener('click', () => {
        stateController.changeState(2)
    })

    let slider = document.getElementById("myRange");

    // if the user has height saved, get and show this
    if (stateController.getLocalStorage('playerHeight') !== null) {
        slider.value = stateController.getLocalStorage('playerHeight')
    }
    let output = document.getElementById("demo");
    output.innerHTML = slider.value + " cm"; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
        output.innerHTML = this.value + " cm";
    }

    // set clicklistener on submit button
    let startTutorial = document.getElementById("startButton");
    startTutorial.addEventListener('click', () => {
        // validate user input
        testSliderInput()

        // set stored values for future use
        stateController.setLocalStorage('playedBefore', true)
        stateController.setLocalStorage('playerHeight', slider.value)

        // start first level
        stateController.levelSelected = 0
        stateController.changeState(7)
    })

    // check if slider.value is a legitamate input
    testSliderInput = () => {
        testAssert(typeof slider.value === 'string', 'Slider input expected to be a string.')
        testAssert(Number(slider.value) > 0, 'Slider input expected to be greater than zero.')
        testAssert(Number(slider.value) < 300, 'Slider input expected to be lesser than 300.')
    }

}

setTimeout(startFirstTime, 100);
