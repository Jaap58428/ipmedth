startLevelSelect = () => {
    
    let level2button = document.getElementById('level_2_button');
    let level4button = document.getElementById('level_4_button');

    let checkDisclaimer = (levelChoice) => {
        if (stateController.getLocalStorage('disclaimerAgreement') === true) {
            stateController.levelSelected = levelChoice;
            stateController.changeState(7)
        } else {
            stateController.levelSelected = levelChoice
            stateController.changeState(1)
        }
    }

    level2button.addEventListener('click', () => {
        checkDisclaimer(2)
    })
    level4button.addEventListener('click', () => {
        checkDisclaimer(4)
    })


    document.getElementById('backButton').addEventListener('click', () => {
        stateController.changeState(2)

    })


}

startLevelSelect();