import * as PIXI from 'pixi.js';
import TWEEN from '@tweenjs/tween.js';

const REEL_STATES = {
  SPINNING: "spinning",
  IDLE: "idle",
  STOPPING: "stopping",
};

/**
 * Class representing a single reel. A slotmachine would usually create 3 or more
 * instances of the reel with different parameters and configurations.
 * @module Reel
 */
export default class Reel {
  constructor(reelIndex, numOfSymbols, reelParams) {
    this.container = new PIXI.Container();
    this.symbols = [];
    this.numOfSymbols = numOfSymbols;
    this.reelParams = reelParams;
    this.reelHeight = 400;
    this.state = REEL_STATES.IDLE;
    this.originalReelSet = [...reelParams.reelSet];
    this.reelSet = reelParams.reelSet;
    this.reelIndex = reelIndex;
    this.topSymbol;
    this.reelSetPosition = Math.floor(Math.random() * this.reelSet.length - 1);
    this.incrementReelSetPos();

    this.resultsContainer = new PIXI.Container();

    this.container.x = this.reelParams.x;

    // TODO: move this to the scene definition
    this.stoppingPos = {
      top: -150,
      center: -75,
      bottom: 0
    };

    this.createMask();
  }

  /**
   * Creates number of symbols on the reel which is limited by the parameter {@link numOfSymbols}
   * and sets the current topSymbol (symbol that is on top and it is used for spinning animation).
   */
  start() {
    for (let index = 0; index < this.numOfSymbols; index++) {
      this.createSymbols({ x: 0, y: index * 155 }, index, this.numOfSymbols);
    }
    this.topSymbol = this.symbols[0];
  }

  /**
   * Creates number of symbols on the reel which is limited by the parameter {@link numOfSymbols}
   * @param {object} position - Position of the symbol.
   * @param {number} index - Index of in the loop so we can calculate the right angle.
   * @param {number} numOfElem - Number of total elements so we can calculate the right angle.
   */
  createSymbols(position, index) {
    let textureId = this.reelSet[this.reelSetPosition];
    const sym = new PIXI.Sprite(PIXI.utils.TextureCache[textureId]);
    sym.scale.x = 1;
    sym.scale.y = 1;
    sym.x = position.x;
    sym.y = position.y;
    sym.symbolId = index;
    this.container.addChild(sym);
    this.symbols.push(sym);
    this.incrementReelSetPos();
  }

