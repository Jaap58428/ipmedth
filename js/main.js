var stateController;

const main = () => {
    //initialize state controller

    if (stateController == undefined) {
        stateController = new StateController();
        stateController.updateView();
    }

    if (screen.orientation.angle == 0 || screen.orientation.angle == 180) {
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

        this.levelSelected = null;

    }

    startLevel() {
        let level = this.levelSelected
        this.levelSelected = null

        let levelName = "vr_assets/"
        switch (level) {
            case 0:
                levelName += "training_level.html"
                break;

            case 2:
                levelName += "dunes_level.html"
                break;

            case 4:
                levelName += "pier_level.html"
                break;

            default:
                break;
        }

        $("#body").load(levelName);
    }

    getState() {
        return this.appState
    }

    changeState(newState) {
        this.appState = newState;
        this.updateView();
    }

    checkFirstUse() {


        return false;
    }

    loadJsFile (fileLocation) {
        // DOM: Create the script element
        let jsElm = document.createElement("script");
        // set the type attribute
        jsElm.type = "application/javascript";
        // make the script element load file
        jsElm.src = fileLocation;
        // finally insert the element to the body element in order to load the script
        document.body.appendChild(jsElm);
    }

    updateView() {
        // remove current view
        let body = document.body;
        while (body.hasChildNodes()) {
            body.removeChild(body.lastChild);
        }



        // push new view based of state
        switch (this.appState) {
            case 0:
                $("#body").load("page_assets/landing.html");
                break;

            case 1:
                $("#body").load("page_assets/disclaimer.html");
                break;

            case 2:
                $("#body").load("page_assets/menu.html");
                break;

            case 3:
                $("#body").load("page_assets/progress.html");
                break;

            case 4:
                $("#body").load("page_assets/instructions.html");
                break;

            case 5:
                $("#body").load("page_assets/settings.html");
                break;

            case 6:
                if (this.getLocalStorage('playedBefore')) {
                    $("#body").load("page_assets/level_select.html");
                } else {
                    $("#body").load("page_assets/first_time.html");
                }
                break;

            case 7:
                this.startLevel(this.levelSelected)
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