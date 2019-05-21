startQuestions = () => {

    // I assume you want to handle some score writing here
    // You can get the current (finished) level from stateController.levelSelected
    // Writing away data is also done via the stateController's data functions
    
    // When you know what kind of datastructure you would like to use please let me know
    // Then I can start working on the Score's screen
    
    document.getElementById("INSERT_YOUR_BUTTON").addEventListener('click', () => {
        stateController.changeState(2)  // Use this to navigate back to main menu
    })

    // If current level = introductionary level, do first questionnaire
    // Else if current level = final level, then do final questionnaire
    // In all other cases, do usual questionnaire
    switch (stateController.levelSelected){
        case 0:
            $.getJSON("page_assets/after_level_qeustions_introduction.json", (response) => {
                fillQuestionnaire(response.questionnaireItems)
            })
            break;
        case 4:
            $.getJSON("page_assets/after_level_qeustions_final.json", (response) => {
                fillQuestionnaire(response.questionnaireItems)
            })
            break;
        default:
            $.getJSON("page_assets/after_level_qeustions_default.json", (response) => {
                fillQuestionnaire(response.questionnaireItems)
            })
            break;
    }   
}


fillQuestionnaire = (questionnaireItems) => {

    let ul = document.getElementById("questionnaireList");
    questionnaireItems.forEach(item => {
        switch(item.type){
            case "5-likert": 
                // do smth
                break;
            case "10-likert": 
                // do smth
                break;
            case "textArea": 
                // do smth
                break;
            default:
                console.warn("The type given to a questionnaire Item is unknown.");
                break;
        }
        let li = document.createElement('li');
        li.className = "questionnaireItem";
        li.innerHTML = item.question;
        ul.appendChild(li);
    });
}

startQuestions();