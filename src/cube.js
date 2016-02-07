class Cube {
  constructor(size, color = 0x00ff00) {
    this.geometry = new THREE.BoxGeometry(size.width, size.height, size.depth);
    this.material = new THREE.MeshPhongMaterial({
      color: color
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  update(dt) {
    // this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }

  getMesh() {
    return this.mesh;
  }
}

export default Cube;