  /**
   * Creates a reel mask.
   */
  createMask() {
    // use graphics for a mask. Alternatively it can also be used
    // for debugging purposes (to see the container borders)
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xFF3300);
    graphics.drawRect(0, 0, 150, this.reelHeight / 1.5);
    graphics.endFill();
    this.container.addChild(graphics);
    this.container.mask = graphics;
  }

  /**
   * Asynchronous spin function which spins the reel and keeps it moving until we call stop on it.
   * TODO: make more parameters configurable, calculate speed better, make it FPS independent, etc...
   * @returns {Promise} Promise object which resolves when reel spin has started. For now this is just as an example.
   */
  async spin() {
    this.winningSymbols = [];
    this.state = REEL_STATES.SPINNING;

    return new Promise((resolve) => {
      resolve();
    });
  }

  /**
   * Asynchronous stop function which stops the reel.
   * @param {number} reelSetStopIndex - reelSet index where reel should stop. Not used for now.
   * @param {string} stoppingPosition - where reel should stop. Options are: "top" | "center" | "bottom"
   * @param {object} results - result object which contains data needed for a stop
   * @returns {Promise} Promise object which resolves when reel has stopped.
   */
  stop(reelSetStopIndex, stoppingPosition, results) {
    this.setStopping(reelSetStopIndex, stoppingPosition, results);
    return new Promise((resolve) => {
      this.spinningTween = new TWEEN.Tween({})
        .to({}, 0)
        .delay(500)
        .onComplete(() => {
          resolve();
        })
        .start();
    });
  }

  /**
   * Sets winning symbols depending on where the reel stopped
   * @param {string} stoppingPosition - where reel should stop. Options are: "top" | "center" | "bottom"
   * @param {object} results - result object which contains data needed for a stop
   */
  setWinningSymbols(stoppingPosition, results) {
    switch (stoppingPosition) {
      // if symbols is in center we only have one visible symbol
      case "center":
        this.winningSymbols.push(results[1]);
        break;
      // if symbols is on top we have top and center visible
      case "top":
        this.winningSymbols.push(results[1], results[2]);
        break;
      // if symbols is on bottom we have center and bottom visible
      case "bottom":
        this.winningSymbols.push(results[0], results[1]);
        break;
    }
    //console.log("winning Symbols", this.winningSymbols);
  }

  /**
   * Adds a result container and top and tweens it into the view. Separate container is used
   * so we can assure we are always displaying correct results.
   * @param {number} pos - reelSet index where reel should stop. Not used for now.
   * @param {string} stoppingPosition - where reel should stop. Options are: "top" | "center" | "bottom"
   * @param {object} results - result object which contains data needed for a stop
   */
  setStopping(pos, stoppingPosition, results) {
    this.state = REEL_STATES.STOPPING;
    this.reset();

    this.stopOffset = this.stoppingPos[stoppingPosition];

    this.resultsContainer.y = this.topSymbol.y - this.reelHeight;
    this.container.addChild(this.resultsContainer);

    this.setWinningSymbols(stoppingPosition, results);

    for (let index = 0; index < results.length; index++) {
      const result = results[index];
      const sym = new PIXI.Sprite(PIXI.utils.TextureCache[result]);
      sym.y = index * 150;
      sym.symbolId = result;
      this.resultsContainer.addChild(sym);
    }

    //center -75, -150
    this.spinningTween = new TWEEN.Tween(this.resultsContainer)
      .to({ y: this.stopOffset }, 500)
      .easing(this.reelParams.spin.easing)
      .onComplete(() => {
        this.state = REEL_STATES.IDLE;
        this.topSymbol = this.resultsContainer;
      })
      .start();
  }

  /**
   * Resets reel on a stop. Not used for now.
   */
  finishStopping() {
    this.reset();
  }

  /**
   * Resets all the reel properties and returns it into the original state.
   */
  reset() {
    this.reelSet = [...this.originalReelSet];
    this.resultsContainer.removeChildren();
    this.container.removeChild(this.resultsContainer);
  }

  /**
   * Update loop which is used for spinning animation.
   * TODO: make movement FPS independent by using delta-time.
   */
  update() {
    switch (this.state) {
      case REEL_STATES.SPINNING:
        for (const symbol of this.symbols) {

          if ((symbol.y) >= this.reelHeight) {
            //this.topSymbol.tint = 0xFFFFFF;
            symbol.y = this.topSymbol.y - symbol.height;
            this.topSymbol = symbol;
            //symbol.tint = 0x000;
            this.updateTopSymbol(symbol);
          } else {
            symbol.y += 20;
          }
        }
        if (this.resultsContainer.y < this.reelHeight) {
          this.resultsContainer.y += 20;
        }

        break;

      case REEL_STATES.STOPPING:
        for (const symbol of this.symbols) {
          //whilst stopping we still want to move symbols because we have a separate results container
          symbol.y += 20;
        }
        break;

      default:
        break;
    }
  }

  /**
   * Changes reel position and sets the top symbol to the next one in the reelSet.
   * @param {object} symbol
   */
  updateTopSymbol(symbol) {
    this.incrementReelSetPos();
    symbol.texture = PIXI.utils.TextureCache[this.reelSet[this.reelSetPosition]];
  }

  /**
   * Increments reelSet position and moves further down in the reel set.
   */
  incrementReelSetPos() {
    if (this.reelSetPosition >= this.reelSet.length - 1) {
      this.reelSetPosition = 0;
    } else {
      this.reelSetPosition++;
    }
  }

  /**
   * Is called when reels are stopped with a symbol index where the reel has stopped.
   * @param {number} onIndex - Index of the symbol where the reel stops.
   */
  reelStopped(onIndex) {
    //TODO: implementation here
    //console.log("Reel Stopped");
  }

  /**
   * @public
   * @member {array} winningSymbols - Array of winning symbol objects.
   */
  getVisibleSymbols() {
    return this.winningSymbols;
  }

  /**
   * @public
   * @member {array} winningSymbolsIds - Array of winning symbol Ids. Useful for parsing results.
   */
  getWinningSymbolsIds() {
    const winningSymbolsIds = [];
    // for (const winningSymbol of this.winningSymbols) {
    //   winningSymbolsIds.push(winningSymbol.symbolId);
    // }
    return winningSymbolsIds;
  }
}
