import Application from './application';
import Cube from './cube';
import Floor from './floor';

let app = new Application(document.body);

app.add(new Cube({
  width: 1,
  height: 1,
  depth: 1
}));

// app.add(new Cube({
//   width: 12,
//   height: 5,
//   depth: 12
// }, 0xffff00));

var plane = new Floor({
  width: 1000,
  height: 1000
}, 0xffff00
);

//app.add(plane);
