var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
})

controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = -200;
camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
// camera.position.z = 4;
const objs = [];
var loader = new THREE.ObjectLoader();
var loaders = new THREE.OBJLoader();

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