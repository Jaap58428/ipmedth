startSettings = () => {

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

startSettings();