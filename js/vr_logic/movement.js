/* Author: Jaap Kanbier (2019) */

// Global parameters
var pathConnections
var targetIds;

/**
 * Function: Calculates the distance between 2 sets of 3D coordinates
 * Argument: 2 objects containing x,y and z values
 * Returns: distance value(Number) between two passed coordinates
 */
getCoordinatesDistance = (oldPosition, newPosition) => {
  let productX = Number(newPosition.x) - Number(oldPosition.x);
  let productY = Number(newPosition.y) - Number(oldPosition.y);
  let productZ = Number(newPosition.z) - Number(oldPosition.z);

  // mathematic function for producing the distance between 2 points in 3D space
  return Math.sqrt((productX * productX) + (productY * productY) + (productZ * productZ))

}

/**
 * Function: produces a html-element for the player to use to exit the current VR level
 * Arguments: none
 * Returns: html node (a-entity) destined for using in a-scene
 */
getFinishScreen = () => {
  // get current player location and set location 3 meters ahead
  let camera = document.getElementById("camera")
  xyz = camera.getAttribute('position')
  xyz.z += -3

  // generate exitscreen plane and set attributes
  let exitScreen = document.createElement('a-entity')
  exitScreen.setAttribute('geometry', 'primitive', 'plane')
  exitScreen.setAttribute('geometry', 'width', '4')
  exitScreen.setAttribute('geometry', 'height', '3')
  exitScreen.setAttribute('position', xyz)
  exitScreen.setAttribute('material', 'color', '#19224a')
  exitScreen.setAttribute('material', 'opacity', '0')

  // Generate first text and add to exitplane
  let text1 = document.createElement('a-text')
  text1.setAttribute('value', "Niveau geslaagd!")
  text1.setAttribute('align', "center")
  text1.setAttribute('position', "0 1 0")
  exitScreen.appendChild(text1)

  // generate second text and add to exitplane
  let text2 = document.createElement('a-text')
  text2.setAttribute('value', "U kunt de telefoon nu afzetten en klikken op Afsluiten")
  text2.setAttribute('align', "center")
  text2.setAttribute('position', "0 0.1 0")
  text2.setAttribute('width', "2.5")
  exitScreen.appendChild(text2)

  // generate third text and add to exitplane
  let text3 = document.createElement('a-text')
  text3.setAttribute('value', "AFSLUITEN")
  text3.setAttribute('align', "center")
  text3.setAttribute('position', "0 -0.4 0.02")
  text3.setAttribute('width', "3")
  exitScreen.appendChild(text3)

  // generate exitbutton, add eventlistener (click) and add to exitscreen
  let exitButton = document.createElement('a-entity')
  exitButton.setAttribute('geometry', 'primitive', 'plane')
  exitButton.setAttribute('geometry', 'width', '2.5')
  exitButton.setAttribute('geometry', 'height', '0.3')
  exitButton.setAttribute('position', '0 -0.4 0.01')
  exitButton.setAttribute('material', 'color', 'brown')
  exitButton.addEventListener('click', () => {
    gameController.exitGame()
  })
  exitScreen.appendChild(exitButton)

  // generate exitscreen intro animation and add to exitscreen
  let animation = document.createElement('a-animation');
  animation.setAttribute('attribute', 'material.opacity')
  animation.setAttribute('from', '0')
  animation.setAttribute('to', '0.7')
  animation.setAttribute('dur', '5000');
  exitScreen.appendChild(animation)

  return exitScreen
}

/**
 * Function: Check if the user is on a final coordinate node
 * Arguments: none
 * Returns: none
 */
checkFinish = () => {
  if (targetIds === -1) {
    let camera = document.querySelector('#camera')
    let cameraLocation = camera.getAttribute('position')

    // Append exitscreen to current location so user can complete level
    document.querySelector('a-scene').appendChild(getFinishScreen())
    cameraLocation.z -= -3
    camera.setAttribute('location', (cameraLocation))
  }

}

/**
 * Function: get animation to move from current location to selected location with precondigured speed
 * Arguments: coordinates of destination location
 * Returns: a-animation html node
 */
getMovementAnimation = (blockCoordinates) => {

  // create animation and start/end locations
  let animation = document.createElement('a-animation');
  let oldPosition = document.getElementById('camera').getAttribute('position')
  let newPosition = blockCoordinates.getAttribute('position')

  // get required secondary values
  let userHeight = gameController.playerHeight
  let distance = getCoordinatesDistance(oldPosition, newPosition)

  // set animation attributes
  animation.setAttribute('attribute', 'position')
  animation.setAttribute('from', `${oldPosition.x} ${oldPosition.y} ${oldPosition.z}`)
  animation.setAttribute('to', `${newPosition.x} ${newPosition.y + (userHeight / 100) } ${newPosition.z}`)
  animation.setAttribute('fill', 'forwards')
  animation.setAttribute('easing', 'linear')

  // animation speed depends indirectly on the time it will take
  // the time is derived from the distance times a value
  // here we use the calculated distance between 2 points
  animation.setAttribute('dur', (distance * 400).toString());

  animation.addEventListener('animationend', checkFinish)
  return animation
}

/**
 * Function: Put the user on the coordinates with data-target 1
 * arguments: complete set of coordinates
 * returns: null 
 */
