startQuestions = () => {

    // I assume you want to handle some score writing here
    // You can get the current (finished) level from stateController.levelSelected
    // Writing away data is also done via the stateController's data functions
    
    // When you know what kind of datastructure you would like to use please let me know
    // Then I can start working on the Score's screen
    
    document.getElementById("INSERT_YOUR_BUTTON").addEventListener('click', () => {
        stateController.changeState(2)  // Use this to navigate back to main menu
    })

}

startQuestions();