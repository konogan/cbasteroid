import Capabilities from './capabilities';
import Asteroid from './asteroid';
import Starfield from './starfield';

import Canon from './canon';

class Application {

    constructor(domElement) {

        this.capabilities = new Capabilities();
        this.objects = [];

        this.center = new THREE.Vector3(0, 0, 0);
        this.container = domElement;
        this.scene = new THREE.Scene();

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
        this.renderer.shadowMap.cullFace = THREE.BasicShadowMap;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        // main cam
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
        this.camera.position.set(0, 0, 0);
        this.scene.add(this.camera);

        // debug camera
        this.camera2 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
        this.camera2.position.set(25, 25, 25);
        this.camera2.lookAt(this.scene.position);

        if (this.capabilities.isMobile()) {
            this.controls = new THREE.DeviceOrientationControls(this.camera);
            this.controls.connect();
            if (
                document.fullscreenEnabled ||
                document.webkitFullscreenEnabled ||
                document.mozFullScreenEnabled ||
                document.msFullscreenEnabled
            ) {
                window.addEventListener('click', event => this.setFullscreen(document.documentElement, event), false);
            }
        }
        if (this.capabilities.isCardBoard()) {
            this.effect = new THREE.StereoEffect(this.renderer);
            this.effect.eyeSeparation = 10;
            this.effect.setSize(window.innerWidth, window.innerHeight);
        }

        this.controls = new THREE.OrbitControls(this.camera, this.container);
        this.controls.target.set(
            this.camera.position.x + 0.1,
            this.camera.position.y,
            this.camera.position.z
        );

        window.addEventListener('resize', event => this.resize(event), false);

        //debug
        const CameraHelper = new THREE.CameraHelper(this.camera);
        this.scene.add(CameraHelper);

        this.buildScene();
    }

    buildScene() {
        for (var i = 0; i < 50; i++) {
            this.add(new Asteroid());
        }

        let starfield = new Starfield(10000);
        this.add(starfield);

        let canon = new Canon();
        this.camera.add(canon.getMesh());

        console.log(canon);
    }

    run(debug = false) {
        this.debug = debug;
        this.clock = new THREE.Clock();
        this.animate();
    }

    stop() {

    }

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
        let width = window.innerWidth;
        let height = window.innerHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        if (this.capabilities.isCardBoard()) {
            this.effect.setSize(width, height);
        }
    }

    update(delta) {
        this.controls.update();
        this.objects.forEach((object) => {

            //object.update(delta);
        });
    }

    render(delta) {
        if (this.capabilities.isCardBoard()) {
            this.effect.render(this.scene, this.camera);
        } else {
            if(this.debug) {
            this.renderer.render(this.scene, this.camera2);
        } else {
            this.renderer.render(this.scene, this.camera);
        }
        }
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
