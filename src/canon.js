import {
    materialFaces,
    materialLines
}
from './materials';

class Canon {

    constructor() {
        this.mesh = new THREE.Object3D();
        const points = [{
            'x': 0.44,
            'y': 10.4
        }, {
            'x': 0.38,
            'y': 9.84
        }, {
            'x': 0.38,
            'y': 4.98
        }, {
            'x': 0.58,
            'y': 4.98
        }, {
            'x': 0.38,
            'y': 6.22
        }, {
            'x': 0.4,
            'y': 5.34
        }, {
            'x': 0.72,
            'y': 4.58
        }, {
            'x': 0.54,
            'y': 3.68
        }, {
            'x': 0.6,
            'y': 0
        }];
        const _geometryOfBarrel1 = new THREE.LatheGeometry(points);

        this.mesh.add(new THREE.LineSegments(
            _geometryOfBarrel1,
            materialLines
        ));

        this.mesh.add(new THREE.Mesh(
            _geometryOfBarrel1,
            materialFaces
        ));
        this.mesh.rotateX(Math.PI / 2);
        this.mesh.position.set(-2, -2, -10);
    }

    update(dt) {

    }


    getMesh() {
        return this.mesh;
    }
}

export default Canon;
