/* Author: Jaap Kanbier (2019) */
fillDisclaimer = (disclaimerItems) => {
    let ul = document.getElementById("disclaimerList");

    disclaimerItems.forEach(item => {
        let li = document.createElement('li');
        li.className = "disclaimerItem"
        li.innerHTML = item.description;
        ul.appendChild(li)
    });
}

/**
 * Function: loads strings of disclaimer texts from accompanied file
 * Arguments: null
 * Returns: null
 */
getDisclaimerItems = () => {
    // loads JSON file with sets of disclaimers strings
    $.getJSON("page_assets/disclaimerItems.json", (response) => {
        // at callback fill the items in UI
        fillDisclaimer(response.disclaimerItems)
    })
}

/**
 * Function: Proces form and check input
 * Arguments: clickevent
 * Returns: false
 */
processForm = (e) => {
    if (e.preventDefault) e.preventDefault();

    if (e.target[0].checked) {
        stateController.setLocalStorage('disclaimerAgreement', true);
        stateController.changeState(7);
    } else {
        alert("Voor het gebruik van de applicatie is uw toestemming op bovenstaande zaken vereist.")
        document.getElementById('agreement').classList.add('disclaimerAlert')
    }

    // You must return false to prevent the default form behavior
    return false;
}

/**
 * Function: Setup form to not use default html functionality
 * ARgument: none
 * Returns: none
 */
preventDefaultForm = () => {
    let form = document.getElementById('agreementForm');
    if (form.attachEvent) {
        form.attachEvent("submit", processForm);
    } else {
        form.addEventListener("submit", processForm);
    }
}

/**
 * Function: global page logic
 * Arguments: none
 * Returns: none
 */
startDisclaimer = () => {
    getDisclaimerItems();
    preventDefaultForm();

    // ad clicklistener to back button
    document.getElementById('backButton').addEventListener('click', () => {
        stateController.changeState(6)
    })
}

// start page script
startDisclaimer()