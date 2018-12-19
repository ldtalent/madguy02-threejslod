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

 
var lod = new THREE.LOD();
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh( geometry, material );
lod.addLevel(cube, 70);
scene.add( lod );

loader.load('models/robot-threejs/robot.json', function(object){
    
    lod.addLevel(object,20);
    scene.add(lod);
})

 
 var update = function() {
   

 }

var render = function() {
    lod.update(camera);
    renderer.render(scene, camera);
};

var GameLoop = function() {
    requestAnimationFrame(GameLoop);
    update();
    render();
}

GameLoop();