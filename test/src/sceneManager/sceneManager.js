import ava from 'ava';
import * as PIXI from 'pixi.js';
import SceneManager from '../../../src/sceneManager/sceneManager';
import Button from '../../../src/components/button';
import Sprite from '../../../src/components/sprite';
import Bar from '../../../src/components/bar';

global.sceneManager = null;
let components = null;

ava.before(() => {
  PIXI.utils.TextureCache = {
    spinButton: PIXI.Texture.EMPTY,
    '2xBAR':PIXI.Texture.EMPTY,
    '3xBAR':PIXI.Texture.EMPTY,
    '7': PIXI.Texture.EMPTY,
    'BAR': PIXI.Texture.EMPTY,
    'CHERRY': PIXI.Texture.EMPTY,
    reelBackground: PIXI.Texture.EMPTY,
    balanceBackground:PIXI.Texture.EMPTY,
    paytableBackground: PIXI.Texture.EMPTY,
    background: PIXI.Texture.EMPTY
  };

  components = {
    Button,
    Sprite,
    Text,
    Bar,
  };
  sceneManager = new SceneManager();
});

ava('should create a new sceneManager', (t) => {
  sceneManager.init(new PIXI.Application(), components);
  t.true(sceneManager.pixiApp instanceof PIXI.Application);
});
