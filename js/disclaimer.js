fillDisclaimer = (disclaimerItems) => {
    let ul = document.getElementById("disclaimerList");

    disclaimerItems.forEach(item => {
        let li = document.createElement('li');
        li.className = "disclaimerItem"
        li.innerHTML = item.description;
        ul.appendChild(li)
    });
}

 getDisclaimerItems = () => {
    $.getJSON("page_assets/disclaimerItems.json", (response) => {
        fillDisclaimer(response.disclaimerItems)
    })
}

submitDisclaimer = () => {
    console.log('disclaim submited');
}

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

preventDefaultForm = () => {
    let form = document.getElementById('agreementForm');
    if (form.attachEvent) {
        form.attachEvent("submit", processForm);
    } else {
        form.addEventListener("submit", processForm);
    }
}
controlFader = () => {
    let list = document.getElementById('disclaimerList');
    let fader = document.getElementById('fader');
    list.addEventListener('scroll', () => {
        if (list.scrollHeight - list.scrollTop === list.clientHeight) {
            fader.style.opacity = '0'
        } else {
            fader.style.opacity = '1'
        }
    })
}

startDisclaimer = () => {
    getDisclaimerItems();
    preventDefaultForm();
    // controlFader();

    document.getElementById('backButton').addEventListener('click', () => {
        stateController.changeState(6)
    })
}

startDisclaimer()