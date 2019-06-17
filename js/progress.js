/* Author: Hinako Ogawa (2019) */
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

    // updateScoreList()
    createChart()
}


// NOT CURRENTLY IN USE
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


// TODO: MAKE SEPERATE CHART FOR 10PT QUESTIONS; "generalEvaluations"
createChart = () => {
    console.log("Created chart");
    
    const colors = {
        YELLOW: 'rgba(255, 244, 104, 0.3)',
        RED: 'rgba(255, 0, 0, 0.3)',
        GREEN: 'rgba(23, 145, 45, 0.3)',
        PINK: 'rgba(255, 137, 219, 0.3)',
        WHITE: 'rgba(255, 255, 255, 0.3)',

    }

    ctx = document.getElementById('progressChart');
    // prepares the data to be put into a chart
    currLv = currentDisplay; 
    values = [];
    dataEntry = [];
    var keyNames = [];
    for (attempt in scores[currLv] && scores[currLv]) {
        keyNames = Object.keys (scores[currLv][attempt]);
        keyValues = Object.values(scores[currLv][attempt]);
        values.push(keyValues);
        let color = Object.values(colors)[attempt]      
        let attemptData = {
            label: "poging " + (attempt),
            data: values[attempt],
            backgroundColor: color,
            borderColor: color,
            borderWidth: 1
        }        
        dataEntry.push(attemptData);
    }

    progChart = new Chart(ctx, {
        type:'radar',
        data: {
            labels: keyNames, // labels for the different categories (around the graph)
            datasets: dataEntry
        },
        options: {
            scale: {
                ticks: {
                    // display: false,
                    beginAtZero: true,
                    max: 5,
                    stepSize: 1,
                    showLabelBackdrop: false,   
                    fontColor: 'rgba(0, 0, 0, 0.4)',
                }
            }
        }
    });
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

    scores = stateController.getLocalStorage('levelEvaluations')
    console.log(scores);
    
    // scores = scoreExample;

    // find highest scored level to display as default
    highestLevel = -1;
    levelsDone = []
    for (const key in scores) {
        if (scores.hasOwnProperty(key)) {
            levelNumber = Number(key)
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
    // updateScoreList()
    createChart();

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