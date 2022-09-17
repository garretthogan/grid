import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

export default class Controller {
  constructor() {
    this.fpsControls = null;
  }

  update(deltaTime) {
    this.fpsControls.update(deltaTime);
  }

  setupControls(camera, domElement) {
    const controls = new FirstPersonControls(camera, domElement);

    controls.movementSpeed = 1000;
    controls.lookSpeed = 0.125;
    controls.lookVertical = true;
    controls.activeLook = false;
    this.fpsControls = controls;
  }

  handleResize() {
    this.fpsControls.handleResize();
  }
}
