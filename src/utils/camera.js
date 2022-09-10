import { PerspectiveCamera } from 'three';

const camera = new PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  20000
);

export default camera;
