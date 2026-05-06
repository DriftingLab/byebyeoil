// Reusable Three.js viewer for product GLB models.
// Used by the performance page (app.js) and the dictionary page.
class ModelViewer {
    constructor(canvas, sizeContainer) {
        this.canvas = canvas;
        this.sizeContainer = sizeContainer || canvas;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);

        const width = this.sizeContainer.clientWidth || canvas.width || 320;
        const height = this.sizeContainer.clientHeight || canvas.height || 160;
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.z = 3;

        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        const ambient = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambient);
        const directional = new THREE.DirectionalLight(0xffffff, 1);
        directional.position.set(5, 5, 5);
        this.scene.add(directional);
        const point = new THREE.PointLight(0xffffff, 0.5);
        point.position.set(-5, -5, 5);
        this.scene.add(point);

        this.mesh = null;
        this._animate = this._animate.bind(this);
        this._animate();

        window.addEventListener('resize', () => this._onResize());
    }

    _onResize() {
        const w = this.sizeContainer.clientWidth || this.canvas.width || 320;
        const h = this.sizeContainer.clientHeight || this.canvas.height || 160;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
    }

    _animate() {
        requestAnimationFrame(this._animate);
        if (this.mesh) {
            this.mesh.rotation.x += 0.003;
            this.mesh.rotation.y += 0.005;
            this.mesh.rotation.z += 0.002;
        }
        this.renderer.render(this.scene, this.camera);
    }

    _replaceMesh(obj) {
        if (this.mesh) this.scene.remove(this.mesh);
        this.mesh = obj;
        this.scene.add(this.mesh);
    }

    _fitCenterAndScale(obj) {
        const pivot = new THREE.Object3D();
        const box = new THREE.Box3().setFromObject(obj);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        const distance = Math.abs(this.camera.position.z);
        const fovRad = (this.camera.fov * Math.PI) / 180;
        const fullHeight = 2 * Math.tan(fovRad / 2) * distance;
        const desiredHeight = fullHeight * 0.45;

        const maxDim = Math.max(size.x, size.y, size.z, 1e-6);
        const scale = desiredHeight / maxDim;
        obj.scale.setScalar(scale);

        const box2 = new THREE.Box3().setFromObject(obj);
        box2.getSize(size);
        box2.getCenter(center);
        obj.position.x -= center.x;
        obj.position.y -= center.y;
        obj.position.z -= center.z;

        pivot.add(obj);
        return pivot;
    }

    _fallbackMesh(productName) {
        const product = (productName || '').toLowerCase();
        let geometry;
        if (product.includes('toothbrush')) geometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 32);
        else if (product.includes('clothes') || product.includes('shirt')) geometry = new THREE.ConeGeometry(1, 1.5, 32);
        else if (product.includes('coffee')) geometry = new THREE.CylinderGeometry(0.6, 0.5, 1.2, 32);
        else if (product.includes('bottle') || product.includes('cup')) geometry = new THREE.CylinderGeometry(0.5, 0.6, 1.3, 32);
        else if (product.includes('phone') || product.includes('tablet')) geometry = new THREE.BoxGeometry(0.6, 1.2, 0.1);
        else if (product.includes('laptop')) geometry = new THREE.BoxGeometry(1.4, 0.9, 0.1);
        else if (product.includes('shoe')) geometry = new THREE.BoxGeometry(0.8, 0.5, 1.2);
        else if (product.includes('book')) geometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
        else if (product.includes('ball') || product.includes('sphere')) geometry = new THREE.SphereGeometry(0.7, 32, 32);
        else if (product.includes('tire') || product.includes('wheel')) geometry = new THREE.TorusGeometry(0.8, 0.3, 32, 100);
        else if (product.includes('paint')) geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.8, 32);
        else if (product.includes('blanket') || product.includes('sheet')) geometry = new THREE.PlaneGeometry(1.5, 1);
        else if (product.includes('mattress')) geometry = new THREE.BoxGeometry(2, 0.3, 1.2);
        else if (product.includes('refrigerator')) geometry = new THREE.BoxGeometry(0.8, 1.4, 0.6);
        else if (product.includes('monitor')) geometry = new THREE.BoxGeometry(1.2, 0.7, 0.15);
        else if (product.includes('chair')) geometry = new THREE.CylinderGeometry(0.4, 0.4, 1, 32);
        else if (product.includes('tent') || product.includes('cone')) geometry = new THREE.ConeGeometry(1, 1.2, 32);
        else if (product.includes('keyboard')) geometry = new THREE.BoxGeometry(1.4, 0.3, 0.5);
        else geometry = new THREE.BoxGeometry(1, 1, 1);

        const material = new THREE.MeshPhongMaterial({ color: 0x9e9e9e, shininess: 20 });
        return new THREE.Mesh(geometry, material);
    }

    loadProduct(productName) {
        const slug = productName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
        const candidates = [
            `obj/${slug}.glb`,
            `obj/${slug.replace(/_/g, ' ')}.glb`,
            `obj/${productName}.glb`,
            `obj/${productName.toLowerCase()}.glb`,
            `obj/${productName.replace(/ /g, '_')}.glb`,
        ];
        const objPath = `models/${slug}.obj`;

        const useFallback = () => {
            const obj = this._fallbackMesh(productName);
            this._replaceMesh(this._fitCenterAndScale(obj));
        };

        const tryGLB = (i, gltfLoader) => {
            if (i >= candidates.length) {
                if (window.THREE && THREE.OBJLoader) {
                    const loader = new THREE.OBJLoader();
                    loader.load(objPath, (object) => {
                        object.traverse((c) => { if (c.isMesh) c.material = new THREE.MeshPhongMaterial({ color: 0x9e9e9e }); });
                        this._replaceMesh(this._fitCenterAndScale(object));
                    }, undefined, useFallback);
                } else {
                    useFallback();
                }
                return;
            }
            gltfLoader.load(encodeURI(candidates[i]), (gltf) => {
                const obj = gltf.scene || (gltf.scenes && gltf.scenes[0]);
                obj.traverse((c) => { if (c.isMesh) c.material = c.material || new THREE.MeshPhongMaterial({ color: 0x9e9e9e }); });
                obj.position.set(0, 0, 0);
                obj.rotation.set(0, 0, 0);
                this._replaceMesh(this._fitCenterAndScale(obj));
            }, undefined, () => tryGLB(i + 1, gltfLoader));
        };

        if (window.THREE && THREE.GLTFLoader) {
            tryGLB(0, new THREE.GLTFLoader());
        } else if (window.THREE && THREE.OBJLoader) {
            const loader = new THREE.OBJLoader();
            loader.load(objPath, (object) => {
                object.traverse((c) => { if (c.isMesh) c.material = new THREE.MeshPhongMaterial({ color: 0x9e9e9e }); });
                this._replaceMesh(this._fitCenterAndScale(object));
            }, undefined, useFallback);
        } else {
            useFallback();
        }
    }
}

window.ModelViewer = ModelViewer;
