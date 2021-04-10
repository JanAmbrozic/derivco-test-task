import TWEEN from '@tweenjs/tween.js';

export default
{
  id: 'slot',
  display: {
    position: {
      x: 640,
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
      ["3xBAR", "2xBAR", "3xBAR", "2xBAR", "3xBAR", "2xBAR", "3xBAR", "2xBAR", "3xBAR"],
      ["3xBAR", "2xBAR", "3xBAR", "2xBAR", "3xBAR", "2xBAR", "3xBAR", "2xBAR", "3xBAR"],
      ["3xBAR", "2xBAR", "3xBAR", "2xBAR", "3xBAR", "2xBAR", "3xBAR", "2xBAR", "3xBAR"]
    ],

    spin: {
      duration: 3000,
      speedFactor: 6,
      easing: TWEEN.Easing.Back.InOut,
    },
    winlines: [
      // 3 CHERRY symbols on top line 2000
      {
        winningLineNumber: 0,
        positions: [0, 0, 0],
        sym: ["CHERRY"],
        winAmount: 2000,
      }, 
      // 3 CHERRY symbols on center line 1000
      {
        winningLineNumber: 0,
        positions: [1, 1, 1],
        sym: ["CHERRY"],
        winAmount: 1000,
      }, 
      // 3 CHERRY symbols on bottom line 4000
      {
        winningLineNumber: 0,
        positions: [2, 2, 2],
        sym: ["CHERRY"],
        winAmount: 4000,
      }, 
      // 3 7 symbols on any line 150
      {
        winningLineNumber: 0,
        positions: [0, 0, 0],
        sym: ["7"],
        winAmount: 150,
      }, {
        winningLineNumber: 0,
        positions: [1, 1, 1],
        sym: ["7"],
        winAmount: 150,
      }, {
        winningLineNumber: 0,
        positions: [2, 2, 2],
        sym: ["7"],
        winAmount: 150,
      }, 
      // Any combination of CHERRY and 7 on any line 75
      {
        winningLineNumber: 0,
        positions: [0, 0, 0],
        sym: ["7", "CHERRY"],
        winAmount: 75,
      }, {
        winningLineNumber: 0,
        positions: [1, 1, 1],
        sym: ["7", "CHERRY"],
        winAmount: 75,
      }, {
        winningLineNumber: 0,
        positions: [2, 2, 2],
        sym: ["7", "CHERRY"],
        winAmount: 75,
      }, 
      // Combination of any BAR symbols on any line 5
      {
        winningLineNumber: 0,
        positions: [0, 0, 0],
        sym: ["BAR", "2xBAR", "3xBAR"],
        winAmount: 5,
      }, {
        winningLineNumber: 1,
        positions: [1, 1, 1],
        sym: ["BAR", "2xBAR", "3xBAR"],
        winAmount: 5,
      }, {
        winningLineNumber: 2,
        positions: [2, 2, 2],
        sym: ["BAR", "2xBAR", "3xBAR"],
        winAmount: 5,
      }, 
      // 3 3xBAR symbols on any line 50
      {
        winningLineNumber: 0,
        positions: [0, 0, 0],
        sym: ["3xBAR"],
        winAmount: 50,
      }, {
        winningLineNumber: 0,
        positions: [1, 1, 1],
        sym: ["3xBAR"],
        winAmount: 50,
      }, {
        winningLineNumber: 0,
        positions: [2, 2, 2],
        sym: ["3xBAR"],
        winAmount: 50,
      }, 
      // 3 2xBAR symbols on any line 20
      {
        winningLineNumber: 0,
        positions: [0, 0, 0],
        sym: ["2xBAR"],
        winAmount: 20,
      }, {
        winningLineNumber: 0,
        positions: [1, 1, 1],
        sym: ["2xBAR"],
        winAmount: 20,
      }, {
        winningLineNumber: 0,
        positions: [2, 2, 2],
        sym: ["2xBAR"],
        winAmount: 20,
      }, 
      // 3 BAR symbols on any line 10
      {
        winningLineNumber: 0,
        positions: [0, 0, 0],
        sym: ["BAR"],
        winAmount: 10,
      }, {
        winningLineNumber: 0,
        positions: [1, 1, 1],
        sym: ["BAR"],
        winAmount: 10,
      }, {
        winningLineNumber: 0,
        positions: [2, 2, 2],
        sym: ["BAR"],
        winAmount: 10,
      }
    ],
  },
};