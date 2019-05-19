startMenu = () => {
    let startbutton = document.getElementById('startButton')
    let instructionsButton = document.getElementById('instructionsButton')
    let progressButton = document.getElementById('progressButton')
    let settingsButton = document.getElementById('settingsButton')

    let alertUser = () => {
        let reply = confirm('Voor de eerste interactie raden we sterk aan de instructies te bekijken.')
        if (reply) {
            stateController.setLocalStorage('instructionsViewed', true)
            stateController.changeState(4)
        } else {
            startbutton.classList.remove("buttonUnavailable")
            startbutton.removeEventListener('click', alertUser)
            startbutton.addEventListener('click', () => {
                stateController.changeState(6)
            })
        }
    }

    if (stateController.getLocalStorage('instructionsViewed') !== true) {
        startbutton.classList.add("buttonUnavailable")
        startbutton.addEventListener('click', alertUser)
    } else {
        startbutton.addEventListener('click', () => {
            stateController.changeState(6)
        })
    }

    progressButton.addEventListener('click', () => {
        stateController.changeState(3)
    })
    instructionsButton.addEventListener('click', () => {
        stateController.changeState(4)
    })
    settingsButton.addEventListener('click', () => {
        stateController.changeState(5)
    })
}

startMenu();