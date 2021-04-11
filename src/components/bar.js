import Component from '../sceneManager/component';

/**
 * Class representing a 'fake' Bar. In a real game this would be connected
 * to the actual backend and probably do few things more :)
 * @module Bar
 * @extends Component
 */
export default class Bar extends Component {
  constructor() {
    super();
    this.totalBet = 1;
    this.totalWin = 0;
    this.userDefinedCurrency = {}; //{ style: 'currency', currency: 'EUR' };
  }

  /**
   * Starts the entity and subscribes the component to balance/game events.
   */
  start(entity) {
    this.entity = entity;
    entity.eventEmitter.on('spinStarted', () => { this.updateBalance(); });
    entity.eventEmitter.on('win', (win) => { this.updateTotalWin(win.totalWin); });
    entity.eventEmitter.on('setBalance', (balance) => { this.setBalance(balance); });
    entity.eventEmitter.on('spin', () => { this.checkBalance(); });

    this.getBalance();
  }

  /**
   * Is called from the SceneManager when entities are ready which means we can now retrieve them.
   */
  entitiesReady() {
    const childIndex = 0;
    this.balanceValueEntity = sceneManager.find('balance-value').children[childIndex];
    this.winValueEntity = sceneManager.find('win-value').children[childIndex];
    this.totalBetValueEntity = sceneManager.find('total-bet-value').children[childIndex];
    this.setDefaults();
  }

  /**
   * Gets balance from the local storage if it exists.
   * If the balance doesn't exist it just sets a default value and stores it.
   */
  getBalance() {
    this.balance = parseFloat(localStorage.getItem('balance'));
    if (!this.balance) {
      this.balance = 5000;
      localStorage.setItem('balance', this.balance);
    }
  }

  /**
   * Updates the UI components to reflect the default set values.
   */
  setDefaults() {
    this.balanceValueEntity.text = this.balance.toLocaleString(navigator.language, this.userDefinedCurrency);
    this.winValueEntity.text = this.totalWin.toLocaleString(navigator.language, this.userDefinedCurrency);
    this.totalBetValueEntity.text = this.totalBet.toLocaleString(navigator.language, this.userDefinedCurrency);
  }

  /**
   * Sets balance. For now only used for debugging purposes.
   */
  setBalance(balance) {
    localStorage.setItem('balance', this.balance);
    this.balance = balance;
    this.updateTotalWin(0);
  }

  /**
   * Checks balance. If it's above 0 it propagates the spin further otherwise
   * it notifies the user.
   */
  checkBalance() {
    if (this.balance - this.totalBet >= 0 ){
      this.entity.eventEmitter.emit('spinAllowed');
    } else {
      alert("You do not have enough money to spin");
    }
  }

  /**
   * Updates the balance. Usually happens on every spin but it is useful in other cases as well
   * such as when receiving a balance update from the server.
   */
  updateBalance() {
    this.balance -= this.totalBet;
    this.updateTotalWin(0);
  }

  /**
   * Updates the totalWin. Usually happens on a winning line event and it's reset to 0 on start of every spin.
   */
  updateTotalWin(win) {
    this.totalWin = win;
    this.balance += this.totalWin;
    this.balanceValueEntity.text = this.balance.toLocaleString(navigator.language, this.userDefinedCurrency);
    localStorage.setItem('balance', this.balance);
    this.winValueEntity.text = this.totalWin.toLocaleString(navigator.language, this.userDefinedCurrency);
  }
}