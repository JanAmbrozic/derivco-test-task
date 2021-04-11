import TWEEN from '@tweenjs/tween.js';
import { MotionBlurFilter } from '@pixi/filter-motion-blur';
import Component from '../../sceneManager/component';
import Reel from './reel';
import ResultsEval from './resultsEval';
import RNG from '../mockServer/rng';


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
    entity.eventEmitter.on('spinAllowed', () => { this.rotate(); });
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
      const reelParams = { x:  180 * index, spin: this.entity.attributes.spin, reelSet: this.entity.attributes.reelSet[index] };
      const reel = new Reel(index, this.entity.attributes.numberOfSymbolsPerReel[index], reelParams);
      reel.start();
      this.reels.push(reel);
      this.container.addChild(reel.container);
    }
  }

  /**
   * We only want to react on spin button click when we slot is in a state that can react to it.
   * If we are in zoomedIn state the {@link reset} is executed which also calls {@link startSpin}
   * when it's done.
   */
  rotate() {
    if (this.state === 'idle') {
      this.startSpin();
    } else if (this.state === 'zoomedIn') {
      this.reset();
    }
  }

  /**
   * Starts the spin meaning it calls the spin method on individual reels. It also adds the motion blur filter
   * which gives the illusion of the reel moving much faster.
   */
  async startSpin() {
    //const spinSound = AssetLoader.sounds[AssetLoader.audioAssets.swoosh].play();
    //AssetLoader.sounds[AssetLoader.audioAssets.swoosh].loop(spinSound, spinSound);



    this.state = 'spinning';
    // reset the total win
    this.entity.eventEmitter.emit('spinStarted');

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

    new TWEEN.Tween(this.container)
    .delay(2000)
    .onComplete(() => {
      this.stop();
    })
    .start();

    for (let i = 0; i < this.reels.length - 1; i++) {

      this.reels[i].spin(Math.round(Math.random() * 20));
    }
    await this.reels[this.reels.length - 1].spin(Math.round(Math.random() * 20));

    this.container.filters = [];
    //AssetLoader.sounds[AssetLoader.audioAssets.swoosh].stop(spinSound);
    //await this.zoomIn();
    //AssetLoader.sounds[AssetLoader.audioAssets.creek].play();
    //this.state = 'zoomedIn';
  }

  async stop() {

    let winningPositions = {
    
    };

    let promises = [];


    for (let i = 0; i < this.reels.length ; i++) {
      // pass in reelSet stop position
      let results = this.rng.getResults(i);

      promises.push(new Promise((resolve) => {
        new TWEEN.Tween({})
        .to({}, 0)
        .delay(500 * i)
        .easing(TWEEN.Easing.Linear.None)
        .onComplete(async () => {
          await this.reels[i].stop(0, results.winlineType, results.symbols);
          winningPositions[i] = {
            winningLine: results.winlineType,
            symbol: results[1]
          };
          resolve();
        })
        .start();
      }));

    }
    this.state = 'idle';

    Promise.all(promises).then(() => {
      this.checkForWinningLines(this.reels, this.entity.attributes.winlines);
    });
  
  }

  /**
   * This is purely for demonstration purposes and it is just to show some winning lines.
   * Of course in a reel game this would come from the backend and it would have more data.
   * TODO: move it to a separate winline component.
   */
  checkForWinningLines(reels, winlineData) {
    let winlines = this.resultsEval.checkWinningLines(reels, winlineData)
    this.entity.eventEmitter.emit('win', winlines);
    this.animateWinlines(winlines);
  }

  /**
   * Very basic winline animation which just scales up and down the winning symbols.
   * TODO: move it to a separate winline component.
   */
  animateWinlines(winlinesData) {

    for (const winline of winlinesData.winlines) {
      const graphics1 = new PIXI.Graphics();
      graphics1.beginFill(0xDC143C);
      graphics1.drawRect(0, 0, 500, 7);
      graphics1.endFill();
      graphics1.scale.y = 1;
      graphics1.y = this.entity.attributes.winPosition[winline.type];
      graphics1.alpha = 0;

      this.container.addChild(graphics1);

      const opacity = { o: 1};
      new TWEEN.Tween(opacity)
        .to({ o: 0.1 }, 500)
        .easing(TWEEN.Easing.Linear.None)
        .repeat(3)
        .onStart(() => {
          //AssetLoader.sounds[AssetLoader.audioAssets.creek].play();
        })
        .onUpdate((opacity) => {
            graphics1.alpha = opacity.o;
        })
        .onComplete(() => {
          this.container.removeChild(graphics1);
        })
        .yoyo(true)
        .start();
    }
  }

  /**
   * Zooms in the slot and other entities to create a more realistic zoom in effect.
   */
  zoomIn() {
    return new Promise((resolve) => {
      const e = this.entity;
      new TWEEN.Tween(e.container.scale)
        .to({ x: e.container.scale.x * 3, y: e.container.scale.y * 3 }, e.attributes.zoomIn.duration)
        .easing(e.attributes.zoomIn.easing)
        .onComplete(resolve)
        .start();

      new TWEEN.Tween(e.container)
        .to({ x: 1400 }, e.attributes.zoomIn.duration)
        .easing(e.attributes.zoomIn.easing)
        .start();

      const reelBackgroundContainer = sceneManager.find('reel-background');
      new TWEEN.Tween(reelBackgroundContainer)
        .delay(e.attributes.zoomIn.duration / 1.5)
        .to({ alpha: 1 }, e.attributes.zoomIn.duration / 3)
        .easing(e.attributes.zoomIn.easing)
        .start();
    });
  }

  /**
   * Resets the winline tweens and zooms out the slot and other entities. Also sets the
   * state to idle when it's finished.
   */
  reset() {
    this.state = 'reseting';
    this.winninLineTweens.stop();
    this.winninLineTweens.stopChainedTweens();
    new TWEEN.Tween(this.entity.container)
      .to({ x: this.entity.display.position.x }, 500)
      .start();

    new TWEEN.Tween(this.entity.container.scale)
      .to({ x: this.entity.display.scale.x, y: this.entity.display.scale.y }, 500)
      .onComplete(() => {
        this.state = 'idle';
        this.startSpin();
      })
      .start();

    const reelBackgroundContainer = sceneManager.find('reel-background');
    new TWEEN.Tween(reelBackgroundContainer)
      .to({ alpha: 0 }, 250)
      .easing(TWEEN.Easing.Quadratic.In)
      .start();
  }

  update() {
    for (let i = 0; i < this.reels.length; i++) {
      this.reels[i].update();
    }
  }
}
