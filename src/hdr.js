import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/Addons.js";
import { scene } from "./scene.js";

export let hdriTextureRef = null;
export let hdriMeshRef = null;

export function loadHDRI(path, onLoad) {
  const rgbeLoader = new RGBELoader();
  rgbeLoader.load(path, (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    hdriTextureRef = texture;

    const bgGeo = new THREE.SphereGeometry(50, 60, 40);
    const bgMat = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
    });
    hdriMeshRef = new THREE.Mesh(bgGeo, bgMat);
    scene.add(hdriMeshRef);
    scene.background = texture;
    if (onLoad) onLoad(texture);
  });
}

export function setHDRIEnabled(enabled, useHDRIBackground) {
  if (enabled) {
    scene.environment = hdriTextureRef || null;
    if (useHDRIBackground) {
      scene.background = hdriTextureRef || null;
    }
    if (hdriMeshRef) hdriMeshRef.visible = true;
  } else {
    scene.environment = null;
    scene.background = new THREE.Color(0x808080);
    if (hdriMeshRef) hdriMeshRef.visible = false;
  }
}

export function setBackgroundMode(useHDRI) {
  if (useHDRI) {
    scene.background = hdriTextureRef || null;
    if (hdriMeshRef) hdriMeshRef.visible = true;
  } else {
    scene.background = new THREE.Color(0x808080);
    if (hdriMeshRef) hdriMeshRef.visible = false;
  }
}
