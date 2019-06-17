startMenu = () => {
    let startbutton = document.getElementById('startButton')
    let instructionsButton = document.getElementById('instructionsButton')
    let progressButton = document.getElementById('progressButton')
    let settingsButton = document.getElementById('settingsButton')
    let feedbackButton = document.querySelector('#feedbackBtn');

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

    if (stateController.getLocalStorage('levelEvaluations') == null) {
        progressButton.classList.add('buttonUnavailable')
    } else {
        progressButton.classList.remove('buttonUnavailable')

        progressButton.addEventListener('click', () => {
            stateController.changeState(3)
        })
    }


    instructionsButton.addEventListener('click', () => {
        stateController.changeState(4)
    })
    settingsButton.addEventListener('click', () => {
        stateController.changeState(5)
    })
    feedbackButton.addEventListener("click", () => {
        let subject = "Hoogtevrees VR - Feedback melding"
        let message = 
        
`Beste ontwikkelaars van de hoogtevrees applicatie,

Ik heb de volgende feedback:

`

        window.location.href = "mailto:s1100592@student.hsleiden.nl?subject=" +
            encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(message);
    })

}

startMenu();