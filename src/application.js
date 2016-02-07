class Application {
  constructor(domElement) {
    this.objects = [];

    this.clock = new THREE.Clock();
    this.center = new THREE.Vector3(0, 0, 0);

    this.container = domElement;
    this.createScene();
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    this.camera.position.set(10, 5, 0);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.light = new THREE.HemisphereLight(0x777777, 0x0000FF, 1);
    //this.scene.add(this.light);

    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(200, 1000, 100);
    this.spotLight.castShadow = true;
    this.spotLight.shadowMapWidth = 1024;
    this.spotLight.shadowMapHeight = 1024;
    this.spotLight.shadowCameraNear = 500;
    this.spotLight.shadowCameraFar = 4000;
    this.spotLight.shadowCameraFov = 30;
    this.scene.add(this.spotLight);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.cullFace = THREE.CullFaceBack;

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.container.appendChild(this.renderer.domElement);
    this.createListeners();
    this.render();
  }

  createListeners() {
    var self = this;
    window.addEventListener('resize', self.resize(), false);
  }

  fullscreen() {
    if (this.container.requestFullscreen) {
      this.container.requestFullscreen();
    } else if (this.container.msRequestFullscreen) {
      this.container.msRequestFullscreen();
    } else if (this.container.mozRequestFullScreen) {
      this.container.mozRequestFullScreen();
    } else if (this.container.webkitRequestFullscreen) {
      this.container.webkitRequestFullscreen();
    }
  }

  resize(e) {
    console.log(e);
    var width = window.innerWidth;
    var height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    //this.effect.setSize(width, height);
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    this.objects.forEach((object) => {
      object.update(this.clock.getDelta());
    });

    this.renderer.render(this.scene, this.camera);
  }

  add(mesh) {
    this.objects.push(mesh);
    this.scene.add(mesh.getMesh());
  }
}

export default Application;
