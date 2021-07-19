import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// complementary functions
const getAspect = () => window.innerWidth / window.innerHeight;

const loader = new THREE.TextureLoader();
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  getAspect(),
);

// prepare the scene
camera.position.setY(10);

const grid = new THREE.GridHelper(200, 50);
const mesh = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true
});

const light = new THREE.PointLight(0xffffff);
const point = new THREE.PointLightHelper(light);

const patz = new THREE.MeshBasicMaterial({
  map: loader.load('https://avatars.githubusercontent.com/u/62576875?s=400&v=4')
});

const t     = new THREE.TorusGeometry(10, 3, 16, 100)
const c     = new THREE.BoxGeometry(4, 4, 4);

const torus = new THREE.Mesh(t, mesh);
const cube  = new THREE.Mesh(c, patz)


light.position.set(0, 5, 10);
cube.position.set(0, 4, 0);
torus.position.z = -20;

scene.add(point);
scene.add(light);
scene.add(grid);
scene.add(torus);
scene.add(cube);

// update the scene
const tick = () => {
  // camera.position.x += .1;
  torus.rotation.x += .02;
  torus.rotation.y += .03;
  cube.rotation.y += .02;
}

// prepare the renderer
const init = () => {
  const render = new THREE.WebGLRenderer({
    canvas: document.querySelector("#thre")
  });

  render.setPixelRatio(window.devicePixelRatio);
  render.setSize(window.innerWidth, window.innerHeight);

  // animate
  const animate = () => {
    tick();
    requestAnimationFrame(animate);
    render.render(scene, camera);
  }
  
  const controls = new OrbitControls(
    camera,
    render.domElement
  );

  animate();
}

document.addEventListener('DOMContentLoaded', init);
