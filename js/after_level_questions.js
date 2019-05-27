startQuestions = () => {
    getQuestionnaireItems();
    preventDefaultForm();

    // I assume you want to handle some score writing here
    // You can get the current (finished) level from stateController.levelSelected
    // Writing away data is also done via the stateController's data functions
    
    // When you know what kind of datastructure you would like to use please let me know
    // Then I can start working on the Score's screen
    
    document.getElementById("backButton").addEventListener('click', () => {
        stateController.changeState(2)  // Use this to navigate back to main menu
    })
    
}

getQuestionnaireItems = () => {
    // If current level = introductionary level, do first questionnaire
    // Else if current level = final level, then do final questionnaire
    // In all other cases, do usual questionnaire
    console.log("*afterlevelquestions() statecheck: " + stateController.levelSelected);
    switch (stateController.levelSelected){
        
        case 0:
            $.getJSON("page_assets/after_level_questions_introduction.json", (response) => {
                fillQuestionnaire(response.questionnaireItems)
            })
            break;
        case 4:
            $.getJSON("page_assets/after_level_questions_final.json", (response) => {
                fillQuestionnaire(response.questionnaireItems)
            })
            break;
        default:
            $.getJSON("page_assets/after_level_questions_default.json", (response) => {
                fillQuestionnaire(response.questionnaireItems)
            })
            break;
    }   
}

// Fill Questionnaire page with the questions from the corresponding JSON file
fillQuestionnaire = (questionnaireItems) => {
    console.log("fillQuestionnaire(); let's fill the quesitonnaire. ")
    let form = document.getElementById("questionnaireForm");
    questionnaireItems.forEach(item => {
        switch(item.type){
            case "5-likert": 
                addQuestion(item.question);
                let lik5Scale = addLikertScale(item.title, 5);
                form.append(lik5Label, lik5Scale);
                break;
            case "10-likert": 
                addQuestion(item.question);        
                let lik10Scale = addLikertScale(item.title, 10);
                form.append(lik10Label, lik10Scale);
                break;
            case "textArea": 
                addQuestion(item.question);
                let textArea = document.createElement('textarea');
                textArea.name = "comment";
                textArea.placeholder = "Hier typen...";
                let br = document.createElement('br')
                form.append(label, br, textArea);
                break;
            default:
                console.warn("The type given to a questionnaire Item is unknown.");
                break;
        }
    });
}

addQuestion = (question) => {
    let label = document.createElement('label');
    label.className = "questionnaireItem";
    label.innerHTML = question;
} 

// Add the Likert scale 
// TODO: NEEDS TO BE MADE PRETTY FOR MORE THAN 5PT
addLikertScale = (title, likertAmount) => {
    let ul = document.createElement("ul");
    ul.className = "likert";
    for (i=0;i<likertAmount;i++){
        let li = document.createElement("li");
        let radioBtn = document.createElement("input");
        radioBtn.type = "radio";
        radioBtn.name = title;
        radioBtn.value = i;
        li.appendChild(radioBtn);
        ul.appendChild(li);
    }
    return ul;
}

preventDefaultForm = () => {
    let form = document.getElementById('questionnaireForm');
    if (form.attachEvent) {
        form.attachEvent("submit", processForm);
    } else {
        form.addEventListener("submit", processForm);
    }
}

processForm = (e) => {
    if (e.preventDefault) e.preventDefault();
    console.log("processing evaluation form");

    // Put all answers of this questionnaire into a JSON object    
    var formAnswers = [{}];
    Array.prototype.forEach.call(e.target, function(target){
        if (target.checked){
            console.log("checked:"+ target.name +" " + target.value);
            formAnswers[0][target.name] = target.value;       
        } else {
            console.log("not checked!");
        }
    })

    // Check whether the JSON with all the questionnaire answers already exists, if not create one 
    if (questAnswers == null){
        var questAnswers = {};
    } else {
        questAnswers =  stateController.getLocalStorage('questAnswers');
    }     
    
    // Save the answers from this form in the master JSON as a new entry
    // GET LEVEL NUMBER FROM THE STATECONTROLLER; FOR NOW A DEFAULT VALUE
    // var currLevel = stateController.levelSelected;
    var currLevel = "evalLevel"+2;
    questAnswers[currLevel] = formAnswers;

    // questAnswers.levelnr = formAnswers;
    console.log(JSON.stringify(questAnswers));
    
    // You must return false to prevent the default form behavior
    return false;
}

startQuestions();