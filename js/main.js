var stateController, gameController;
var devMode = true; // if true, shows errors for failed tests 

var testAssert = (booleanStatement, expectation) => {
    if (devMode && !booleanStatement) {
        console.error(`TEST FAILED! - Expected: ${expectation}`)
    }
}

const main = () => {
    //initialize state controller
    if (stateController == undefined) {
        stateController = new StateController();
        stateController.updateView();
    }

    // test for testAssert() function to control its success
    testAssert(true, 'testAssert() expected to be skipped on true boolean statements')
    testAssert(1 === 1, 'testAssert() expected to skip on 1 equal 1')
    testAssert('false', 'testAssert() expected to be skipped on Truthy')
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
        // this.levelSelected = null

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

        let playerHeight = this.getLocalStorage('playerHeight')
        let pathConnections = null;
        gameController = new GameController(playerHeight, pathConnections, levelName)

    }

    getState() {
        return this.appState
    }

    changeState(newState) {
        this.appState = newState;
        this.updateView();
    }

    loadJsFile(fileLocation) {
        // DOM: Create the script element
        let jsElm = document.createElement("script");
        // set the type attribute
        jsElm.type = "application/javascript";
        // make the script element load file
        jsElm.src = fileLocation;
        // finally insert the element to the body element in order to load the script
        document.body.appendChild(jsElm);
    }


    emptyBody() {
        // remove current view
        let body = document.body;
        while (body.hasChildNodes()) {
            let oldchild = body.removeChild(body.lastChild);
        }

        // test to check if body has indeed been emptied
        testAssert(document.body.children.length === 0, 'Document.body expected to have no children.')

    }

    updateView() {
        this.emptyBody()

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

            case 8:
                $("#body").load("page_assets/delete_data.html");
                break;

            case 9:
                $("#body").load("page_assets/change_height.html");
                break;

            case 10:
                $("#body").load("page_assets/after_level_questions.html");
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

        // test to assert setStorage does write to storage
        testAssert(localStorage.key(0) !== null, 'Localstorage expected to not be empty')
    }

    deleteLocalStorage() {
        localStorage.clear();

        // test to assert storage is empty after clearing
        testAssert(localStorage.key(0) === null, 'Localstorage expected to be empty')
    }

}

class GameController {
    constructor(playerHeight, pathConnections, levelName) {
        this.playerHeight = playerHeight;
        this.pathConnections = pathConnections
        $("#body").load(levelName, this.testLevelConfig);
    }

    testLevelConfig() {
        // the navigation box needs at least 3 items: start, end, pathconnections object
        testAssert(document.getElementById('navigationBox').children.length >= 3, "navigationBox element expected to have at least 3 children: start- and endnode and a pathconnections object container")
        
        testAssert(document.getElementById('camera') !== null, "a-scene expected to have a-camera with the 'camera' id")
        testAssert(document.getElementById("cursor") !== null, "camera expected to have a cursor")
    }

    exitGame() {
        stateController.changeState(10)
    }
}

window.addEventListener('load', main)