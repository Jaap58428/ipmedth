// set global ocean variables
const oceanLength = 20;  // how many elements long the ocean is
const oceanWidth = 20;  // how many elements wide the ocean is
const waveHeight = 0.3;  // how high each element can rise as part of a wave

// how wide and deep every element is
// smaller elements create finer defined ocean at the cost of computing
const oceanResolution = 0.8;  

const createOcean = (oceanLength, oceanWidth, waveHeight, oceanResolution) => {
    // grab ocean component to fill with elements
    let ocean = document.getElementById('ocean');

    // 
    for (let row = 0; row < oceanLength; row++) {
        for (let column = 0; column < oceanWidth; column++) {
            let newOceanElement = getNewOceanElement();
            newOceanElement.setAttribute('color', getRandomBlueTint());
            newOceanElement.setAttribute('position', {
                x: row * oceanResolution,
                y: 0 - waveHeight,
                z: (0 - column) * oceanResolution
            });

            newOceanElement.addEventListener('loaded', () => {
                addAnimationToOceanElement(newOceanElement, row, column, waveHeight);
            })   

            ocean.appendChild(newOceanElement);
        }        
    }
}

const addAnimationToOceanElement = (oceanElement, row, column, waveHeight) => {
    let animation = document.createElement('a-animation');
    animation.setAttribute('attribute', 'position');
    animation.setAttribute('dur', '2000');

    let currentLocation = oceanElement.getAttribute('position');
    let newLocation = {
        x: currentLocation.x, 
        y: currentLocation.y + waveHeight, 
        z: currentLocation.z
    }
    animation.setAttribute('from', `${currentLocation.x} ${currentLocation.y} ${currentLocation.z}`);
    animation.setAttribute('to', `${newLocation.x} ${newLocation.y} ${newLocation.z}`);

    animation.setAttribute('direction', 'alternate');
    animation.setAttribute('easing', 'ease');
    animation.setAttribute('repeat', 'indefinite');
    animation.setAttribute('delay', '300');

    setTimeout(() => {
        oceanElement.appendChild(animation)
    }, (row + column) * 500);
}

const getRandomBlueTint = () => {
    // https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#HSL_colors
    const hue = Math.round((Math.random() * 60)) + 180;
    const saturation = Math.round((Math.random() * 50)) + 25;
    const lightness = Math.round((Math.random() * 50)) + 25;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

const getNewOceanElement = () => {
    let oceanElement = document.createElement('a-box');
    oceanElement.setAttribute('depth', oceanResolution.toString());
    oceanElement.setAttribute('width', oceanResolution.toString());
    oceanElement.setAttribute('height', (waveHeight + 0.1).toString());
    oceanElement.className = "oceanElement"

    return oceanElement;
}

const main = () => {
    createOcean(oceanLength, oceanWidth, waveHeight, oceanResolution);
    // setTimeout(()=> {
    //     let scene = document.getElementById('scene')
    //     scene.style.display = "none";
    //     document.getElementById('test').innerHTML="hello"
    // }, 5000)   
    // setTimeout(()=> {
    //     let scene = document.getElementById('scene')
    //     scene.style.display = "initial";
    // }, 10000)   
    
}

main();