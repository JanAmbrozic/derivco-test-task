import ava from 'ava';
import * as PIXI from 'pixi.js';
import Text from '../../../src/components/text';
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
    },
    attributes: {
      text: 'test',
    },
    components: [
      'Text',
    ],
  };
  entity = new Entity(entityDefinition);
});

ava('should create a new text with a string from definition', (t) => {
  const text = new Text();
  text.start(entity);
  t.true(text.container instanceof PIXI.Text);
  t.true(text.container.text === 'test');
});
