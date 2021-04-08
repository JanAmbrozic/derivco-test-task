import * as PIXI from 'pixi.js';
import Component from '../sceneManager/component';

/**
 * Simple button component. Takes in a texturePath from the scene which
 * uses for it's sprite background.
 * @module Button
 * @extends Component
 */
export default class Button extends Component {
  /**
   * Starts the entity which creates the sprite with textureId data, binds
   * button events and sets defaults that are needed for the button to behave properly.
   */
  start(entity) {
    this.entity = entity;
    this.container = PIXI.Sprite.fromFrame(this.entity.attributes.textureId || PIXI.Texture.EMPTY);
    this.entity.container.addChild(this.container);
    this.bindEvents();
    this.setDefaults();
  }

  /**
   * Binds to pointer events that are needed for the button component to function.
   */
  bindEvents() {
    this.container.on('pointertap', this.onPointerTap, this);
    this.container.on('pointerover', this.onPointerOver, this);
    this.container.on('pointerout', this.onPointerOut, this);
  }

  /**
   * Sets the default properties that are needed for the button to work.
   */
  setDefaults() {
    this.container.interactive = true;
    this.container.buttonMode = true;
    this.container.anchor.x = 0.5;
    this.container.anchor.y = 0.5;
  }

  /**
   * Executed on pointer/mouse tap and fires 'touchEvent' on the event
   * emmiter which is defined in the scene.
   */
  onPointerTap() {
    this.entity.eventEmitter.emit(this.entity.attributes.touchEvent);
  }

  /**
   * Scales up a bit for very simple hover 'zoom in' effect.
   */
  onPointerOver() {
    this.container.scale.x = this.container.scale.x * 1.1;
    this.container.scale.y = this.container.scale.y * 1.1;
  }

  /**
   * Reverses the scale of {@link onPointerOver}.
   */
  onPointerOut() {
    this.container.scale.x = this.container.scale.x / 1.1;
    this.container.scale.y = this.container.scale.y / 1.1;
  }
}