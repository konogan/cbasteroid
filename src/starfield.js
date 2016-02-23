class Starfield {
    constructor(numberOfStars) {
        const stars = new THREE.Geometry();
        const pMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 16,
            map: THREE.ImageUtils.loadTexture(
                './res/textures/particle.png'
            ),
            blending: THREE.AdditiveBlending,
            transparent: true
        });

        for (var p = 0; p < numberOfStars; p++) {
            let pX = (Math.floor(Math.random() * 2100) - 1000) * 5;
            let pY = (Math.floor(Math.random() * 2100) - 1000) * 5;
            let pZ = (Math.floor(Math.random() * 2100) - 1000) * 5;
            let star = new THREE.Vector3(pX, pY, pZ);
            stars.vertices.push(star);
        }
        this.starfield = new THREE.Points(
            stars,
            pMaterial);
    }

    update(dt) {

    }

    getMesh() {
        return this.starfield;
    }
}

export default Starfield;
