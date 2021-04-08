import * as PIXI from 'pixi.js';

/**
 * Base component class which other components extend. For now it has some stub methods
 * but in the future it would hold functionality that is shared between components.
 * @module Component
 */
export default class Component {
  constructor() {
    this.container = new PIXI.Container();
  }

  /**
   * Starts the entity which just adds an empty PIXI container to the scene.
   */
  start(entity) {
    entity.container.addChild(this.container);
  }

  /**
   * A stub method which specific components then override.
   */
  // eslint-disable-next-line class-methods-use-this
  entitiesReady() {
    // will be implemented in invdividual components
  }
}