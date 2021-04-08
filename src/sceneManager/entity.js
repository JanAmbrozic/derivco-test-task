import * as PIXI from 'pixi.js';

/**
 * Basic entity which is the visual part in the component-entity systems.
 * TODO: add functionality for specific scaling, anchoring, updating, context, etc...
 * @module Entity
 */
export default class Entity {
  constructor(entityDefinition) {
    this.container = new PIXI.Container();
    this.updateDisplay(entityDefinition.display);
    this.attributes = entityDefinition.attributes;
    this.display = entityDefinition.display;
  }

  /**
   * Updates the PIXI container with display properties from the scene definition.
   * @param {object} display - JSON object which holds the container display data.
   * TODO: merge defaults in a nicer way and have a definition for them as well.
   */
  updateDisplay(display) {
    if (display) {
      this.container.position.x = display.position.x;
      this.container.position.y = display.position.y;
      this.container.scale.x = (display.scale && display.scale.x !== undefined) ? display.scale.x : 1;
      this.container.scale.y = (display.scale && display.scale.y !== undefined) ? display.scale.y : 1;
      this.container.alpha = (display.alpha !== undefined) ? display.alpha : 1;
    }
  }
}