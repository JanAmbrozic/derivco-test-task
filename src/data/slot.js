import TWEEN from '@tweenjs/tween.js';

export default
{
  id: 'slot',
  display: {
    position: {
      x: 440,
      y: 155,
    },
    scale: {
      x: 0.85,
      y: 0.85,
    },
  },
  entities: [

  ],
  components: [
    'Slotmachine',
  ],
  attributes: {
    zoomIn: {
      duration: 1500,
      easing: TWEEN.Easing.Sinusoidal.In,
    },
    numberOfReels: 3,
    numberOfSymbolsPerReel: [
      5, 5, 5
    ],
    reelSet: [
      ["3xBAR", "BAR", "2xBAR", "7", "CHERRY"],
      ["3xBAR", "BAR", "2xBAR", "7", "CHERRY"],
      ["3xBAR", "BAR", "2xBAR", "7", "CHERRY"]
    ],

    spin: {
      duration: 3000,
      speedFactor: 6,
      easing: TWEEN.Easing.Back.InOut,
    },
    winlines: [
      // 3 CHERRY symbols on top line 2000
      {
        winlineId: 0,
        type: "top",
        sym: ["CHERRY"],
        winAmount: 2000,
      }, 
      // 3 CHERRY symbols on center line 1000
      {
        winlineId: 1,
        type: "center",
        sym: ["CHERRY"],
        winAmount: 1000,
      }, 
      // 3 CHERRY symbols on bottom line 4000
      {
        winlineId: 2,
        type: "bottom",
        sym: ["CHERRY"],
        winAmount: 4000,
      }, 
      // 3 7 symbols on any line 150
      {
        winlineId: 3,
        type: "top",
        sym: ["7"],
        winAmount: 150,
      }, {
        winlineId: 4,
        type: "center",
        sym: ["7"],
        winAmount: 150,
      }, {
        winlineId: 5,
        type: "bottom",
        sym: ["7"],
        winAmount: 150,
      }, 
      // Any combination of CHERRY and 7 on any line 75
      {
        winlineId: 15,
        type: "top",
        sym: ["7", "CHERRY"],
        winAmount: 75,
      }, {
        winlineId: 16,
        type: "center",
        sym: ["7", "CHERRY"],
        winAmount: 75,
      }, {
        winlineId: 17,
        type: "bottom",
        sym: ["7", "CHERRY"],
        winAmount: 75,
      }, 
      // Combination of any BAR symbols on any line 5
      {
        winlineId: 18,
        type: "top",
        sym: ["BAR", "2xBAR", "3xBAR"],
        winAmount: 5,
      }, {
        winlineId: 19,
        type: "center",
        sym: ["BAR", "2xBAR", "3xBAR"],
        winAmount: 5,
      }, {
        winlineId: 20,
        type: "bottom",
        sym: ["BAR", "2xBAR", "3xBAR"],
        winAmount: 5,
      }, 
      // 3 3xBAR symbols on any line 50
      {
        winlineId: 6,
        type: "top",
        sym: ["3xBAR"],
        winAmount: 50,
      }, {
        winlineId: 7,
        type: "center",
        sym: ["3xBAR"],
        winAmount: 50,
      }, {
        winlineId: 8,
        type: "bottom",
        sym: ["3xBAR"],
        winAmount: 50,
      }, 
      // 3 2xBAR symbols on any line 20
      {
        winlineId: 9,
        type: "top",
        sym: ["2xBAR"],
        winAmount: 20,
      }, {
        winlineId: 10,
        type: "center",
        sym: ["2xBAR"],
        winAmount: 20,
      }, {
        winlineId: 11,
        type: "bottom",
        sym: ["2xBAR"],
        winAmount: 20,
      }, 
      // 3 BAR symbols on any line 10
      {
        winlineId: 12,
        type: "top",
        sym: ["BAR"],
        winAmount: 10,
      }, {
        winlineId: 13,
        type: "center",
        sym: ["BAR"],
        winAmount: 10,
      }, {
        winlineId: 14,
        type: "bottom",
        sym: ["BAR"],
        winAmount: 10,
      }
    ],
  },
};