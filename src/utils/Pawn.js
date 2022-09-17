import { Object3D } from 'three';
import camera from './camera';
import Controller from './Controller';

export class RemotePawn extends Object3D {
  constructor() {
    super();
  }
}

export default class Pawn extends Object3D {
  constructor() {
    super();

    this.clientId = null;

    this.controller = new Controller();
    this.camera = camera.clone(true);

    window.addEventListener('resize', this.handleResize.bind(this));
  }

  register(renderer) {
    this.controller.setupControls(this.camera, renderer.domElement);
  }

  update(deltaTime) {
    this.controller.update(deltaTime);
  }

  handleResize() {
    this.controller.handleResize();

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}
