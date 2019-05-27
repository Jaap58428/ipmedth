var levelsDone, currentDisplay, scores;

checkButtonsDisplay = () => {
    // if the current displayed level isnt the highest, show the next level button
    upbutton = document.getElementById('levelUpButton')
    if (currentDisplay !== levelsDone[levelsDone.length - 1]) {
        nextLevel = levelsDone[levelsDone.indexOf(currentDisplay) + 1]
        upbutton.innerHTML = "Level " + nextLevel
        upbutton.style.visibility = 'visible'
    } else {
        upbutton.style.visibility = 'hidden'
    }

    // if the current displayed level isnt the lowest, show the next previous button
    downButton = document.getElementById('levelDownButton')
    if (currentDisplay !== levelsDone[0]) {
        previousLevel = levelsDone[levelsDone.indexOf(currentDisplay) - 1]
        downButton.innerHTML = "Level " + previousLevel
        downButton.style.visibility = 'visible'
    } else {
        downButton.style.visibility = 'hidden'
    }
}

changeLevel = (direction) => {
    if (direction == 1) {
        // display higher level
        currentDisplay = levelsDone[levelsDone.indexOf(currentDisplay) + 1]

    } else {
        // display lower level
        currentDisplay = levelsDone[levelsDone.indexOf(currentDisplay) - 1]
    }

    document.getElementById('title').innerHTML = "Level " + currentDisplay
    checkButtonsDisplay()

    updateScoreList()
}

updateScoreList = () => {
    console.log('scorelist updated');
    let relevantScores = [];
    for (const key in scores) {
        if (scores.hasOwnProperty(key) && Number(key.substr(9)) == currentDisplay) {
            relevantScores.push(scores[key])
        }
    }
    document.querySelector('#scoreSlider').innerHTML = relevantScores
}

startProgress = () => {
    document.getElementById('backButton').addEventListener('click', () => {
        stateController.changeState(2)
    })

    document.getElementById('levelDownButton').addEventListener('click', () => {
        changeLevel(-1)
    })

    document.getElementById('levelUpButton').addEventListener('click', () => {
        changeLevel(+1)
    })

    let scoreExample = {
        "evalLevel2": [{
                "zelfverzekerd": "2",
                "situatie": "2",
                "omgaan": "2",
                "klachten": "2"
            },
            {
                "zelfverzekerd": "2",
                "situatie": "2",
                "omgaan": "2",
                "klachten": "2"
            }
        ],
        "evalLevel0": [{
                "zelfverzekerd": "2",
                "situatie": "2",
                "omgaan": "2",
                "klachten": "2"
            },
            {
                "zelfverzekerd": "2",
                "situatie": "2",
                "omgaan": "2",
                "klachten": "2"
            }
        ],
        "evalLevel4": [{
                "zelfverzekerd": "2",
                "situatie": "2",
                "omgaan": "2",
                "klachten": "2"
            },
            {
                "zelfverzekerd": "2",
                "situatie": "2",
                "omgaan": "2",
                "klachten": "2"
            },
            {
                "zelfverzekerd": "2",
                "situatie": "2",
                "omgaan": "2",
                "klachten": "2"
            }
        ]
    }

    // scores = stateController.getLocalStorage('questAnswers')
    scores = scoreExample

    // find highest scored level to display as default
    highestLevel = -1;
    levelsDone = []
    for (const key in scores) {
        if (scores.hasOwnProperty(key)) {
            levelNumber = Number(key.substr(9))
            if (levelNumber > highestLevel) {
                highestLevel = levelNumber
            }
            if (levelsDone.indexOf(levelNumber) === -1) {
                levelsDone.push(levelNumber)
            }
        }
    }

    //sort levels to logical scroll order
    levelsDone.sort()

    // set current displayed item to the highest level by default
    currentDisplay = highestLevel

    document.getElementById('title').innerHTML = "Level " + currentDisplay
    checkButtonsDisplay(levelsDone, currentDisplay)
    updateScoreList()

    console.log('highest: ', highestLevel, levelsDone);
    console.log('last item ', levelsDone[levelsDone.length - 1]);



    //grab scores from storage
    // see which levels are done
    // default show highest level done?
    // for every type of level make a slide 
    // within every slide: make a graph per question?
    // for example: qustion 1 -> scorces over time, q2 -> over time, etc.




}

startProgress();