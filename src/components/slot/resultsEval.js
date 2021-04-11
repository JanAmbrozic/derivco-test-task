/**
 * Evaluation of results and matching with winlines defined in `data/slot.js`
 */
export default class ResultsEval {
  /**
   * Starts the entity which adds a sprite. Very basic for now.
   */
  start(entity) {
    this.entity = entity;
    this.container = PIXI.Sprite.fromFrame(entity.attributes.textureId);
    entity.container.addChild(this.container);
  }


  setTexture(textureId) {
    if(!PIXI.utils.TextureCache[textureId]) {
      textureId = PIXI.Texture.EMPTY;
    }
    this.container.texture = PIXI.Sprite.fromFrame(textureId);
  }


  /**
   * Pay-table must indicate winning combinations and payouts as: 3 CHERRY symbols on top line 2000
3 CHERRY symbols on center line 1000
3 CHERRY symbols on bottom line 4000
 
3 7 symbols on any line 150
Any combination of CHERRY and 7 on any line 75 3 3xBAR symbols on any line 50
3 2xBAR symbols on any line 20
3 BAR symbols on any line 10
Combination of any BAR symbols on any line 5


        winningLineNumber: 0,
        positions: [0, 0, 0],
        sym: ["CHERRY"],
        winAmount: 2000,
   * 
   */
  checkWinningLines(reels, winlineData) {

    let winlines = [];
    let totalWin = 0;

    //check if all numbers of visible symbols are equal, if not we do not have a win
    if(reels[0].getVisibleSymbols().length === reels[1].getVisibleSymbols().length 
    && reels[0].getVisibleSymbols().length === reels[2].getVisibleSymbols().length ) {
        //if that is the case compare lines to paytable data



        for (const winline of winlineData) {

            // we know we have a center win line
            if(reels[0].getVisibleSymbols().length === 1) {
                // we filter out only center lines
                if(winline.type === 'center') {
                    let newWinline = this.checkFor3SymbolsMatch(reels, winline, 0);
                    if(newWinline){
                        winlines.push(newWinline);
                        totalWin += newWinline.winAmount;
                    }
                }

                // if(reels[0].getVisibleSymbols()[0] === reels[1].getVisibleSymbols()[0] &&
                //     reels[0].getVisibleSymbols()[0] === reels[2].getVisibleSymbols()[0] && 
                //     winline.sym[0] === reels[0].getVisibleSymbols()[0]) 
                // {
                //         let foundWinline = {
                //             winline: winline,
                //             type: 'center',
                //             winAmount: winline.winAmount
                //         }
                //         winlines.push(foundWinline);
                // }

            } else { // we know we a top and bottom winline
                let newWinline;
                if(winline.type === 'top') {
                    newWinline = this.checkFor3SymbolsMatch(reels, winline, 0);
                } else if(winline.type === 'bottom'){
                    newWinline = this.checkFor3SymbolsMatch(reels, winline, 1);
                }

                if(newWinline){
                    totalWin += newWinline.winAmount;
                    winlines.push(newWinline);
                }
            }            
        }
    } 

    return {
      winlines,
      totalWin
      };
  }

  checkFor3SymbolsMatch(reels, winline, index) {
    //check if all 3 symbols match and if winline sym input only has one winning symbol (no combinations are possible)
    if( reels[0].getVisibleSymbols()[index] === reels[1].getVisibleSymbols()[index] &&
        reels[0].getVisibleSymbols()[index] === reels[2].getVisibleSymbols()[index] && 
        winline.sym.length === 1 && winline.sym[0] === reels[0].getVisibleSymbols()[index]) {
        let foundWinline = {
            id: winline.winlineId,
            sym: winline.sym,
            type: winline.type,
            winAmount: winline.winAmount
        }
        return foundWinline;
    }
    return null;
  }

  //Any combination of CHERRY and 7 on any line 75
  checkForCherry7Wins () {
    //todo add combo evaluations
  }

  
}