setUserOnFirstCoordinate = (navElements) => {
  for (let i = 0; i < navElements.length; i++) {
    // loop over all data-targets
    if (navElements[i].dataset.target === "1") {
      let position = navElements[i].getAttribute('position')

      // position can sometimes be object and sometimes a string
      if (typeof position === "object") {
        // add the players set height (from cm to meter) to the coordinate
        position.y += gameController.playerHeight / 100
        document.getElementById('camera').setAttribute('position', position)
      } else {
        xyz = position.split(" ")
        xyz[1] = (Number(xyz[1]) + gameController.playerHeight / 100).toString()
        document.getElementById('camera').setAttribute('position', xyz.join(" "))
      }
    }
  }
}

/**
 * Function: start the script for this file
 * Arguments: null
 * Returns: null
 */
startMovement = () => {

  // get navigation nodes
  let navElements = document.getElementById('navigationBox').children
  document.getElementById('camera').setAttribute('wasd-controls', 'enabled', 'false')

  // grab first target(s) children
  targetIds = pathConnections[1]

  setUserOnFirstCoordinate(navElements)

  /**
   * Function: remove old attributes so user can't make invalid moves, used for callbacks
   * Arguments: null
   * returns: null
   */
  clearOldListeners = () => {
    for (let i = 0; i < navElements.length; i++) {
      navElements[i].removeEventListener('click', moveHere)
      navElements[i].removeEventListener('mouseenter', targetMouseEnter)
      navElements[i].removeEventListener('mouseleave', targetMouseLeave)
      navElements[i].setAttribute('color', 'white')
      navElements[i].setAttribute('height', '0.2')
    }
  }

  /**
   * Function: Callback for event to attach to coordinates which reacts to mouse entering
   * Arguments: event
   * Returns: null
   */
  targetMouseEnter = (clickEvent) => {
    clickEvent.target.setAttribute('color', '#ff66ff')
    clickEvent.target.setAttribute('height', '0.6')
    var node = document.getElementById('clickStartAnimation');
    node.setAttribute("from", getCurrentCursorSize())
    document.getElementById('cursor').appendChild(node);
  }

  /**
   * Function: Callback for event to attach to coordinates which reacts to mouse leaving
   * Arguments: event
   * Returns: null
   */
  targetMouseLeave = (clickEvent) => {
    clickEvent.target.setAttribute('color', '#cc00cc')
    clickEvent.target.setAttribute('height', '0.5')
    var node = document.getElementById('clickDoneAnimation');
    node.setAttribute("from", getCurrentCursorSize())
    document.getElementById('cursor').appendChild(node);
  }

  /**
   * Function: get the current cursor size in scale attribute
   * Arguments: null
   * returns: string with 3 scale coordinates ('1 1 1')
   */
  getCurrentCursorSize = () => {
    let current_size = document.getElementById('cursor').getAttribute("scale");
    let newPosText = '';
    Object.keys(current_size).forEach(function (key) {
      newPosText += current_size[key] + ' ';
    });
    return newPosText
  }

  /**
   * Function: Loops over current possible targets and matches it to clicked target
   * Argument: clicked target
   * Returns: null
   */
  setNewTargets = (element) => {
    newTargetsIds = targetIds[key]
    for (key in targetIds) {
      if (targetIds.hasOwnProperty(key)) {
        if (element.dataset.target === key) {
          // set new targets to clicked target's children
          targetIds = targetIds[key]
        }
      }
    }

  }

  /**
   * Function: add movement animation to user's location at click
   * Argument: clicked target
   * Returns: null
   */
  moveHere = (clickEvent) => {
    document.getElementById('camera').appendChild(getMovementAnimation(clickEvent.target))
    while (clickEvent.target.firstChild) {
      clickEvent.target.removeChild(clickEvent.target.firstChild);
    }
    targetMouseLeave(clickEvent)
    clearOldListeners()
    setNewTargets(clickEvent.target)
    addNewListeners()
  }

  /**
   * Function: add listeners to the new possible targets
   * ARguments: none
   * Returns: none
   */
  addNewListeners = () => {
    // loop through new targetsId's
    for (key in targetIds) {
      if (targetIds.hasOwnProperty(key)) {

        // for every id check it matches any nav element
        for (let i = 0; i < navElements.length; i++) {

          // if its a match: attach a clickListener
          if (navElements[i].dataset.target === key) {
            navElements[i].addEventListener('click', moveHere)
            navElements[i].addEventListener('mouseenter', targetMouseEnter)
            navElements[i].addEventListener('mouseleave', targetMouseLeave)
            navElements[i].setAttribute('color', '#cc00cc')
            navElements[i].setAttribute('height', '0.5')
          }
        }
      }
    }
  }

  // add first listeners
  addNewListeners()
}


// tester for critical distance function
testMovement = () => {
  mockCoordinate1 = {
    x: 1,
    y: 1,
    z: 1
  }
  mockCoordinate2 = {
    x: 1,
    y: 1,
    z: 1
  }
  mockCoordinate3 = {
    x: -2,
    y: 5,
    z: 1
  }
  testAssert(getCoordinatesDistance(mockCoordinate1, mockCoordinate2) === 0, "getCoordinatesDistance() expected to calculate the distance between two 3D coordinates")
  testAssert(getCoordinatesDistance(mockCoordinate1, mockCoordinate3) === 5, "getCoordinatesDistance() expected to calculate the distance between two 3D coordinates")


}

// Start scripts
testMovement();
startMovement();