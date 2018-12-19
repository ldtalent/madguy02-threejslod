var scene = new THREE.Scene(); // creating a scene with THREE library
var camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000); // perspective camera, for the scene viewer (adjustable as preferred)
var renderer = new THREE.WebGLRenderer(); // Three.js uses WebGl at the core, a renderer required to render scene
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // plain js to adjust the rendered model

window.addEventListener('resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
}) // generic event handler for resizing the content window

controls = new THREE.OrbitControls(camera, renderer.domElement); // orbit controls helps to move around the scene
// initial position of the camera (adjustable as preferred)
camera.position.x = 0; 
camera.position.y = 0;
camera.position.z = -200;
camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
// camera.position.z = 4;
const objs = [];
var loader = new THREE.ObjectLoader(); // crucial loader, loading the scene with ObjectLoader lib
var loaders = new THREE.OBJLoader(); 

// using the loader in a call back to load the model which is json here
loader.load('/models/demo123/earth-animation-webgl.json', function(object){
 
    scene.add(object);
},

(ev) => {
    console.log(ev);
}, (e) => {
    console.log(e);
});

var update = function() {
   
 }

var render = function() {
    renderer.render(scene, camera);
};

var GameLoop = function() {
    requestAnimationFrame(GameLoop);
    update();
    render();
}

GameLoop();