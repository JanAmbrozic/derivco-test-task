import * as PIXI from 'pixi.js';
import TWEEN from '@tweenjs/tween.js';
import AssetLoader from './assetLoader';
import SceneManager from './sceneManager/sceneManager';
import Button from './components/button';
import Sprite from './components/sprite';
import Text from './components/text';
import Bar from './components/bar';
import Slotmachine from './components/slot/slotmachine';
import Reel from './components/slot/reel';

export default class Game {
  constructor() {
    console.log('Hello Derivco!');
    this.app = new PIXI.Application({ width: 1280, height: 720, backgroundColor: 0x3399da });

    this.app.ticker.add(() => {
      TWEEN.update();
    });
    this.app.start();

    document.body.appendChild(this.app.view);
    this.sceneManager = new SceneManager();
    window.sceneManager = this.sceneManager;
    this.init();
  }

  async init() {
    const assetLoader = new AssetLoader();
    await assetLoader.init();
    const components = {
      Button,
      Sprite,
      Text,
      Bar,
      Slotmachine,
      Reel
    };
    this.sceneManager.init(this.app, components);
    this.sceneManager.start();
    //const soundId = AssetLoader.sounds[AssetLoader.audioAssets.battleThemeA].play();
    //AssetLoader.sounds[AssetLoader.audioAssets.battleThemeA].volume(0.7, soundId);
  }
}

window.addEventListener('load', () => {
  new Game();
});
