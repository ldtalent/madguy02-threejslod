var scene = new THREE.Scene(); // creating a scene with THREE library
var camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 
    1000); // perspective camera, for the scene viewer (adjustable as preferred)
var renderer = new THREE.WebGLRenderer(); // Three.js uses WebGl at the core, a renderer required to render scene
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // plain js to adjust the rendered model

// window.addEventListener('resize', function(){
    // var width = window.innerWidth;
    // var height = window.innerHeight;
    // renderer.setSize(width, height);
    // camera.aspect = width/height;
    // camera.updateProjectionMatrix();
// }) // generic event handler for resizing the content window

controls = new THREE.OrbitControls(camera, renderer.domElement); // orbit controls helps to move around the scene
// initial position of the camera (adjustable as preferred)
camera.position.x = 0; 
camera.position.y = 0;
camera.position.z = -200;
camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
// camera.position.z = 4;
// const objs = [];
var loader = new THREE.ObjectLoader(); // crucial loader, loading the scene with ObjectLoader lib
var loaders = new THREE.OBJLoader(); 

// using the loader in a call back to load the model which is json here
loader.load('Object-Loader/models/demo123/earth-animation-webgl.json', function(object){
 
    scene.add(object);
},

(ev) => {
    console.log(ev);
}, (e) => {
    console.log(e);
});

var mtlLoader = new THREE.MTLLoader(); // mtl loader
mtlLoader.setPath('models/Gargoyle_1_Obj/'); // path of the obj model
mtlLoader.load('Gargoyle_1.mtl', function (materials) {
 
    materials.preload(); // preloading the mtl first
 
    var objLoader = new THREE.OBJLoader(); // use the OBJLoader for .obj files
    objLoader.setMaterials(materials);
    objLoader.setPath('/models/Gargoyle_1_Obj/');
    objLoader.load('Gargoyle_1.obj', function (object) {
 
        scene.add(object);
        object.position.y -= 70; //positioning the model in the scene
        object.position.x += 10;
        object.translateZ(10);
    
        var light = new THREE.PointLight( 0xff0000, 1, 100 ); // light type
        light.position.set( 50, 50, 50 ); // light position
        scene.add( light ); //adding light to scene
 
    });
 
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
