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

  /**
   * Sets new texture for a sprite. 
   * If texture is not found it defaults to Pixi's EMPTY texture.
   * @param {string} textureId - Texture id
   */
  setTexture(textureId) {
    if(!PIXI.utils.TextureCache[textureId]) {
      textureId = PIXI.Texture.EMPTY;
    }
    this.container.texture = PIXI.Sprite.fromFrame(textureId);
  }
}