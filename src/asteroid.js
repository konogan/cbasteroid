import {
    materialFaces,
    materialLines
}
from './materials';

class Asteroid {

    constructor() {
        this.mesh = new THREE.Object3D();

        const _radius = Math.random() * 10;
        const _geometry = new THREE.IcosahedronGeometry(
            _radius, 1
        );

        // randomly move vertex
        for (let vertex in _geometry.vertices) {
            _geometry.vertices[vertex].x += (Math.random() * 3 - 4);
            _geometry.vertices[vertex].y += (Math.random() * 3 - 4);
            _geometry.vertices[vertex].z += (Math.random() * 3 - 4);
        }

        this.mesh.add(new THREE.LineSegments(
            _geometry,
            materialLines
        ));

        this.mesh.add(new THREE.Mesh(
            _geometry,
            materialFaces
        ));
        // // random rotation
        this.mesh.rotUpt = {
            x: (Math.floor(Math.random() * 21) - 10) / 1000,
            y: (Math.floor(Math.random() * 21) - 10) / 1000,
            z: (Math.floor(Math.random() * 21) - 10) / 1000
        };

        this.mesh.position.x = Math.random() * 500 - 250;
        this.mesh.position.y = Math.random() * 500 - 250;
        this.mesh.position.z = Math.random() * 500 - 250;
    }

    update(dt) {
        this.mesh.rotation.x += this.mesh.rotUpt.x;
        this.mesh.rotation.y += this.mesh.rotUpt.y;
        this.mesh.rotation.z += this.mesh.rotUpt.z;
    }

    getMesh() {
        return this.mesh;
    }
}

export default Asteroid;
