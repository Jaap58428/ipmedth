/* Author: Jaap Kanbier (2019) */

/**
 * 
 */
fillOcean = (ocean, oceanLength, oceanWidth, waveHeight, oceanResolution) => {
      // cycle through columns and rows to fill ocean with elements
      for (let row = 0; row < oceanLength; row++) {
          for (let column = 0; column < oceanWidth; column++) {
              let newOceanElement = getNewOceanElement(oceanResolution, waveHeight);
              newOceanElement.setAttribute('color', getRandomBlueTint());
              newOceanElement.setAttribute('position', {
                  x: row * oceanResolution,
                  y: 0 - waveHeight,
                  z: (0 - column) * oceanResolution
              });

              // animation depends on getting the current location from canvas
              // wait untill component is initialised
              newOceanElement.addEventListener('loaded', () => {
                  addAnimationToOceanElement(newOceanElement, row, column, waveHeight);
              })

              ocean.appendChild(newOceanElement);
          }
      }
  }

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
      }, (row * 1.4 + column * 0.6) * 500);
  }

  getRandomBlueTint = () => {
      // https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#HSL_colors
      const hue = Math.round((Math.random() * 20)) + 200;
      const saturation = Math.round((Math.random() * 50)) + 50;
      const lightness = Math.round((Math.random() * 50)) + 25;

      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  getNewOceanElement = (oceanResolution, waveHeight) => {
      // generate a standard ocean element
      let oceanElement = document.createElement('a-box');
      oceanElement.setAttribute('depth', oceanResolution.toString());
      oceanElement.setAttribute('width', oceanResolution.toString());

      // always add a bit more height then animation needs
      // this avoids potential clipping
      oceanElement.setAttribute('height', (waveHeight + 0.05).toString());

      oceanElement.className = "oceanElement"

      return oceanElement;
  }

  startWaves = () => {
      // grab ocean component to fill with elements
      let ocean = document.getElementById('ocean');

      // set global ocean variables
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

      fillOcean(ocean, oceanLength, oceanWidth, waveHeight, oceanResolution);
  }

  startWaves();