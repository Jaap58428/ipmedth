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

createChart = () => {
    console.log("Created chart");
    ctx = document.getElementById('progressChart');
    currLv = "evalLevel"+currentDisplay; 
    values = [];
    for(attempt in scores[currLv]){
        keyNames = Object.keys(scores[currLv][attempt]);
        keyValues = Object.values(scores[currLv][attempt]);
        let kvArr = [];
        kvArr[0] = keyValues;
        values.push(keyValues);
        console.log("key values" + values);    
    }
    
    /**TODO: make dynamic dataset {} for every attempt, make color ENUM so there's always a color predefined. MAX 5 attempts?
     * do smth about the background color etc. Make sure it works with the generated data as well.
     */

    progChart = new Chart(ctx, {
        type:'radar',
        data: {
            labels: keyNames, // labels for the different categories (around the graph)
            datasets: [{
                label: "attempt 1", 
                data: values[0], // actual values to be put in (points on the graph)
                backgroundColor: [
                    'rgba(255, 99, 132, 0.3)',
                    // 'rgba(54, 162, 235, 0.1)',
                    // 'rgba(75, 192, 192, 0.6)',
                    // 'rgba(153, 102, 255, 0.8)',
                    // 'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 0.1)',
                    // 'rgba(54, 162, 235, 0.1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },
            {
                label: "attempt 2", 
                data: values[1], // actual values to be put in (points on the graph)
                backgroundColor: [
                    // 'rgba(255, 99, 132, 0.1)',
                    // 'rgba(54, 162, 235, 0.1)',
                    'rgba(75, 192, 192, 0.3)',
                    // 'rgba(153, 102, 255, 0.8)',
                    // 'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    // 'rgba(255, 99, 132, 0.1)',
                    // 'rgba(54, 162, 235, 0.1)',
                    'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
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

    let scoreExample = {
        "evalLevel2": [{
                "zelfverzekerd": "1",
                "situatie": "2",
                "omgaan": "3",
                "klachten": "4"
            },
            {
                "zelfverzekerd": "4",
                "situatie": "3",
                "omgaan": "2",
                "klachten": "1"
            }
        ],
        "evalLevel0": [{
                "zelfverzekerd": "0",
                "situatie": "2",
                "omgaan": "1",
                "klachten": "4"
            },
            {
                "zelfverzekerd": "4",
                "situatie": "2",
                "omgaan": "2",
                "klachten": "1"
            }
        ],
        "evalLevel4": [{
                "zelfverzekerd": "1",
                "situatie": "0",
                "omgaan": "3",
                "klachten": "2"
            },
            {
                "zelfverzekerd": "4",
                "situatie": "1",
                "omgaan": "2",
                "klachten": "1"
            },
            {
                "zelfverzekerd": "0",
                "situatie": "3",
                "omgaan": "1",
                "klachten": "4"
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