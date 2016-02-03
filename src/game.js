class Game {
  constructor() {
    this.state = {
      'clicks': {},
      'mouse': {},
      'objects': []
    };
  }

  run() {

    console.log(this);
  }

  addEventListenerToElement(element) {
    element.addEventListener('mousedown', (event) => {
      this.state.clicks[event.which] = {
        'clientX': event.clientX,
        'clientY': event.clientY
      };
    });

    element.addEventListener('mouseup', (event) => {
      this.state.clicks[event.which] = false;
    });

    element.addEventListener('mousemove', (event) => {
      this.state.mouse.clientX = event.clientX;
      this.state.mouse.clientY = event.clientY;
    });

    return this;
  }


}

export default Game;
