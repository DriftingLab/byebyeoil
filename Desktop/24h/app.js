// Three.js Scene Setup
let scene, camera, renderer, mesh;
let isInitialized = false;
// Keep last displayed product entry so UI persists until next schedule change
let lastProductEntry = null;

function initThreeJS() {
    const canvas = document.getElementById('canvas');
    const container = document.querySelector('.main-content');

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Camera setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 3;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    // Create initial mesh
    createDefaultMesh();

    isInitialized = true;
    animate();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function createDefaultMesh() {
    if (mesh) {
        scene.remove(mesh);
    }

    // Create a simple rotating cube as default
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
        color: 0x2ecc71,
        shininess: 100,
        emissive: 0x1a1a1a
    });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}

function createProductMesh(productName) {
    // Try to load an OBJ model matching the product name first.
    const slug = productName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
    const objPath = `models/${slug}.obj`;
    // build candidate GLB filenames to handle spaces/casing/underscores
    const rawName = productName;
    const candidates = [
        `obj/${slug}.glb`,
        `obj/${slug.replace(/_/g, ' ')}.glb`,
        `obj/${rawName}.glb`,
        `obj/${rawName.toLowerCase()}.glb`,
        `obj/${rawName.replace(/ /g, '_')}.glb`,
    ];

    // helper to create fallback geometry
    function createFallback() {
        if (mesh) {
            scene.remove(mesh);
        }
        let geometry;
        const product = productName.toLowerCase();
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
        else geometry = new THREE.BoxGeometry(1,1,1);

        const material = new THREE.MeshPhongMaterial({ color: 0x9e9e9e, shininess: 20 });
        mesh = new THREE.Mesh(geometry, material);
        // fit, center and add
        fitCenterAndScale(mesh);
        scene.add(mesh);
    }

    // Fit the object to occupy ~1/4 of the viewport height and center it.
    function fitCenterAndScale(obj) {
        try {
            // if a pivot is desired, wrap the object so we rotate around pivot
            const pivot = new THREE.Object3D();
            // ensure object has geometry bounds
            const box = new THREE.Box3().setFromObject(obj);
            const size = new THREE.Vector3();
            box.getSize(size);
            const center = new THREE.Vector3();
            box.getCenter(center);

            // compute desired height in world units using camera fov and distance
            // target: object occupies ~1/4 of the viewport height
            const distance = Math.abs(camera.position.z - 0);
            const fovRad = (camera.fov * Math.PI) / 180;
            const fullHeight = 2 * Math.tan(fovRad / 2) * distance;
                const desiredHeight = fullHeight * 0.45;

            // use the largest model dimension so very flat objects (like laptops)
            // and very tall/thin objects (like toothbrushes) end up visually similar
            const maxDim = Math.max(size.x, size.y, size.z, 1e-6);
            const scale = (maxDim > 0) ? (desiredHeight / maxDim) : 1;

            obj.scale.setScalar(scale);

            // re-compute bounding box and center after scale
            const box2 = new THREE.Box3().setFromObject(obj);
            box2.getSize(size);
            box2.getCenter(center);

            // translate object so its center is at the world origin (for centered rotation)
            obj.position.x -= center.x;
            obj.position.y -= center.y;
            obj.position.z -= center.z;

            // wrap in pivot so rotation happens about the object's center
            pivot.add(obj);
            mesh = pivot;
        } catch (e) {
            // fallback: just leave the object as-is
            mesh = obj;
        }
    }

    // Try to load GLB/GLTF model from `obj/` folder first (if GLTFLoader is available)
    if (window.THREE && window.THREE.GLTFLoader) {
        const gltfLoader = new THREE.GLTFLoader();
        // try candidates sequentially
        const tryLoadGLB = (index) => {
            if (index >= candidates.length) {
                // no GLB found, fall back to OBJ
                if (window.THREE && window.THREE.OBJLoader) {
                    const objLoader = new THREE.OBJLoader();
                    objLoader.load(objPath,
                        function (object) {
                            if (mesh) scene.remove(mesh);
                            // ensure basic material
                            object.traverse(function(child){ if (child.isMesh) child.material = new THREE.MeshPhongMaterial({ color: 0x9e9e9e }); });
                            // fit, center and set global mesh to the pivoted object
                            fitCenterAndScale(object);
                            // add the normalized mesh (fitCenterAndScale sets `mesh`)
                            scene.add(mesh);
                        },
                        undefined,
                        function (err) { createFallback(); }
                    );
                } else {
                    createFallback();
                }
                return;
            }

            const pathCandidate = candidates[index];
            gltfLoader.load(encodeURI(pathCandidate),
                function(gltf) {
                    if (mesh) scene.remove(mesh);
                    let obj = gltf.scene || (gltf.scenes && gltf.scenes[0]);
                    obj.traverse(function(child){ if (child.isMesh) child.material = child.material || new THREE.MeshPhongMaterial({ color: 0x9e9e9e }); });
                    obj.position.set(0, 0, 0);
                    obj.rotation.set(0, 0, 0);
                    fitCenterAndScale(obj);
                    scene.add(mesh);
                },
                undefined,
                function(err) {
                    // try next candidate
                    tryLoadGLB(index + 1);
                }
            );
        };

        tryLoadGLB(0);
    } else if (window.THREE && window.THREE.OBJLoader) {
        // GLTFLoader not present, try OBJ
        const loader = new THREE.OBJLoader();
        loader.load(objPath,
            function (object) {
                            if (mesh) scene.remove(mesh);
                            let obj = object;
                            obj.traverse(function(child){ if (child.isMesh) child.material = new THREE.MeshPhongMaterial({ color: 0x9e9e9e }); });
                            obj.position.set(0, 0, 0);
                            obj.rotation.set(0, 0, 0);
                            fitCenterAndScale(obj);
                            scene.add(mesh);
            },
            undefined,
            function (err) { createFallback(); }
        );
    } else {
        createFallback();
    }
}

