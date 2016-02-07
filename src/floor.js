class Floor {
  constructor(size, color = 0x0000FF) {
    this.geometry = new THREE.PlaneGeometry(size.width, size.height);
    this.material = new THREE.MeshPhongMaterial({
      color: color,
      specular: 0x050505
    });
    this.material.color.setHSL(0.095, 1, 0.75);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.y = -20;
    this.mesh.receiveShadow = true;
  }

  update(dt) {
    this.mesh.rotation.x = -Math.PI / 2;
  }

  getMesh() {
    return this.mesh;
  }
}

export default Floor;
