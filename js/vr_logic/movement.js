const pathConnections = {
  1: {
    2: {
      4: {
        5: -1
      }
    },
    3: {
      4: {
        5: -1
      },
      5: -1
    }
  }
}

getCoordinatesDistance = (oldPosition, newPosition) => {
  let productX = Number(newPosition.x) - Number(oldPosition.x);
  let productY = Number(newPosition.y) - Number(oldPosition.y);
  let productZ = Number(newPosition.z) - Number(oldPosition.z);

  return Math.sqrt((productX * productX) + (productY * productY) + (productZ * productZ))

}

checkFinish = () => {
  console.log('animation ended');
  
  
}

getMovementAnimation = (blockCoordinates) => {
  
  let animation = document.createElement('a-animation');
  let oldPosition = document.getElementById('camera').getAttribute('position')
  let newPosition = blockCoordinates.getAttribute('position')

  let userHeight = stateController.getLocalStorage('playerHeight')
  console.log("height: ", userHeight / 100);
  


  let distance = getCoordinatesDistance(oldPosition, newPosition)

  animation.setAttribute('attribute', 'position')
  animation.setAttribute('from', `${oldPosition.x} ${oldPosition.y} ${oldPosition.z}`)
  animation.setAttribute('to', `${newPosition.x} ${newPosition.y + (userHeight / 100) } ${newPosition.z}`)
  animation.setAttribute('fill', 'forwards')
  animation.setAttribute('easing', 'linear')
  animation.setAttribute('dur', (distance * 300).toString());
  animation.addEventListener('animationend', checkFinish)
  return animation
}

makeTargetVisible = (element) => {
  element.appendChild(document.getElementById('navAniHeight').cloneNode(true))
  element.appendChild(document.getElementById('navAniColour').cloneNode(true))
}

setUserOnFirstCoordinate = (navElements) => {
  for (let i = 0; i < navElements.length; i++) {
    // if its a match: attach a clickListener
    if (navElements[i].dataset.target === "1") {
      let position = navElements[i].getAttribute('position')
      xyz = position.split(" ")
      xyz[1] = (Number(xyz[1]) + stateController.getLocalStorage('playerHeight') / 100).toString()
      document.getElementById('camera').setAttribute('position', xyz.join(" "))
    }
  }
}

startMovement = () => {
  // get navigation nodes
  let navElements = document.getElementById('navigationBox').children

  // grab first target(s)
  let targetIds = pathConnections[1]

  setUserOnFirstCoordinate(navElements)

  // remove old attributes so user can't make invalid moves
  clearOldListeners = () => {
    for (let i = 0; i < navElements.length; i++) {
      navElements[i].removeEventListener('click', moveHere)
      while (navElements[i].firstChild) {
        navElements[i].removeChild(navElements[i].firstChild);
      }
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
            console.log('added listener: ', navElements[i]);
            makeTargetVisible(navElements[i])
          }
        }
      }
    }
  }

  // add first listeners
  addNewListeners()
}

startMovement();