startInstructions = () => {
    stateController.setLocalStorage('instructionsViewed', true)


    document.getElementById('backButton').addEventListener('click', () => {
        stateController.changeState(2)
    })

}

startInstructions();