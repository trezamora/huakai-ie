/////////////////////////////////////////////////////////////////////////
///// DIV WRAPPER CREATION TO HOLD THREEJS EXPERIENCE
const mapwrapper = document.querySelector('#map-wrapper');
let mapwrapper_h = mapwrapper.getBoundingClientRect().height;
let mapwrapper_w = mapwrapper.getBoundingClientRect().width;

/////////////////////////////////////////////////////////////////////////
///// SCENE CREATION
const scene = new THREE.Scene()

/////////////////////////////////////////////////////////////////////////
///// RENDERER CONFIG
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }) // turn on antialias
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) //set pixel ratio
renderer.setSize(mapwrapper_w, mapwrapper_h) // make it full screen
renderer.outputEncoding = THREE.sRGBEncoding // set color encoding
mapwrapper.appendChild(renderer.domElement) // add the renderer to html div

/////////////////////////////////////////////////////////////////////////
///// CAMERAS CONFIG
const camera = new THREE.PerspectiveCamera(1, mapwrapper_w / mapwrapper_h, 1, 1000)
camera.position.set(60, 20, 80)
scene.add(camera)

/////////////////////////////////////////////////////////////////////////
///// MAKE EXPERIENCE RESPONSIVE ON RESIZE
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    mapwrapper_h = mapwrapper.getBoundingClientRect().height; // get resized wrapper height
    mapwrapper_w = mapwrapper.getBoundingClientRect().width; // get resized wrapper width
    camera.aspect = mapwrapper_w / mapwrapper_h; // reset the aspect ratio
    camera.updateProjectionMatrix(); // update with the new aspect ratio
    renderer.setSize(mapwrapper_w, mapwrapper_h) // make it full sized to the wrapper
    mapwrapper.appendChild(renderer.domElement) // add the renderer to html div
}

/////////////////////////////////////////////////////////////////////////
///// CREATE ORBIT CONTROLS
//OrbitControls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2;
controls.update();


/////////////////////////////////////////////////////////////////////////
///// SCENE LIGHTS
const ambient = new THREE.AmbientLight(0xa0a0fc, 2)
scene.add(ambient)

const sunLight = new THREE.DirectionalLight(0xFFFFFF, 2)
sunLight.position.set(-69, 44, 14)
scene.add(sunLight)

/////////////////////////////////////////////////////////////////////////
///// LOADING GLB/GLTF MODEL FROM BLENDER
const loader = new THREE.GLTFLoader();
loader.load('models/gltf/Huakaʻi_Campus Render1.glb', handle_load);
let mesh;
function handle_load(gltf) {
    mesh = gltf.scene;
    scene.add(mesh);
}


/////////////////////////////////////////////////////////////////////////
//// INTRO CAMERA ANIMATION USING TWEEN
function introAnimation() {
    controls.enabled = false //disable orbit controls to animate the camera

    new TWEEN.Tween(camera.position.set(60, 20, 80)).to({ // from camera position
        x: 0, //desired x position to go
        y: 100, //desired y position to go
        z: 10 //desired z position to go
    }, 5500) // time take to animate
        .delay(1000).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
        .onComplete(function () { //on finish animation
            controls.enabled = true //enable orbit controls
            setOrbitControlsLimits() //enable controls limits
            TWEEN.remove(this) // remove the animation from memory
        })
}

introAnimation() // call intro animation on start

/////////////////////////////////////////////////////////////////////////
//// DEFINE ORBIT CONTROLS LIMITS
function setOrbitControlsLimits() {
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 0
    controls.maxDistance = 99999
    controls.enablePan = true;
    controls.enableRotate = true
    controls.rotateSpeed = .05
    controls.enableZoom = true
    controls.maxPolarAngle = Math.PI / 2 // Math.PI /2.5
}

/////////////////////////////////////////////////////////////////////////
//// RENDER LOOP FUNCTION
function renderLoop() {
    TWEEN.update() // update animations
    controls.target.set(0, .4, 0)
    controls.update() // update orbit controls
    renderer.render(scene, camera) // render the scene using the camera
    requestAnimationFrame(renderLoop) //loop the render function
}

renderLoop() //start rendering

/////////////////////////////////////////////////////////////////////////
//// BUTTON: CONSOLE.LOG THE CAM POSITION
const button_camposition = document.querySelector('#camposition')
camposition.onclick = function () {
    console.log(camera.position)
    console.log(controls.target)
}

// LOCATION NOTES
// Home: x: -8.095036266101356, y: 10.908493092719864, z: -3.7950691743832476
// Cafeteria: x: -8.095036266101356, y: 10.908493092719864, z: -3.7950691743832476
// Mokihana: x: 0.4899505199785652, y: 0.4675704629309256, z: 1.5217625611973327

/////////////////////////////////////////////////////////////////////////
//// BUTTON: GO HOME
function goToHome() {
    controls.enabled = false //disable orbit controls to animate the camera
    new TWEEN.Tween(camera.position).to({ // from camera position
        x: 0, //desired x position to go
        y: 100, //desired y position to go
        z: 10 //desired z position to go

    }, 2000) // time take to animate
        .delay(0).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
        .onComplete(function () { //on finish animation
            controls.enabled = true //enable orbit controls
            setOrbitControlsLimits() //enable controls limits
            TWEEN.remove(this) // remove the animation from memory
        })
}
const button_home = document.querySelector('#home')
button_home.onclick = function () {
    goToHome()
}

