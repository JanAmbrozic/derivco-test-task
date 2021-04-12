import ava from 'ava';
import * as PIXI from 'pixi.js';
import Sprite from '../../../src/components/sprite';
import Entity from '../../../src/sceneManager/entity';

let entity = null;

ava.before(() => {
  PIXI.utils.TextureCache = { reelBackground: PIXI.Texture.EMPTY };
  const entityDefinition = {
    id: 'reel-background',
    display: {
      position: {
        x: 260,
        y: 20,
      },
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

ava('should create a new sprite', (t) => {
  const sprite = new Sprite();
  sprite.start(entity);
  t.true(sprite.container instanceof PIXI.Sprite);
});
