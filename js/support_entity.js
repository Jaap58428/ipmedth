/**
 * A helper entity that provides the user with support and instructions
 * for stress relieving excercises.
 */

 // initialized upon level entry? 
const main = () => {
    //initialize support entity
    if (supportEntity == undefined) {
        supportEntity = new SupportEntity();
    }
}


AFRAME.registerComponent('supportEntity', {
    schema: {
      color: {type: 'number'},
      position: {type: 'string'},
      audio: {type: 'string'},
      checkpoint: {type: 'checkpoint'},
    //   audio: {type: 'string'},
    },
  
    init: function () {
        // Do something when component first attached.
        var self = this;

        // Set up initial state & variables. Store ref to eventhandler to later remove
        this.eventHandlerFn = function() { console.log(self.data.checkpoint)}
    
    },
  
    update: function (oldData) {
        // Do something when component's data is updated.
        var data = this.data;
        var el = this.el;

        // 'checkpoint' updated. Remove previous eventlistener if it exists
        if (oldData.checkpoint && data.checkpoint !== oldData.checkpoint){
            el.removeEventListener(oldData.checkpoint, this.eventHandlerFn);
        } 
        if (data.checkpoint){
            el.addEventListener(data.checkpoint, this.eventHandlerFn);
        } else {
        console.log("no checkpoint changed.");        
        }
    },
  
    remove: function () {
      // Do something the component or its entity is detached.
      var data = this.data;
        var el = this.el;

        // 'checkpoint' updated. Remove previous eventlistener if it exists
        if (data.event){
            el.removeEventListener(data.event, this.eventHandlerFn);
        } 
    },
  
    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
    }
  });

class SupportEntity {
    constructor() {
        this.supportEntity = document.createElement('a-box'); 
        supportEntity.setAttribute('color', 'lightgrey');
        supportEntity.setAttribute('position', '1 2 2');

        this.excSelected = null;
    }

    startExcercise() {
        let excercise = this.excSelected;
        let excName;
        switch(excercise) {
            case 0: // breathing exc
                break;
            case 2: // meditative exc
                break;
            case 4: // instructions for paper cup exc
                break; 
            default:
                console.warn("The chosen excercise does not exist.");
                break;                   
        }
        // load things into the entity/scene?
    }

    moveSupportEntity(location) {
        switch(location){
            case "checkpoint1":
                supportEntity.setAttribute('position', '1 2 2')
                break;
            case "checkpoint2":
                break;
            case "checkpoint3":
                break;
            default:
                break;        
        }
        supportEntityFadeIn();
    }

    supportEntityFadeIn() {
        let animation = document.createElement('a-animation');
        animation.setAttribute('attribute', 'position');
        animation.setAttribute('dur', '1000');

    }
}

window.addEventListener('load', main)