/////////////////////////////////////////////////////////////////////////
//// BUTTON: GO TO CAFETERIA
function goToCafeteria() {
    controls.enabled = false //disable orbit controls to animate the camera
    new TWEEN.Tween(camera.position).to({ // from camera position
        x: -8.095036266101356, //desired x position to go
        y: 10.908493092719864, //desired y position to go
        z: -3.7950691743832476 //desired z position to go

    }, 2000) // time take to animate
        .delay(0).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
        .onComplete(function () { //on finish animation
            controls.enabled = true //enable orbit controls
            setOrbitControlsLimits() //enable controls limits
            TWEEN.remove(this) // remove the animation from memory
        })
}
const button_cafeteria = document.querySelector('#cafeteria')
button_cafeteria.onclick = function () {
    goToCafeteria()
}


/////////////////////////////////////////////////////////////////////////
//// BUTTON: GO TO MOKIHANA
function goToMokihana() {
    controls.enabled = false //disable orbit controls to animate the camera
    new TWEEN.Tween(camera.position).to({ // from camera position
        x: 0.4899505199785652, //desired x position to go
        y: 0.4675704629309256, //desired y position to go
        z: 1.5217625611973327 //desired z position to go
    }, 2000) // time take to animate
        .delay(0).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
        .onComplete(function () { //on finish animation
            controls.enabled = true //enable orbit controls
            setOrbitControlsLimits() //enable controls limits
            TWEEN.remove(this) // remove the animation from memory
        })

    // VIA GSAP
    // setTimeout( function() {
    //     gsap.to( camera, {
    //         duration: 2,
    //         zoom: 2,
    //         onUpdate: function () {
    //             camera.updateProjectionMatrix();
    //         }
    //     } );
    //     gsap.to( controls.target, {
    //         duration: 2,
    //         x: .7,
    //         y: 1.3,
    //         z: 3.6,
    //         onUpdate: function () {
    //             controls.update();
    //         }
    //     } );
    // }, 2000 )

}
const button_mokihana = document.querySelector('#mokihana')
button_mokihana.onclick = function () {
    goToMokihana()
}

//Renderer
const ambientLight = new THREE.AmbientLight(0xffffff, .2);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(light, 1);
dirLight.position.set(100, 10, 100);
scene.add(dirLight);


// //Renderer
// const ambientLight = new THREE.AmbientLight(0xece1bc, 1);
// scene.add(ambientLight);

// const dirLight = new THREE.DirectionalLight(light, .3);
// dirLight.position.set(100, 10, 100);
// scene.add(dirLight);


// //Canvas
// var myCanvas = document.getElementById('mycanvas');

// //Scene
// const scene = new THREE.Scene();

// //Camera
// var height = window.innerHeight;
// var width = window.innerWidth;
// var distance = 50000;
// var diag = Math.sqrt((height * height) + (width * width))
// var fov = 2 * Math.atan((diag) / (1 * distance)) * (180 / Math.PI); //Field of View
// var camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, 0.1, 1000);
// // var camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, distance);
// // TOP VIEW
// camera.position.set(0, 40, 0);
// // BOTTOM LEFT VIEW
// // camera.position.set(20, 10, 20);



// var renderer = new THREE.WebGLRenderer({
//     antialias: true,
//     canvas: myCanvas,
//     alpha: true
// });

// //renderer.setClearColor(0x000000);
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.gammaInput = true;
// renderer.gammaOutput = true;
// renderer.antialias = true;
// document.body.appendChild(renderer.domElement);

// function resize() {
//     //UPDATE TO CANVAS WRAPPER
//     console.log("resizing");
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }

// window.addEventListener("resize", resize);

// //LIGHTS
// function initLight() {
//     const light = new THREE.DirectionalLight(0xFFFFFF, 5);
//     light.name = 'light';
//     light.castShadows = true;
//     light.position.set(-100, 100, 0);
//     light.target.position.set(0, 100, 100);
//     scene.add(light);
//     light.target.name = 'light.target';
//     scene.add(light.target);

//     //add light helper
//     const lightHelper = new THREE.DirectionalLightHelper(light, 10);
//     lightHelper.name = 'lightHelper';
//     scene.add(lightHelper);
//     lightHelper.parent.updateMatrixWorld();
//     lightHelper.update();

//     //add shadow helper
//     const shadowHelper = new THREE.CameraHelper(light.shadow.camera);
//     shadowHelper.name = 'shadowHelper';
//     scene.add(shadowHelper);
//     shadowHelper.parent.updateMatrixWorld();
//     shadowHelper.update();
// }

// //OrbitControls
// orbit = new THREE.OrbitControls(camera, renderer.domElement);
// orbit.maxPolarAngle = Math.PI / 2;
// orbit.update();

// // Instantiate a loader
// var loader = new THREE.GLTFLoader();
// loader.load('Huakaʻi_Campus Render1.glb', handle_load);

// var mesh;

// function handle_load(gltf) {
//     mesh = gltf.scene;
//     scene.add(mesh);
// }

// //Render loop
// render();

// var delta = 0;
// var prevTime = Date.now();

// function render() {
//     //exposure
//     renderer.toneMappingExposure = Math.pow(0.7, 5.0);  // -> exposure: 0.168
//     renderer.render(scene, camera);

//     requestAnimationFrame(render);
// }
