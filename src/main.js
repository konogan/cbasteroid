import Application from './application';
import Cube from './cube';
import Floor from './floor';

let app = new Application(document.body);



for (var i = 0; i < 200; i++) {
  app.add(new Cube({
    width: 10,
    height: 10,
    depth: 10,
    x: Math.random() * 500 - 250,
    y: Math.random() * 500 - 250,
    z: Math.random() * 500 - 250
  }));
}


// app.add(new Cube({
//   width: 12,
//   height: 5,
//   depth: 12
// }, 0xffff00));

var plane = new Floor({
  width: 1000,
  height: 1000
}, 0xffff00);


// console.log(app);
// app.add(plane);
