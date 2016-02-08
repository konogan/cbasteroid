class Application {
  constructor(domElement) {
    this.objects = [];

    this.clock = new THREE.Clock();
    this.center = new THREE.Vector3(0, 0, 0);

    this.container = domElement;

    this.scene = new THREE.Scene();
    // camera
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    this.camera.position.set(10, 5, 0);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));


    //lights
    this.light = new THREE.HemisphereLight(0x777777, 0x0000FF, 1);
    this.scene.add(this.light);

    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(30, 30, 30);
    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 1024;
    this.spotLight.shadow.mapSize.height = 1024;
    this.spotLight.shadow.camera.near = 500;
    this.spotLight.shadow.camera.far = 4000;
    this.spotLight.shadow.camera.fov = 30;
    this.scene.add(this.spotLight);

    // renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.cullFace = THREE.CullFaceBack;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    // Fullscreen event
    if (
      document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled
    ) {
      window.addEventListener('click', event => this.setFullscreen(document.documentElement, event), false);
    }

    this.controls = new THREE.DeviceOrientationControls(this.camera);

    // this.controls = new THREE.OrbitControls(this.camera, this.container);
    // this.controls.target.set(
    //   this.camera.position.x + 0.1,
    //   this.camera.position.y,
    //   this.camera.position.z
    // );

    this.controls.connect();

    // if (typeof window.DeviceOrientationEvent != "undefined") {
    //   window.addEventListener('deviceorientation', event => this.setControls(event), true);
    // } else {

    // }
    window.addEventListener('resize', event => this.resize(event), false);
    this.animate();
  }

  // setControls(event) {
  //   if (event.alpha) {
  //     this.controls = new THREE.DeviceOrientationControls(this.camera, true);
  //     this.controls.connect();
  //     this.controls.update();

  //     window.removeEventListener('deviceorientation', event => this.setControls(event), true);
  //   }
  // }

  setFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  resize() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    //this.effect.setSize(width, height);
  }

  update(delta) {
    this.controls.update();
    this.objects.forEach((object) => {
      object.update(delta);
    });
  }

  render(delta) {
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    this.update(this.clock.getDelta());
    this.render(this.clock.getDelta());

    requestAnimationFrame(() => {
      this.animate();
    });
  }

  add(mesh) {
    this.objects.push(mesh);
    this.scene.add(mesh.getMesh());
  }
}

export default Application;
