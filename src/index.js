import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "./styles.css"; // Import CSS in JS

let scene, camera, renderer, orionModel, light;
let clock = new THREE.Clock();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1, 5);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  light = new THREE.DirectionalLight(0x00bfff, 2);
  light.position.set(5, 5, 5);
  scene.add(light);

  let ambientLight = new THREE.AmbientLight(0x222222);
  scene.add(ambientLight);

  // Load 3D Orion Model
  const loader = new GLTFLoader();
  loader.load("/orion_model.glb", function (gltf) {
    // Ensure the file is in `public/`
    orionModel = gltf.scene;
    scene.add(orionModel);
    orionModel.scale.set(1.5, 1.5, 1.5);
    orionModel.position.set(0, -1, 0);
    animate();
  });

  // Handle Window Resize
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  // Mouse Move Interaction
  document.addEventListener("mousemove", (event) => {
    let x = (event.clientX / window.innerWidth - 0.5) * 2;
    let y = (event.clientY / window.innerHeight - 0.5) * 2;
    if (orionModel) {
      orionModel.rotation.y = x * 0.5;
      orionModel.rotation.x = y * 0.1;
    }
  });
}

function animate() {
  requestAnimationFrame(animate);
  let delta = clock.getDelta();

  // Make Eyes Glow
  if (orionModel) {
    let glowEffect = Math.sin(Date.now() * 0.005) * 0.3 + 0.7;
    light.intensity = glowEffect * 2;
  }

  renderer.render(scene, camera);
}

init();
