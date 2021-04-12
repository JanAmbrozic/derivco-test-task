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
    entity.eventEmitter.on('win', (win) => { this.highlightWins(win.winlines); });
  }


  /**
   * Highlights the winning combination in the paytable
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
          payline.style.fill = payline.style.fill === "red" ? "black" : "red";
        })
        .start();
    }
  }
}