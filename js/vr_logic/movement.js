var pathConnections
var targetIds;

getCoordinatesDistance = (oldPosition, newPosition) => {
  let productX = Number(newPosition.x) - Number(oldPosition.x);
  let productY = Number(newPosition.y) - Number(oldPosition.y);
  let productZ = Number(newPosition.z) - Number(oldPosition.z);

  return Math.sqrt((productX * productX) + (productY * productY) + (productZ * productZ))

}

getFinishScreen = () => {
  let camera = document.getElementById("camera")
  xyz = camera.getAttribute('position')
  xyz.z += -3

  let exitScreen = document.createElement('a-entity')
  exitScreen.setAttribute('geometry', 'primitive', 'plane')
  exitScreen.setAttribute('geometry', 'width', '4')
  exitScreen.setAttribute('geometry', 'height', '3')
  exitScreen.setAttribute('position', xyz)
  exitScreen.setAttribute('material', 'color', '#19224a')
  exitScreen.setAttribute('material', 'opacity', '0')

  let text1 = document.createElement('a-text')
  text1.setAttribute('value', "Niveau geslaagd!")
  text1.setAttribute('align', "center")
  text1.setAttribute('position', "0 1 0")
  exitScreen.appendChild(text1)

  let text2 = document.createElement('a-text')
  text2.setAttribute('value', "U kunt de telefoon nu afzetten en klikken op Afsluiten")
  text2.setAttribute('align', "center")
  text2.setAttribute('position', "0 0.1 0")
  text2.setAttribute('width', "2.5")
  exitScreen.appendChild(text2)

  let text3 = document.createElement('a-text')
  text3.setAttribute('value', "AFSLUITEN")
  text3.setAttribute('align', "center")
  text3.setAttribute('position', "0 -0.4 0.02")
  text3.setAttribute('width', "3")
  exitScreen.appendChild(text3)

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

  let animation = document.createElement('a-animation');
  animation.setAttribute('attribute', 'material.opacity')
  animation.setAttribute('from', '0')
  animation.setAttribute('to', '0.7')
  animation.setAttribute('dur', '5000');
  exitScreen.appendChild(animation)

  return exitScreen
}

checkFinish = () => {
  if (targetIds === -1) {
    console.log('user finished level');
    document.querySelector('a-scene').appendChild(getFinishScreen())
  }

}

getMovementAnimation = (blockCoordinates) => {

  let animation = document.createElement('a-animation');
  let oldPosition = document.getElementById('camera').getAttribute('position')
  let newPosition = blockCoordinates.getAttribute('position')

  let userHeight = gameController.playerHeight
  let distance = getCoordinatesDistance(oldPosition, newPosition)

  animation.setAttribute('attribute', 'position')
  animation.setAttribute('from', `${oldPosition.x} ${oldPosition.y} ${oldPosition.z}`)
  animation.setAttribute('to', `${newPosition.x} ${newPosition.y + (userHeight / 100) } ${newPosition.z}`)
  animation.setAttribute('fill', 'forwards')
  animation.setAttribute('easing', 'linear')
  animation.setAttribute('dur', (distance * 500).toString());
  animation.addEventListener('animationend', checkFinish)
  return animation
}


setUserOnFirstCoordinate = (navElements) => {
  for (let i = 0; i < navElements.length; i++) {
    // if its a match: attach a clickListener
    if (navElements[i].dataset.target === "1") {
      let position = navElements[i].getAttribute('position')

      // position can sometimes be object and sometimes a string
      if (typeof position === "object") {
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

startMovement = () => {
  // get navigation nodes
  let navElements = document.getElementById('navigationBox').children
  document.getElementById('camera').setAttribute('wasd-controls', 'enabled', 'false')

  // grab first target(s)
  targetIds = pathConnections[1]

  setUserOnFirstCoordinate(navElements)

  // remove old attributes so user can't make invalid moves
  clearOldListeners = () => {
    for (let i = 0; i < navElements.length; i++) {
      navElements[i].removeEventListener('click', moveHere)
      navElements[i].setAttribute('color', 'white')
      navElements[i].setAttribute('height', '0.2')

    }
  }

  setNewTargets = (element) => {
    newTargetsIds = targetIds[key]
    for (key in targetIds) {
      if (targetIds.hasOwnProperty(key)) {
        if (element.dataset.target === key) {
          targetIds = targetIds[key]
        }
      }
    }

  }

  // add movement animation to user's location at click
  moveHere = (clickEvent) => {
    document.getElementById('camera').appendChild(getMovementAnimation(clickEvent.target))
    while (clickEvent.target.firstChild) {
      clickEvent.target.removeChild(clickEvent.target.firstChild);
    }
    clearOldListeners()
    setNewTargets(clickEvent.target)
    addNewListeners()
  }

  // add listeners to the new possible targets
  addNewListeners = () => {
    let newTargetsIds;
    // loop through new targetsId's
    for (key in targetIds) {
      if (targetIds.hasOwnProperty(key)) {

        // for every id check it matches any nav element
        for (let i = 0; i < navElements.length; i++) {

          // if its a match: attach a clickListener
          if (navElements[i].dataset.target === key) {
            navElements[i].addEventListener('click', moveHere)
            navElements[i].setAttribute('color', 'red')
            navElements[i].setAttribute('height', '0.5')
          }
        }
      }
    }
  }

  // add first listeners
  addNewListeners()
}

startMovement();