const fillDisclaimer = (disclaimerItems) => {
    let ul = document.getElementById("disclaimerList");

    disclaimerItems.forEach(item => {
        let li = document.createElement('li');
        li.className = "disclaimerItem"
        li.innerHTML = item.description;
        ul.appendChild(li)
    });
}

const getDisclaimerItems = () => {
    $.getJSON("disclaimerItems.json", (response) => {
        fillDisclaimer(response.disclaimerItems)
    })
}

const submitDisclaimer = () => {
    console.log('disclaim submited');
}

const processForm = (e) => {
    if (e.preventDefault) e.preventDefault();

    if (e.target[0].checked) {
        setCookie('disclaimerAgreement', 'true', 30);
        window.location = "menu.html";
    }

    // You must return false to prevent the default form behavior
    return false;
}

const preventDefaultForm = () => {
    let form = document.getElementById('agreementForm');
    if (form.attachEvent) {
        form.attachEvent("submit", processForm);
    } else {
        form.addEventListener("submit", processForm);
    }
}
const controlFader = () => {
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

const main = () => {
    getDisclaimerItems();
    preventDefaultForm();
    controlFader();
}

//297 64 232

document.addEventListener('DOMContentLoaded', main)