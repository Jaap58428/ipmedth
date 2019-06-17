/* Autor: Jaap Kanbier (2019) */
startSettings = () => {

    // add clicklisteners to buttons
    document.getElementById('deleteDataButton').addEventListener('click', () => {
        stateController.deleteLocalStorage();
        stateController.changeState(0);
    })
    document.getElementById('backButton').addEventListener('click', () => {
        stateController.changeState(5);
    })

}

startSettings();