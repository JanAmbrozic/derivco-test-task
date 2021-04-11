import * as PIXI from 'pixi.js';
import { Howl } from 'howler';

export default class AssetLoader {
  init() {
    this.loader = PIXI.loader;

    const assets = {
      spinButton: 'assets/Reel/2xBAR.png',
      '2xBAR': 'assets/Reel/2xBAR.png',
      '3xBAR': 'assets/Reel/3xBAR.png',
      '7': 'assets/Reel/7.png',
      'BAR': 'assets/Reel/BAR.png',
      'CHERRY': 'assets/Reel/Cherry.png',
      'BLANK': 'assets/Reel/BLANK.png',
      reelBackground: 'assets/Reel/reelBackground.png'
    };

    // add all assets
    Object.keys(assets).forEach((key) => {
      this.loader.add(key, assets[key]);
    });

    this.loader.load();
    this.loader.onProgress.add(() => {
      // do progress bar here
    });
    this.loader.onError.add(() => {
      throw new Error('Something went wrong whilst loading resources :( ');
    });

    // resolve a promise so we can use this as async function
    return new Promise((resolve) => {
      this.loader.onComplete.add(resolve);
      AssetLoader.loadAudio();
    });
  }

  static loadAudio() {
    for (const key in AssetLoader.audioAssets) {
      if (Object.prototype.hasOwnProperty.call(AssetLoader.audioAssets, key)) {
        const sound = new Howl({
          src: [AssetLoader.audioAssets[key]],
        });
        AssetLoader.sounds[AssetLoader.audioAssets[key]] = sound;
      }
    }
  }
}

AssetLoader.audioAssets = {

};
AssetLoader.sounds = {};