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
import Paytable from './components/paytable';
import Debug from './debug';

export default class Game {
  constructor() {
    // eslint-disable-next-line no-console
    console.log('Hello Derivco!');

    this.app = new PIXI.Application({ width: 1280, height: 720, backgroundColor: 0x000 });

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
      Reel,
      Paytable
    };
    // start the scene manager and register the ticker
    this.sceneManager.init(this.app, components);
    this.sceneManager.start();
    this.app.ticker.add(() => this.sceneManager.update());

    // play ambient sounds
    const soundId = AssetLoader.sounds[AssetLoader.audioAssets.background].play();
    AssetLoader.sounds[AssetLoader.audioAssets.background].volume(0.7, soundId);
    AssetLoader.sounds[AssetLoader.audioAssets.background].loop(soundId);

    this.checkForDebug(this.sceneManager);
  }

  checkForDebug(sceneManager) {
    const urlParams = new URLSearchParams(window.location.search);
    const debug = urlParams.get('debug');

    if(debug === "true") {
      this.debug = new Debug(sceneManager.getEventEmitter());
    }
  }
}

window.addEventListener('load', () => {
  new Game();
});
