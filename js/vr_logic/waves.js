/* Autor: Jaap Kanbier (2019) */

/**
 * Function: set up ocean element and fill it with ocean elements
 * Arguments:
 *      ocean: element to be filled in a-scene
 *      oceanLength: argument for depth amount elements
 *      oceanWidth: argument for width amount elements
 *      waveHeight: argument to set max height of element
 *      oceanResolution: size of each element
 * Returns: none
 */
fillOcean = (ocean, oceanLength, oceanWidth, waveHeight, oceanResolution) => {
    // cycle through columns and rows to fill ocean with elements
    for (let row = 0; row < oceanLength; row++) {
        for (let column = 0; column < oceanWidth; column++) {
            // get a new ocean element
            let newOceanElement = getNewOceanElement(oceanResolution, waveHeight);

            // give it a random blue tint
            newOceanElement.setAttribute('color', getRandomBlueTint());
            
            // give it a 3D position in the two dimensional matrix
            newOceanElement.setAttribute('position', {
                x: row * oceanResolution,
                y: 0 - waveHeight, 
                z: (0 - column) * oceanResolution
            });

            // animation depends on getting the current location from canvas
            // wait untill component is initialised
            newOceanElement.addEventListener('loaded', () => {
                // attach waveheight animation to each element
                addAnimationToOceanElement(newOceanElement, row, column, waveHeight);
            })

            // attach ocean element to ocean
            ocean.appendChild(newOceanElement);
        }
    }
}

// Function: generates animation for ocean element 
// Arguments: element to attach animation to, row and column for settings timeout for animation, max height
// Returns: none
addAnimationToOceanElement = (oceanElement, row, column, waveHeight) => {
    // build up new animation component
    let animation = document.createElement('a-animation');
    animation.setAttribute('attribute', 'position');
    animation.setAttribute('dur', '4000');

    let currentLocation = oceanElement.getAttribute('position');
    let newLocation = {
        x: currentLocation.x,
        y: currentLocation.y + waveHeight,
        z: currentLocation.z
    }
    animation.setAttribute('from', `${currentLocation.x} ${currentLocation.y} ${currentLocation.z}`);
    animation.setAttribute('to', `${newLocation.x} ${newLocation.y} ${newLocation.z}`);

    animation.setAttribute('direction', 'alternate');
    animation.setAttribute('easing', 'ease-in');
    animation.setAttribute('repeat', 'indefinite');
    animation.setAttribute('delay', '1500');

    // add animation to component based of diagonal 2d raster
    setTimeout(() => {
        oceanElement.appendChild(animation)
    }, (row * 1.4 + column * 0.6) * 500); // sets timeout angle based of location in grid
}

/**
 * Function: gets random blue tint in HSL format
 * Arguments: none;
 * returns: blue tint in hsl format ("hsl(205, 50%, 42%)")
 */
getRandomBlueTint = () => {
    // https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#HSL_colors
    const hue = Math.round((Math.random() * 20)) + 200;
    const saturation = Math.round((Math.random() * 50)) + 50;
    const lightness = Math.round((Math.random() * 50)) + 25;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * Function: get generated ocean element
 * Arguments: element size, element height
 * returns: html node, a-box
 */
getNewOceanElement = (oceanResolution, waveHeight) => {
    // generate a standard ocean (a-box) element
    let oceanElement = document.createElement('a-box');
    oceanElement.setAttribute('depth', oceanResolution.toString());
    oceanElement.setAttribute('width', oceanResolution.toString());

    // always add a bit more height then animation needs
    // this avoids potential (animation) clipping
    oceanElement.setAttribute('height', (waveHeight + 0.05).toString());

    oceanElement.className = "oceanElement"

    return oceanElement;
}

startWaves = () => {
    // grab ocean component to fill with elements
    let ocean = document.getElementById('ocean');

    // set global ocean variables, if undefined set default values
    let oceanLength = parseInt(ocean.getAttribute('data-oceanLength')); // how many elements long the ocean is
    if (oceanLength == undefined) {
        oceanLength = 10
    }

    let oceanWidth = parseInt(ocean.getAttribute('data-oceanWidth')); // how many elements wide the ocean is
    if (oceanWidth == undefined) {
        oceanWidth = 20
    }

    let waveHeight = parseFloat(ocean.getAttribute('data-waveHeight')); // how high each element can rise as part of a wave
    if (waveHeight == undefined) {
        waveHeight = 0.5
    }

    // how wide and deep every element is
    // smaller elements create finer defined ocean at the cost of computing
    let oceanResolution = parseFloat(ocean.getAttribute('data-oceanResolution'));
    if (oceanResolution == undefined) {
        oceanResolution = 1
    }

    // build up ocean with controlled arguments
    fillOcean(ocean, oceanLength, oceanWidth, waveHeight, oceanResolution);
}

// kick off waves script
startWaves();