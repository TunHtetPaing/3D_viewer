import {
  ambientLight,
  directionalLight,
  floor,
  updateFloorGeometry,
  controls,
  camera,
} from "./scene.js";
import { loadGLB, mixer } from "./model.js";
import { loadHDRI, setHDRIEnabled, setBackgroundMode } from "./hdr.js";

export function setupUI() {
  // Floor Y
  const floorYSlider = document.getElementById("floorY");
  const floorYValue = document.getElementById("floorYValue");
  floorYSlider.addEventListener("input", (e) => {
    const y = parseFloat(e.target.value);
    floor.position.y = y;
    floorYValue.textContent = y;
  });

  // Floor Width
  const floorRadiusSlider = document.getElementById("floorRadius");
  const floorRadiusValue = document.getElementById("floorRadiusValue");
  floorRadiusSlider.addEventListener("input", (e) => {
    const radius = parseInt(e.target.value, 10);
    floorRadiusValue.textContent = radius;
    updateFloorGeometry(radius);
  });

  // Floor Toggle
  const floorToggle = document.getElementById("floorToggle");
  floorToggle.addEventListener("change", (e) => {
    floor.visible = e.target.checked;
  });

  // Light Toggle
  const lightToggle = document.getElementById("lightToggle");
  lightToggle.addEventListener("change", (e) => {
    ambientLight.visible = e.target.checked;
    directionalLight.visible = e.target.checked;
  });

  // HDRI Toggle
  const hdriToggle = document.getElementById("hdriToggle");
  const bgModeToggle = document.getElementById("bgModeToggle");
  hdriToggle.addEventListener("change", (e) => {
    setHDRIEnabled(e.target.checked, bgModeToggle.checked);
  });

  // Background Mode Switch
  bgModeToggle.addEventListener("change", (e) => {
    setBackgroundMode(e.target.checked);
  });

  // GLB Upload
  const glbUpload = document.getElementById("glbUpload");
  glbUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    loadGLB(url);
  });

  // Focus origin on "F"
  window.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "f") {
      controls.target.set(0, 0, 0);
      camera.position.set(0, 2, 5);
      controls.update();
    }
  });
}
