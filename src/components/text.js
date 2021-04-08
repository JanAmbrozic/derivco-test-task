import * as PIXI from 'pixi.js';
import Component from '../sceneManager/component';

/**
 * Very simple text component.
 * @module Text
 * @extends Component
 */
export default class Text extends Component {
  /**
   * Starts the entity which adds a text to it. Very basic for now.
   */
  start(entity) {
    this.entity = entity;
    this.container = new PIXI.Text(this.entity.attributes.text, this.entity.attributes.style);
    entity.container.addChild(this.container);
  }
}