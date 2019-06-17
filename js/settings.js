/* Author: Jaap Kanbier (2019) */
startSettings = () => {

    // add clicklisteners to buttons
    document.getElementById('deleteDataButton').addEventListener('click', () => {
        stateController.changeState(8)
    })
    document.getElementById('changeUserHeightButton').addEventListener('click', ()=>{
        stateController.changeState(9)
    })
    document.getElementById('backButton').addEventListener('click', () => {
        stateController.changeState(2)
    })

}

// start page script
startSettings();