import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; 

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.TorusGeometry( 5, 3, 30, 75 );
const material = new THREE.MeshStandardMaterial( { color: 0x424242, metalness:0, roughness:0 } );
const shape = new THREE.Mesh( geometry, material ); 

scene.add( shape );

// Dimensions
const box = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Light
const light = new THREE.DirectionalLight( 0xffffff, 0.5 );
light.position.set( 0, 10, 10 );
light.intensity = 3;
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera( 100, box.width / box.height, 1, 100); // Field of view, aspect ratio, near, far
camera.position.z = 20;
scene.add(camera);

// Rederer
const canvas = document.querySelector( '.web' );
const renderer = new THREE.WebGLRenderer( { canvas } );
renderer.setPixelRatio( window.devicePixelRatio );

// Controls
const controls = new OrbitControls( camera, canvas );
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;

// Resize
window.addEventListener( 'resize', () => {
  box.width = window.innerWidth;
  box.height = window.innerHeight;

  camera.aspect = box.width / box.height;
  camera.updateProjectionMatrix();

  renderer.setSize( box.width, box.height);
  renderer.render( scene, camera );

});

// Shape Animation
function animate() {
  requestAnimationFrame( animate );

  shape.rotation.x += 0.01;
  shape.rotation.y += 0.01;

  renderer.render( scene, camera );
}

renderer.setSize( box.width, box.height);
renderer.render( scene, camera );
controls.update();
animate();

// Color Animation
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));
window.addEventListener("touchstart", () => (mouseDown = true));
window.addEventListener("touchend", () => (mouseDown = false));

window.addEventListener("mousemove", changeColor);
window.addEventListener("touchmove", changeColor);

function changeColor(e) {
  if (mouseDown) {
    let x = e.pageX || e.touches[0].pageX;
    let y = e.pageY || e.touches[0].pageY;
    rgb = [
      Math.round((x / box.width) * 255),
      Math.round((y / box.height) * 255),
      150,
    ]
    let color = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(shape.material.color, { r: color.r, g: color.g, b: color.b})
  }
}

// Mouse Animation
const t1 = gsap.timeline({ defaults: { duration: 1 } });
let scaleValue = box.width > 1100 ? 1.5 : 1;
t1.fromTo(shape.scale, { x: 0, y: 0, z: 0}, { x:scaleValue, y:scaleValue, z:scaleValue});
t1.fromTo("nav", { y: "-100%" }, { y: "0%" });
// t1.fromTo("nav", { opacity: 0 }, { opacity: 1 });