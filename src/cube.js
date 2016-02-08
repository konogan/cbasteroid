class Cube {
  constructor(properties, color = 0x00ff00) {
    this.geometry = new THREE.BoxGeometry(properties.width, properties.height, properties.depth);
    this.material = new THREE.MeshPhongMaterial({
      color: color
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = properties.x;
    this.mesh.position.y = properties.y;
    this.mesh.position.z = properties.z;

    // random rotation
    this.mesh.rotUpt = {
      x: (Math.floor(Math.random() * 21) - 10) / 1000,
      y: (Math.floor(Math.random() * 21) - 10) / 1000,
      z: (Math.floor(Math.random() * 21) - 10) / 1000
    };
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

export default Cube;
