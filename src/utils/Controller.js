import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

export default class Controller {
  constructor() {
    this.fpcControls = null;

    // window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  update(deltaTime) {
    this.fpcControls.update(deltaTime);
  }

  setupControls(camera, domElement) {
    const controls = new FirstPersonControls(camera, domElement);

    controls.movementSpeed = 1000;
    controls.lookSpeed = 0.125;
    controls.lookVertical = true;
    this.fpcControls = controls;
  }

  handleResize() {
    this.fpcControls.handleResize();
  }
}
