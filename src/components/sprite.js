import * as PIXI from 'pixi.js';
import Component from '../sceneManager/component';

/**
 * Very simple sprite component.
 * @module Sprite
 * @extends Component
 */
export default class Sprite extends Component {
  /**
   * Starts the entity which adds a sprite. Very basic for now.
   */
  start(entity) {
    this.entity = entity;
    this.container = PIXI.Sprite.fromFrame(entity.attributes.textureId);
    entity.container.addChild(this.container);
  }
}