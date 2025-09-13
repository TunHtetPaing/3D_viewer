import "./style.css";
import * as THREE from "three";
// ...existing imports...
import { scene, camera, renderer, controls } from "./scene.js";
import { loadGLB, mixer } from "./model.js";
import { loadHDRI } from "./hdr.js";
import { setupUI } from "./ui.js";

setupUI();
loadHDRI("./HDRI.hdr");
loadGLB("./pressure_cooker (1).glb");

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  if (mixer) mixer.update(clock.getDelta());
  renderer.render(scene, camera);
}
animate();
