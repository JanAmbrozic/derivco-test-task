import Component from '../sceneManager/component';
import TWEEN from '@tweenjs/tween.js';

/**
 * Class representing a simple paytable which highlights results on a win
 * @module Paytable
 * @extends Component
 */
export default class Paytable extends Component {
  constructor() {
    super();
  }

  /**
   * Starts the entity and subscribes the component to balance/game events.
   */
  start(entity) {
    this.entity = entity;
    entity.eventEmitter.on('spinStarted', () => { this.reset(); });
    entity.eventEmitter.on('win', (win) => { this.highlightWins(win.winlines); });
    this.entity.attributes
  }

  /**
   * Is called from the SceneManager when entities are ready which means we can now retrieve them.
   */
  entitiesReady() {
    const childIndex = 0;
    this.balanceValueEntity = sceneManager.find('balance-value').children[childIndex];
    this.winValueEntity = sceneManager.find('win-value').children[childIndex];
    this.totalBetValueEntity = sceneManager.find('total-bet-value').children[childIndex];
  }

  reset() {

  }

  /**
   * Updates the totalWin. Usually happens on a winning line event and it's reset to 0 on start of every spin.
   */
  highlightWins(wins) {

    for (const win of wins) {
      let paylineId = this.entity.attributes.winlineIdMap[win.id];
      let payline = sceneManager.find(paylineId).children[0];

      new TWEEN.Tween(payline)
      .to({ fake: 360 }, 100)
      .repeat(6)
      .delay(250)
      .onRepeat(() => {
        payline.style.fill = payline.style.fill === "white" ? "black" : "white";
      })
      .start();
    }


    //console.log("PAYTABLe", win)
  }
}