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


// TODO: break final questionnaire up in 2 pages/parts so the 5-points and 10-points scales aren't on the same page.
getQuestionnaireItems = () => {
    // Pick the correct questionnaire JSON file depending on the stage completed
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
            $.getJSON("page_assets/after_level_questions_final.json", (response) => {
                fillQuestionnaire(response.questionnaireItems)
            });
            break;
    }   
}

// Fill Questionnaire page with the questions from the corresponding JSON file
fillQuestionnaire = (questionnaireItems) => {
    let form = document.getElementById("questionnaireForm");
    questionnaireItems.forEach(item => {
        let label;
        let scale;
        switch(item.type){
            case "5-likert": 
                label = addQuestion(item.question);
                scale = addLikertScale(item.title, 5);
                form.append(label, scale);
                break;
            case "10-likert": 
                label = addQuestion(item.question);        
                scale = addLikertScale(item.title, 10);
                form.append(label, scale);
                break;
            case "textArea": 
                label = addQuestion(item.question);
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

// Create a question label
addQuestion = (question) => {
    let label = document.createElement('label');
    label.className = "questionnaireItem";
    label.innerHTML = question;
    return label;
} 

// Add the Likert scale 
// TODO: NEEDS TO BE MADE PRETTY FOR MORE THAN 5PT
addLikertScale = (title, likertAmount) => {
    let ul = document.createElement("ul");
    ul.className = "likert";
    for (i=0;i<likertAmount;i++){
        let li = document.createElement("li");
        li.className = "likert-"+likertAmount;
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
    var formAnswers = {};
    Array.prototype.forEach.call(e.target, function(target){
        if (target.checked || target.name == "comment") {
            // console.log("checked:"+ target.name +" " + target.value);
            formAnswers[target.name] = target.value;       
        } else {
            // do nothing
        }
    });

    // TODO: GET LEVEL NUMBER FROM THE STATECONTROLLER; FOR NOW A DEFAULT VALUE
    var currLevel = "evalLevel"+2;
    
    // Save the answers from this form in the master JSON as a new entry
    var qaObj =  stateController.getLocalStorage('levelEvaluations'); // Retrieve evaluation answers object from local storage
    if (jQuery.isEmptyObject(qaObj)) { // If there's no evaluation answer obj yet, make one 
        qaObj = {};
        qaObj[currLevel] = [];
        qaObj[currLevel].push(formAnswers);
        stateController.setLocalStorage('levelEvaluations', qaObj);
    } else {
        if (qaObj.hasOwnProperty(currLevel)){ // If entry for current level exists, add new evaluations to array
            qaObj[currLevel].push(formAnswers);
        } else { // Otherwise make new array for the answers
            qaObj[currLevel] = [];
            qaObj[currLevel].push(formAnswers);
        }
        stateController.setLocalStorage('levelEvaluations', qaObj); // Save to local storage
    }


    stateController.changeState(2); // return to level select menu

    // You must return false to prevent the default form behavior
    return false;
}

startQuestions();