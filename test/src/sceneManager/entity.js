import ava from 'ava';
import * as PIXI from 'pixi.js';
import Entity from '../../../src/sceneManager/entity';

let entity = null;

ava.before(() => {
  const entityDefinition = {
    id: 'reel-background',
    display: {
      position: {
        x: 260,
        y: 20,
      },
      alpha: 0.5,
    },
    attributes: {
      textureId: 'reelBackground',
    },
    components: [
      'Sprite',
    ],
  };
  entity = new Entity(entityDefinition);
});

ava('should create a new entity', (t) => {
  const newEntity = new Entity({});
  t.true(newEntity.container instanceof PIXI.Container);
});

ava('should update display properties', (t) => {
  entity.updateDisplay();
  t.true(entity.container.x === 260);
  t.true(entity.container.alpha === 0.5);
});
