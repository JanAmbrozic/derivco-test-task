import * as PIXI from 'pixi.js';
import scene from '../data/scene';
import Entity from './entity';

/**
 * @module SceneManager
 */
export default class SceneManager {
  /**
   * Inits the sceneManager and attaches the root container to the pixi stage.
   * @param {PIXI.Application} pixiApp - The main PIXI app.
   * @param {component[]} components - Array of components which are initialised based on the scene definition.
   */
  init(pixiApp, components) {
    this.pixiApp = pixiApp;
    this.root = new PIXI.Container();
    this.pixiApp.stage.addChild(this.root);
    this.components = components;
    this.eventEmitter = new PIXI.utils.EventEmitter();
    window.addEventListener('resize', () => {
      this.resizeViewport(window.innerWidth, window.innerHeight);
    });
    // initial resize
    this.resizeViewport(window.innerWidth, window.innerHeight);
    this.startedComponents = [];
  }

  /**
   * Starts the scene manager which means that all the entities from the scene definition
   * will be attached to the scene.
   */
  start() {
    this.startEntity(scene.entities, this.root);
    this.startedComponents.forEach((component) => {
      component.entitiesReady();
    });
  }

  /**
   * Starts individual entity and it is called recurively to go through the whole scene definition
   * regardless of the depth.
   * @param {entity[]} entities - Array of entitites at that specific depth.
   * @param {PIXI.Container} container - Entity container to which we attach the child entitites.
   */
  startEntity(entities, container) {
    entities.forEach((entityDefinition) => {
      // create an entity and pass the definition to it
      const entity = new Entity(entityDefinition);
      entity.eventEmitter = this.eventEmitter;
      entity.container.id = entityDefinition.id;
      // attach the eventbus
      container.addChild(entity.container);
      entityDefinition.components.forEach((componentType) => {
        const component = new this.components[componentType]();
        component.start(entity);
        this.startedComponents.push(component);
      });

      // recursivly loop all the entities and it's children
      if (entityDefinition.entities && entityDefinition.entities.length > 0) {
        this.startEntity(entityDefinition.entities, entity.container);
      }
    });
  }

  /**
   * Takes care of basic scaling and resizing of the Pixi stage.
   * @param {number} width - Current width to which stage will resize to.
   * @param {number} height - Current height to which stage will resize to.
   */
  resizeViewport(width, height) {
    this.pixiApp.renderer.resize(width, height);
    const scale = Math.min(width / scene.attributes.maxWidth, height / scene.attributes.maxHeight);
    this.root.scale.x = scale;
    this.root.scale.y = scale;
    this.root.x = width / 2 - scene.attributes.maxWidth / 2 * scale;
    this.root.y = height / 2 - scene.attributes.maxHeight / 2 * scale;
  }

  /**
   * Finds and entity with a specific id in the scene graph.
   * @param {string} entityId - Entity id which is used to find the entity.
   */
  find(entityId) {
    return this.findRecursively(this.root, entityId);
  }

  /**
   * Game loop which calls update function on every started component
   */
  update() {
    this.startedComponents.forEach((component) => {
      component.update();
    });
  }


  /**
   * Called by {@link find} method. Ideally this would be a private method.
   * @param {PIXI.Container} container - Entity container twhich is used to recursively loop on and find the entity.
   * @param {string} id - Entity id which is used to find the entity.
   */
  findRecursively(container, id) {
    let returnObject = null;
    for (const entity of container.children) {
      if (entity.id === id) {
        return entity;
      }
      returnObject = this.findRecursively(entity, id);
      if (returnObject !== null) {
        return returnObject;
      }
    }
    return returnObject;
  }

  /**
   * Exposing event emitter for easier debugging purposes. With event emitter we can communicate with 
   * components whilst still keeping them isolated.
   * @returns {object} eventEmitter
   */
  getEventEmitter() {
    return this.eventEmitter;
  }
}