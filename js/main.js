//Canvas
var myCanvas = document.getElementById('mycanvas');

//Scene
const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

//Camera
var height = window.innerHeight;
var width = window.innerWidth;
var distance = 50000;
var diag = Math.sqrt((height * height) + (width * width))
var fov = 2 * Math.atan((diag) / (1 * distance)) * (180 / Math.PI); //Field of View
var camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, distance);
// TOP VIEW
// camera.position.set(0, 40, 0);
// BOTTOM LEFT VIEW
camera.position.set(20, 10, 20);

//Renderer
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xefefff, 5);
dirLight.position.set(10, 10, 10);
scene.add(dirLight);

var renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: myCanvas,
    alpha: true
});

//renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.antialias = true;
document.body.appendChild(renderer.domElement);

function resize() {
    //UPDATE TO CANVAS WRAPPER
    console.log("resizing");
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", resize);

//LIGHTS
function initLight() {
    const light = new THREE.DirectionalLight(0xFFFFFF, 5);
    light.name = 'light';
    light.castShadows = true;
    light.position.set(-100, 100, 0);
    light.target.position.set(0, 100, 100);
    scene.add(light);
    light.target.name = 'light.target';
    scene.add(light.target);

    //add light helper
    const lightHelper = new THREE.DirectionalLightHelper(light, 10);
    lightHelper.name = 'lightHelper';
    scene.add(lightHelper);
    lightHelper.parent.updateMatrixWorld();
    lightHelper.update();

    //add shadow helper
    const shadowHelper = new THREE.CameraHelper(light.shadow.camera);
    shadowHelper.name = 'shadowHelper';
    scene.add(shadowHelper);
    shadowHelper.parent.updateMatrixWorld();
    shadowHelper.update();
}

//OrbitControls
orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.maxPolarAngle = Math.PI / 2;
orbit.update();

// Instantiate a loader
var loader = new THREE.GLTFLoader();
loader.load('Huakaʻi_Campus Render1.glb', handle_load);

var mesh;

function handle_load(gltf) {
    mesh = gltf.scene;
    scene.add(mesh);
}

//Render loop
render();

var delta = 0;
var prevTime = Date.now();

function render() {
    //exposure
    renderer.toneMappingExposure = Math.pow(0.7, 5.0);  // -> exposure: 0.168
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}
