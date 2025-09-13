import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { scene } from "./scene.js";

export let currentModel = null;
export let mixer = null;

export function loadGLB(url, onLoad) {
  const loader = new GLTFLoader();
  loader.load(
    url,
    (gltf) => {
      removeCurrentModel();
      currentModel = gltf.scene;
      currentModel.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      scene.add(currentModel);

      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(currentModel);
        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play();
        });
      }
      if (onLoad) onLoad(currentModel);
    },
    undefined,
    (error) => {
      console.error("Error loading GLB:", error);
    }
  );
}

export function removeCurrentModel() {
  if (currentModel) {
    scene.remove(currentModel);
    currentModel.traverse((child) => {
      if (child.isMesh) {
        child.geometry.dispose();
        if (child.material.map) child.material.map.dispose();
        child.material.dispose();
      }
    });
    currentModel = null;
    mixer = null;
  }
}