function animate() {
    requestAnimationFrame(animate);

    if (mesh) {
        mesh.rotation.x += 0.003;
        mesh.rotation.y += 0.005;
        mesh.rotation.z += 0.002;
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    const container = document.querySelector('.main-content');
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// Update time display
function updateTime() {
    const now = new Date();
    // 24-hour format with leading zeros
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    document.getElementById('timeDisplay').textContent = `${hours}:${minutes}`;

    return { hours: now.getHours(), minutes: now.getMinutes() };
}

// Update product display
function updateProduct(hours, minutes) {
    const candidate = getProductByTime(hours, minutes);
    if (!candidate) return;

    // If we don't have a lastProductEntry yet, set it. Otherwise keep the last one
    // until the schedule actually moves to a new entry (different time or product).
    if (!lastProductEntry || lastProductEntry.time !== candidate.time || lastProductEntry.product !== candidate.product) {
        lastProductEntry = candidate;

        // Create/replace 3D model based on product
        createProductMesh(lastProductEntry.product);

        // Populate the fixed table cells (matches the two-row design)
        const nameCell = document.querySelector('.info-table .name-cell');
        const priceCell = document.querySelector('.info-table .price-cell');
        const usageCell = document.querySelector('.info-table .usage-cell');

        const materialCell = document.querySelector('.info-table .material-cell');
        const replacementCell = document.querySelector('.info-table .replacement-cell');

        if (nameCell) {
            const name = document.createElement('div');
            name.textContent = lastProductEntry.product;
            name.style.fontWeight = '600';
            const usage = document.createElement('div');
            usage.textContent = lastProductEntry.usage || lastProductEntry.petroleum || '';
            usage.style.fontSize = '13px';
            usage.style.color = '#666';
            usage.style.marginTop = '6px';
            // clear and append
            nameCell.innerHTML = '';
            nameCell.appendChild(name);

        }
        if (priceCell) priceCell.textContent = (lastProductEntry.price != null) ? `$${(lastProductEntry.price).toFixed(2)}` : '';
        if (usageCell) usageCell.textContent = lastProductEntry.usage || lastProductEntry.petroleum || '';

        if (materialCell) materialCell.textContent = lastProductEntry.petroleum_raw || '';
        if (replacementCell) replacementCell.textContent = lastProductEntry.alternative || '';
    }
}

// Main update function
function updateDisplay() {
    const time = updateTime();
    updateProduct(time.hours, time.minutes);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    updateDisplay();

    // Update display every 5 seconds to catch time changes
    setInterval(updateDisplay, 5000);

    // right-side list removed from performance page (handled on dictionary.html)

    // Also update immediately when minute changes
    const checkTime = () => {
        const now = new Date();
        const nextMinute = new Date(now.getTime());
        nextMinute.setMinutes(nextMinute.getMinutes() + 1);
        nextMinute.setSeconds(0);
        nextMinute.setMilliseconds(0);

        const timeout = nextMinute.getTime() - now.getTime();
        setTimeout(() => {
            updateDisplay();
            checkTime();
        }, timeout);
    };

    checkTime();
});
