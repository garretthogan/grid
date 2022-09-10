import { DirectionalLight } from 'three';

const directionalLight = new DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 0.5).normalize();

export default directionalLight;
