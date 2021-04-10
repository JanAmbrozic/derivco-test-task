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
    this.currentIndex = 0;
    this.numOfSymbols = numOfSymbols;
    this.reelParams = reelParams;
    this.reelHeight = 400;
    this.state = REEL_STATES.IDLE;
    this.originalReelSet = [...reelParams.reelSet];
    this.reelSet = reelParams.reelSet;
    this.reelIndex = reelIndex;
    this.topSymbol;
    this.reelSetPosition = 0;

    this.resultsContainer = new PIXI.Container();

    this.container.x = this.reelParams.x;

    this.stoppingPos = {
      top: -150,
      center: -75,
      bottom: 0
    }

    const graphics1 = new PIXI.Graphics();
    graphics1.beginFill(0x22CCFF);
    graphics1.drawRect(0, 0, 150, this.reelHeight);
    graphics1.endFill();

    //for debuggin purposes
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xFF3300);
    graphics.drawRect(0, 0, 150, this.reelHeight);
    graphics.endFill();
   
    this.container.addChild(graphics);
    this.resultsContainer.addChild(graphics1);
    //this.container.mask = graphics;
  }

  /**
   * Creates number of symbols on the reel which is limited by the parameter {@link numOfSymbols}
   */
  start() {
    for (let index = 0; index < this.numOfSymbols; index++) {
      this.createSymbols({x: 0, y: index * 155}, index, this.numOfSymbols);
    }

    this.topSymbol = this.symbols[0];
  }

  /**
   * Creates number of symbols on the reel which is limited by the parameter {@link numOfSymbols}
   * @param {object} position - Position of the symbol.
   * @param {number} index - Index of in the loop so we can calculate the right angle.
   * @param {number} numOfElem - Number of total elements so we can calculate the right angle.
   */
  createSymbols(position, index, numOfElem) {
    let textureId = this.reelSet[this.reelSetPosition];
    const sym = new PIXI.Sprite( PIXI.utils.TextureCache[textureId]);
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
   * Asynchronous spin function which rotates the wheel on stops on the right index.
   * TODO: make more parameters configurable, better caluclate the speed, rotation, etc...
   * @param {number} stopOnIndex - Index of the symbol where the reel stops.
   */
  async spin(stopOnIndex) {
    // start X position of the reel
    const startY = this.container.y;
    // calc: full circle / all symbols * stopIndex
    const endY = this.container.y + this.reelHeight;
    this.state = REEL_STATES.SPINNING;

    return new Promise((resolve) => {

     new TWEEN.Tween(this.container)
      .delay(3000)
      .onComplete(() => {
        //this.setStopping();
        //this.reelStopped(stopOnIndex);
        resolve();
      })
     .start()

      // this.spinningTween = new TWEEN.Tween(this.container)
      //   .to({ y: startY + endY }, this.reelParams.spin.duration)
      //   .easing(this.reelParams.spin.easing)
      //   .onComplete(() => {
      //     this.reelStopped(stopOnIndex);
      //     resolve();
      //   })
      //   .start();
    });
  }

  stop(reelSetStopIndex, stoppingPosition, results) {
    this.setStopping(reelSetStopIndex, stoppingPosition, results);
  }

  setStopping(pos, stoppingPosition, results) {
    this.state = REEL_STATES.STOPPING;
    //set winning symbols + padding
    // for (const result of this.results) {
    //   sym.y = this.topSymbol.y - sym.height;
    //   this.topSymbol = sym;
    // }
    this.reelSet.push(...results)
    this.reelSetPosition = this.reelSet.length - 4;
    this.symCounter = 5;  
    this.stopOffset = this.stoppingPos[stoppingPosition];

    this.resultsContainer.y = this.topSymbol.y - this.reelHeight;
    this.container.addChild(this.resultsContainer)

    // for (let index = 0; index < this.results.length; index++) {
    //   const result = array[index];
      
    // }


    for (let index = 0; index < results.length; index++) {
      const result = results[index];
      const sym = new PIXI.Sprite( PIXI.utils.TextureCache[result]);
      sym.y = index * 150
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

  finishStopping() {
      this.reset();
  }

  reset() {
    this.reelSet = [...this.originalReelSet];
    this.resultsContainer.removeChildren();
    this.container.removeChild(this.resultsContainer);
  }

  update() { 
    switch (this.state) {
      case REEL_STATES.SPINNING:
        for (const symbol of this.symbols) {

          if((symbol.y) >= this.reelHeight) {
            this.topSymbol.tint = 0xFFFFFF;

            symbol.y = this.topSymbol.y - symbol.height;
            this.topSymbol = symbol;
            symbol.tint = 0x000;

            this.updateTopSymbol(symbol);
          } else {
            symbol.y += 10;
          }
        }
        if(this.resultsContainer.y < this.reelHeight) {
          this.resultsContainer.y += 10;
        }

        break;

      case REEL_STATES.STOPPING:
        for (const symbol of this.symbols) {
          // if((symbol.y) >= this.reelHeight) {
          //   symbol.y = this.topSymbol.y - symbol.height;
          //   this.topSymbol = symbol;
          //   //this.updateTopSymbol(symbol);
          //   this.symCounter--;

            // if(this.symCounter === 0) {
            //   //this.state = REEL_STATES.IDLE;
            //   this.finishStopping();
            // }
          //} else {
            symbol.y += 10;
          //}
        }
        break;
    
      default:
        break;
    }
  }

  updateTopSymbol(symbol) {
    this.incrementReelSetPos();
    if(this.reelIndex === 0){
      console.log("setting tetxure", this.reelSet[this.reelSetPosition])
    }
    symbol.texture = PIXI.utils.TextureCache[this.reelSet[this.reelSetPosition]];
  }

  incrementReelSetPos() {
    if(this.reelSetPosition >= this.reelSet.length - 1) {
      this.reelSetPosition = 0;
    } else{
      this.reelSetPosition++;
    }
  }

  /**
   * Is called when reels are stopped with a symbol index where the reel has stopped.
   * @param {number} onIndex - Index of the symbol where the reel stops.
   */
  reelStopped(onIndex) {
    let symbolAboveId = onIndex - 1;
    let symbolBelowId = onIndex + 1;

    if (symbolAboveId < 0) {
      symbolAboveId = this.symbols.length - 1;
    }

    if (symbolBelowId > this.symbols.length - 1) {
      symbolBelowId = 0;
    }

    this.winningSymbols = [
      this.symbols[symbolAboveId],
      this.symbols[onIndex],
      this.symbols[symbolBelowId],
    ];
  }

  /**
   * @public
   * @member {array} winningSymbols - Array of winning symbol objects.
   */
  getWinningSymbols() {
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
