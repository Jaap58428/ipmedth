startSettings = () => {
    document.getElementById('backButton').addEventListener('click', () => {
        stateController.changeState(2)
    })

}

startSettings();