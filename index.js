import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js'
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//camera controls
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true; 
controls.dampingFactor = 0.05; 
controls.screenSpacePanning = false;
controls.minDistance = 1; 
controls.maxDistance = 500; 
controls.maxPolarAngle = Math.PI / 2; 

// skybox 
const loader = new THREE.CubeTextureLoader();
  const texture = loader.load([
    'pos-x.jpg',
    'neg-x.jpg',
    'pos-y.jpg',
    'neg-y.jpg',
    'pos-z.jpg',
    'neg-z.jpg',
  ]);
  scene.background = texture;


    // Create a cube
    const texLoader = new THREE.TextureLoader();
    const cubeTexture = texLoader.load( 'crate.png' );
    

    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ map: cubeTexture });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -2;
    scene.add(cube);

    // Create a sphere
    const sphereGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.y = 5
    sphere.position.z = -10
    scene.add(sphere);

    // Create a cylinder
    const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
    const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.x = 2;
    scene.add(cylinder);


    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();


    mtlLoader.load('Car.mtl', (mtl) => {
        mtl.preload();
        
        objLoader.setMaterials(mtl);
        objLoader.load('Car.obj', (root) => {
            root.scale.set(0.05, 0.05, 0.05);
            root.position.z = -2
            scene.add(root);
          });
      });

    
function animate() {
    requestAnimationFrame(animate);
    controls.update()
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
