/**
 * Evaluation of results and matching with winlines defined in `data/slot.js`
 */
export default class ResultsEval {


/**
 * Checks for winlines. This code could be improved but since this would be sent back from a 
 * server in a realistic game it's just a rough mock.
 */
  checkWinningLines(reels, winlineData) {

    let winlines = [];
    let totalWin = 0;

    //check if all numbers of visible symbols are equal, if not we do not have a win
    if (reels[0].getVisibleSymbols().length === reels[1].getVisibleSymbols().length
      && reels[0].getVisibleSymbols().length === reels[2].getVisibleSymbols().length) {
      //if that is the case compare lines to paytable data
      for (const winline of winlineData) {
        let newWinline;

        // we know we have a center win line
        if (reels[0].getVisibleSymbols().length === 1) {
          // we filter out only center lines
          if (winline.type === 'center') {
            newWinline = this.checkMatches(reels, winline, 0);
          }
        } else { // we know we a top and bottom winline
          if (winline.type === 'top') {
            newWinline = this.checkMatches(reels, winline, 0);
          } else if (winline.type === 'bottom') {
            newWinline = this.checkMatches(reels, winline, 1);
          }
        }

        if (newWinline) {
          totalWin += newWinline.winAmount;
          winlines.push(newWinline);
        }
      }
    }

    return {
      winlines,
      totalWin
    };
  }

  checkMatches(reels, winline, index) {
    return this.checkFor3SymbolsMatch(reels, winline, index) || this.checkForCherry7Wins(reels, winline, index) || this.checkForBarCombo(reels, winline, index);
  }

  checkFor3SymbolsMatch(reels, winline, index) {
    //check if all 3 symbols match and if winline sym input only has one winning symbol (no combinations are possible)
    if (reels[0].getVisibleSymbols()[index] === reels[1].getVisibleSymbols()[index] &&
      reels[0].getVisibleSymbols()[index] === reels[2].getVisibleSymbols()[index] &&
      winline.sym.length === 1 && winline.sym[0] === reels[0].getVisibleSymbols()[index]) {
      let foundWinline = {
        id: winline.winlineId,
        sym: winline.sym,
        type: winline.type,
        winAmount: winline.winAmount
      };
      return foundWinline;
    }
    return null;
  }

  //Any combination of CHERRY and 7 on any line 75
  checkForCherry7Wins(reels, winline, index) {

    let match = true;

    for (const reel of reels) {
      if (reel.getVisibleSymbols()[index] !== "CHERRY" && reel.getVisibleSymbols()[index] !== "7") {
        match = false;
      }
    }

    if (match && winline.sym.length === 2 && winline.sym[0] === "7" && winline.sym[1] === "CHERRY") {
      let foundWinline = {
        id: winline.winlineId,
        sym: winline.sym,
        type: winline.type,
        winAmount: winline.winAmount
      };
      return foundWinline;
    }

    return null;

  }

  checkForBarCombo(reels, winline, index) {

    let match = true;

    for (const reel of reels) {
      if (reel.getVisibleSymbols()[index] !== "BAR" && reel.getVisibleSymbols()[index] !== "2xBAR" && reel.getVisibleSymbols()[index] !== "3xBAR") {
        match = false;
      }
    }
    //check if all bars are the same, then we have a higher winning combination
    if (reels[0].getVisibleSymbols()[index] === reels[1].getVisibleSymbols()[index] &&
      reels[0].getVisibleSymbols()[index] === reels[2].getVisibleSymbols()[index]) {
      return null;
    }


    if (match && winline.sym.length === 3) {
      let foundWinline = {
        id: winline.winlineId,
        sym: winline.sym,
        type: winline.type,
        winAmount: winline.winAmount
      };
      return foundWinline;
    }

    return null;

  }
}