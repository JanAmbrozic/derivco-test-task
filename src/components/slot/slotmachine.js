import TWEEN from '@tweenjs/tween.js';
import { MotionBlurFilter } from '@pixi/filter-motion-blur';
import Component from '../../sceneManager/component';
import Reel from './reel';
import ResultsEval from './resultsEval';
import RNG from '../mockServer/rng';
import AssetLoader from '../../assetLoader';

/**
 * Slotmachine component. It handles everything from reel creation to spinning and stopping.
 * @module Slotmachine
 */
export default class Slotmachine extends Component {
  /**
   * Starts the components, binds events and creates the reels.
   */
  start(entity) {
    this.entity = entity;
    this.reels = [];
    this.createReels();
    entity.eventEmitter.on('spinAllowed', () => { this.startSpin(); });
    entity.container.addChild(this.container);
    this.state = 'idle';
    this.winninLineTweens = new TWEEN.Tween();
    this.resultsEval = new ResultsEval();
    this.rng = new RNG(this.entity);
  }

  /**
   * Creates reels which are limited by the parameter numberOfReels. It also init each reel properly
   * with needed parameters.
   */
  createReels() {
    for (let index = 0; index < this.entity.attributes.numberOfReels; index++) {
      const reelParams = { x: 180 * index, spin: this.entity.attributes.spin, reelSet: this.entity.attributes.reelSet[index] };
      const reel = new Reel(index, this.entity.attributes.numberOfSymbolsPerReel[index], reelParams);
      reel.start();
      this.reels.push(reel);
      this.container.addChild(reel.container);
    }
  }

  /**
   * Starts the spin meaning it calls the spin method on individual reels. 
   * It also can add the motion blur filter which gives the illusion of the reel moving much faster. Disabled for now
   */
  async startSpin() {
    const spinSound = AssetLoader.sounds[AssetLoader.audioAssets.spinning].play();
    AssetLoader.sounds[AssetLoader.audioAssets.spinning].loop(spinSound, spinSound);
    this.enableSpinButton(false);

    this.state = 'spinning';
    // reset the total win
    this.entity.eventEmitter.emit('spinStarted');

    // velocity used for filter calculation
    const velocity = { x: 0, y: 0 };
    const filter = new MotionBlurFilter([0, 0], 9);

    //this.container.filters = [filter];

    new TWEEN.Tween(velocity)
      .to({ x: 1, y: 50 }, 1500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate((o) => {
        filter.velocity = [o.x, o.y];
      })
      .repeat(1)
      .yoyo(true)
      .start();

    // lets stop the reels after 1.5sec which gives us roughly 2 second spin
    new TWEEN.Tween(this.container)
      .delay(1500)
      .onComplete(() => {
        this.stop();
        AssetLoader.sounds[AssetLoader.audioAssets.spinning].stop(spinSound);
      })
      .start();

    for (let i = 0; i < this.reels.length - 1; i++) {
      this.reels[i].spin(Math.round(Math.random() * 20));
    }
    // we can wait for the last reel to start spinning and we can execute more actions after
    await this.reels[this.reels.length - 1].spin(Math.round(Math.random() * 20));

    this.container.filters = [];
  }

  /**
   * Stops the spin and sets winning position 
   */
  async stop() {
    let promises = [];

    for (let i = 0; i < this.reels.length; i++) {
      // pass in reelSet stop position
      let results = this.rng.getResults(i);

      promises.push(new Promise((resolve) => {
        new TWEEN.Tween({})
          .to({}, 0)
          .delay(500 * i)
          .easing(TWEEN.Easing.Linear.None)
          .onComplete(async () => {
            await this.reels[i].stop(0, results.winlineType, results.symbols);
            AssetLoader.sounds[AssetLoader.audioAssets.reelStop].play();
            resolve();
          })
          .start();
      }));

    }
    this.state = 'idle';

    Promise.all(promises).then(() => {
      this.checkForWinningLines(this.reels, this.entity.attributes.winlines);
      this.enableSpinButton(true);
    });

  }

  /**
   * This is purely for demonstration purposes and it is just to show some winning lines.
   * Of course in a reel game this would come from the backend and it would have more data.
   */
  checkForWinningLines(reels, winlineData) {
    let winlines = this.resultsEval.checkWinningLines(reels, winlineData);
    this.entity.eventEmitter.emit('win', winlines);
    this.animateWinlines(winlines);
  }

  /**
   * Very basic winline animation which just draws a line over the winning symbols.
   * TODO: move it to a separate winline component.
   */
  animateWinlines(winlinesData) {

    for (const winline of winlinesData.winlines) {
      const winLineGraphic = new PIXI.Graphics();
      winLineGraphic.beginFill(0xDC143C);
      winLineGraphic.drawRect(0, 0, 500, 7);
      winLineGraphic.endFill();
      winLineGraphic.scale.y = 1;
      winLineGraphic.y = this.entity.attributes.winPosition[winline.type];
      winLineGraphic.alpha = 0;

      this.container.addChild(winLineGraphic);

      const opacity = { o: 1 };
      new TWEEN.Tween(opacity)
        .to({ o: 0.1 }, 500)
        .easing(TWEEN.Easing.Linear.None)
        .repeat(3)
        .onStart(() => {
          // we can play a winline sound here
          //AssetLoader.sounds[AssetLoader.audioAssets.creek].play();
        })
        .onUpdate((opacity) => {
          winLineGraphic.alpha = opacity.o;
        })
        .onComplete(() => {
          this.container.removeChild(winLineGraphic);
        })
        .yoyo(true)
        .start();
    }
  }

  /**
   * Gets called by the framework and executes update on every reel.
   */
  update() {
    for (let i = 0; i < this.reels.length; i++) {
      this.reels[i].update();
    }
  }

  /**
   * Enables/disables the button.
   * @param {boolean} enabled
   */
  enableSpinButton(enable) {
    let spinButton = sceneManager.find('spin-button').children[0];
    if (enable) {
      spinButton.interactive = true;
      spinButton.buttonMode = true;
      spinButton.alpha = 1;
    } else {
      spinButton.interactive = false;
      spinButton.buttonMode = false;
      spinButton.alpha = 0.7;
    }
  }

}
