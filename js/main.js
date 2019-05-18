var stateController;

const main = () => {
    //initialize state controller

    if (stateController == undefined) {
        stateController = new StateController();
        stateController.updateView();
    }

    if (screen.orientation.angle !== 90 || screen.orientation.angle !== -90) {
        alert("Let op! Deze website is bedoeld voor gebruik in landschap modus");
    }

}

class StateController {
    constructor() {
        if (this.getLocalStorage('disclaimerAgreement')) {
            this.appState = 2;
        } else {
            this.appState = 0;
        }

    }

    getState() {
        return this.appState
    }

    changeState(newState) {
        this.appState = newState;
        this.updateView();
    }

    updateView() {
        // remove current view
        let body = document.body;
        while (body.hasChildNodes()) {
            body.removeChild(body.lastChild);
        }

        const loadJsFile = (fileLocation) => {
            // DOM: Create the script element
            let jsElm = document.createElement("script");
            // set the type attribute
            jsElm.type = "application/javascript";
            // make the script element load file
            jsElm.src = fileLocation;
            // finally insert the element to the body element in order to load the script
            document.body.appendChild(jsElm);
        }

        // push new view based of state
        switch (this.appState) {
            case 0:
                $("#body").load("page_assets/landing.html");
                break;

            case 1:
                $("#body").load("page_assets/disclaimer.html");
                loadJsFile("js/disclaimer.js")
                break;

            case 2:
                $("#body").load("page_assets/menu.html");
                loadJsFile('js/menu.js')
                break;

            case 3:
                $("#body").load("page_assets/progress.html");
                break;

            case 4:
                $("#body").load("page_assets/instructions.html");
                loadJsFile('js/instructions.js')
                break;

            case 5:
                $("#body").load("page_assets/settings.html");
                break;

            case 6:
                $("#body").load("page_assets/level_select.html");
                break;

            case 7:
                $("#body").load("page_assets/height_setting.html");
                break;

            case 8:
                $("#body").load("vr_assets/training_level.html");
                break;

            case 9:
                $("#body").load("vr_assets/dunes_level.html");
                break;

            case 10:
                $("#body").load("vr_assets/pier_level.html");
                break;

            default:
                console.warn("State controller catched a unknown state.");
                break;
        }
    }

    getLocalStorage(key) {
        let data = localStorage.getItem(key)
        return JSON.parse(data);
    }

    setLocalStorage(key, object) {
        localStorage.setItem(key, JSON.stringify(object));
    }

}

window.addEventListener('load', main)