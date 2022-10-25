// Global Variables
var scene, camera, renderer, cube, loader;

var obj;
var car;
var keyboard = new THREEx.KeyboardState();

init();
animate();

function init() {

// Setting up Scene
scene = new THREE.Scene();

// Setting up the camera
camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    20000
);
camera.position.set(0, -0.05, 100);

// Setting up the lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(100, 300, 400);
scene.add(directionalLight);

scene.background = new THREE.Color(0xFFFFFF);

// Set up render 
renderer = new THREE.WebGLRenderer( { antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

var container = document.getElementById('container');
container.appendChild(renderer.domElement);
mouse = new THREE.Vector2(1,1);

var loader = new THREE.GLTFLoader();

// Singapore Map
loader.load("3d-model/singapore-map.gltf", function(gltf) {
    obj = gltf.scene;
    gltf.scene.scale.set(150, 150 ,150);
    scene.add(gltf.scene);
});

document.addEventListener('mousemove', onDocumentMouseMove, false);

function onDocumentMouseMove(event)
{
  console.log('inside mouse move');
	// the follo
  // wing line would stop any other event handler from firing
	// (such as the mouse's TrackballControls)
	event.preventDefault();

	// update the mouse variable
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}

// Car
car = createCar();
car.scale.set(0.15, 0.15, 0.15);
car.position.y = 1;
car.position.z = -1;
car.lookAt(0, 0, 0);
scene.add(car);

};

// Create rest of car
function createCar() {
    const car = new THREE.Group();
  
    const backWheel = createWheels();
    backWheel.position.y = 6;
    backWheel.position.x = -18;
    car.add(backWheel);
  
    const frontWheel = createWheels();
    frontWheel.position.y = 6;
    frontWheel.position.x = 18;
    car.add(frontWheel);
  
    const main = new THREE.Mesh(
      new THREE.BoxBufferGeometry(60, 15, 30),
      new THREE.MeshLambertMaterial({ color: 0xa52523 })
    );
    main.position.y = 12;
    car.add(main);
  
    const carFrontTexture = getCarFrontTexture();
  
    const carBackTexture = getCarFrontTexture();
  
    const carRightSideTexture = getCarSideTexture();
  
    const carLeftSideTexture = getCarSideTexture();
    carLeftSideTexture.center = new THREE.Vector2(0.5, 0.5);
    carLeftSideTexture.rotation = Math.PI;
    carLeftSideTexture.flipY = false;
  
    const cabin = new THREE.Mesh(new THREE.BoxBufferGeometry(33, 12, 24), [
      new THREE.MeshLambertMaterial({ map: carFrontTexture }),
      new THREE.MeshLambertMaterial({ map: carBackTexture }),
      new THREE.MeshLambertMaterial({ color: 0xffffff }), // top
      new THREE.MeshLambertMaterial({ color: 0xffffff }), // bottom
      new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
      new THREE.MeshLambertMaterial({ map: carLeftSideTexture })
    ]);
    cabin.position.x = -6;
    cabin.position.y = 25.5;
    car.add(cabin);
  
    return car;
  }

// Create car wheels
function createWheels() {
    const geometry = new THREE.BoxBufferGeometry(12, 12, 33);
    const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const wheel = new THREE.Mesh(geometry, material);
    return wheel;
  }
  
  function getCarFrontTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");
  
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 64, 32);
  
    context.fillStyle = "#666666";
    context.fillRect(8, 8, 48, 24);
  
    return new THREE.CanvasTexture(canvas);
  }
  
  function getCarSideTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 32;
    const context = canvas.getContext("2d");
  
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 128, 32);
  
    context.fillStyle = "#666666";
    context.fillRect(10, 8, 38, 24);
    context.fillRect(58, 8, 60, 24);
  
    return new THREE.CanvasTexture(canvas);
  }

function animate() {
    requestAnimationFrame( animate );

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01
    // car.rotation.y += 0.007;
    // car.translateX(1);
    renderer.render(scene, camera);

    update();
}

function update() {
    if ( keyboard.pressed("up") )
        car.translateX(0.1);
    if ( keyboard.pressed('left') )
        car.rotation.y += 0.01;
    if ( keyboard.pressed('right') )
        car.rotation.y -= 0.01;
    if ( keyboard.pressed('down') )
        car.translateX(-0.1);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);