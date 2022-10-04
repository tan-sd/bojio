let scene, camera, renderer, cube, loader;

var obj;

function init() {

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

var light = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
scene.add(light);
camera.position.set(0, -0.05, 0.6);

scene.background = new THREE.Color(0xFFFFFF);

renderer = new THREE.WebGLRenderer( { antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

var container = document.getElementById('container');
container.appendChild(renderer.domElement);

loader = new THREE.GLTFLoader();

loader.load("3d-model/singapore-map.gltf", function(gltf) {
    obj = gltf.scene;
    scene.add(gltf.scene);
});

};

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
