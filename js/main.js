var stateController;

const main = () => {
    //initialize state controller
    stateController = new StateController();
    stateController.updateView();
}

const getLocalStorage = (key) => {
    let data = localStorage.getItem(key)
    return JSON.parse(data);
}

const setLocalStorage = (key, object) => {
    localStorage.setItem(key, JSON.stringify(object));
}

class StateController {
    constructor() {
        this.state = new State();
    }

    getState() {
        return this.state
    }

    changeState(newState) {
        this.state.appState = newState;
        this.updateView();
    }

    updateView() {
        // remove current view
        let body = document.getElementById('body');
        while (body.hasChildNodes()) {
            body.removeChild(body.lastChild);
        }

        // push new view based of state
        switch (this.state.appState) {
            case 0:
                $("#body").load("page_assets/landing.html");
                break;

            case 1:
                $("#body").load("page_assets/disclaimer.html");
                break;

            case 2:
                $("#body").load("page_assets/menu.html");
                break;

            default:
                console.warn("State controller catched a unknown state.");
                break;
        }
    }
}

class State {
    constructor() {
        this.appState = 0;
    }
}

window.addEventListener('load', main)