const fillDisclaimer = (disclaimerItems) => {
    let ul = document.getElementById("disclaimerList");

    disclaimerItems.forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = item.description;
        ul.appendChild(li)
    });
}

const getDisclaimerItems = () => {
    $.getJSON("disclaimerItems.json", (response) => {
        fillDisclaimer(response.disclaimerItems)
    })
}

document.onload = getDisclaimerItems();