/* Author: Hinako Ogawa (2019) */
var levelsDone, currentDisplay, scores;

/**
 * Function: Destroys old chart and creates a new one
 *  (otherwise the canvas will have overlapping charts)
 * Arguments: none
 * Returns: none
 */
recreateChart = () => {
    progChart.destroy();
    createChart();
}

/**
 * Function: Proces form and check input
 * Arguments: clickevent
 * Returns: false
 */
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

/**
 * Function: Changes the level shown and creates a new chart
 * Arguments: clickevent
 * Returns: false
 */
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
    progChart.destroy();
    createChart()
}

/**
 * Function: Creates an array with letters from the ABCD... string.
 * Arguments: integer
 * Returns: array
 */
to_a = (c2) => {
    a = 'ABCDEFGHIJKKLMNOPQRSTUVWXYZ'.split('');
    return (a.slice(0, c2)); 
}

/**
 * Function: Empties an element from all its child elements
 * Arguments: HTML element
 * Returns: false
 */
emptyElement = (parentEl) => {
    while(parentEl.firstChild){
        parentEl.removeChild(parentEl.firstChild)
    }
}

/**
 * Function: Create a chart according to chart.js documentation
 * Arguments: none
 * Returns: none
 */
createChart = () => {   
    const colors = {
        YELLOW: 'rgba(255, 244, 104, 0.3)',
        RED: 'rgba(255, 0, 0, 0.3)',
        GREEN: 'rgba(23, 145, 45, 0.3)',
        PINK: 'rgba(255, 137, 219, 0.3)',
        WHITE: 'rgba(255, 255, 255, 0.3)',
        
    }
    
    ctx = document.getElementById('progressChart');
    legendList = document.getElementById('legendList');
    emptyElement(legendList);


    // prepares the data to be put into a chart
    currLv = currentDisplay; 
    evaluationObj = generalEval;
    maxTicks = 0;
    values = [];
    dataEntry = [];
    keyNames = [];
    if(currLv == 0){
        evaluationObj = generalEval;
        maxTicks = 10
    } else{
        evaluationObj = scores;
        maxTicks = 5
    }
    for (attempt in evaluationObj[currLv] && evaluationObj[currLv]) {
        keyNames = Object.keys(evaluationObj[currLv][attempt])
        keyLength = keyNames.length;
        labelNames = to_a(keyLength)
        keyValues = Object.values(evaluationObj[currLv][attempt]);
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

    keyNames.forEach(element => {
        li = document.createElement('li');
        li.innerHTML = element;
        legendList.appendChild(li);
    });

    // create a chart instance 
    progChart = new Chart(ctx, {
        type:'radar',
        data: {
            labels: labelNames, // labels for the different categories (around the graph)
            datasets: dataEntry
        },
        options: {
            legend: {
                
            },
            scale: {
                ticks: {
                    // display: false,
                    beginAtZero: true,
                    max: maxTicks,
                    stepSize: 1,
                    showLabelBackdrop: false,   
                    fontColor: 'rgba(0, 0, 0, 0.4)',
                }
            },
             maintainAspectRatio: false,
            
        }
    });    
}

/**
 * Function: global page logic
 * Arguments: none
 * Returns: none
 */
startProgress = () => {
    // recreate chart on orientationchange
    window.addEventListener("orientationchange", recreateChart)

    // add eventlisteners to the buttons
    document.getElementById('backButton').addEventListener('click', () => {
        window.removeEventListener("orientationchange", recreateChart)
        stateController.changeState(2)
    })
    document.getElementById('levelDownButton').addEventListener('click', () => {
        changeLevel(-1)
    })
    document.getElementById('levelUpButton').addEventListener('click', () => {
        changeLevel(+1)
    })

    scores = stateController.getLocalStorage('levelEvaluations');
    generalEval = stateController.getLocalStorage('generalEvaluations');
    
    // find highest scored level to display as default
    highestLevel = -1;
    levelsDone = []
    for (const key in scores) {
        if (scores.hasOwnProperty(key)) {
            levelNumber = Number(key);
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
    createChart();
}


startProgress();