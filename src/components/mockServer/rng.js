/**
 * Fake (and a very bad :)) RNG
 */
 export default class RNG {    

    constructor(entity) {
        // listen for debug events
        entity.eventEmitter.on('setResults', this.setResults.bind(this));

        this.debugResults;
        this.symList = ["CHERRY", "7", "BAR", "2xBAR", "3xBAR"];
    }

    setResults(results) {
        console.log(results)
        this.debugResults = results;
    }

    
    /**
     * Returns result based on Math.random. If DEBUG is enabled then 
     * user can pass in wanted results
     */
    getResults(reelIndex) {
        let results; 

        if(this.debugResults) {

            let symbols = [];

            for (const symbol of this.debugResults[reelIndex].symbols) {
                if(symbol === "random") {
                    symbols.push(this.symList[Math.floor(Math.random() * 5)]);
                } else {
                    symbols.push(symbol)
                }
            }

            results = {
                symbols: symbols,
                winlineType: this.debugResults[reelIndex].winlineType
            }

            // reset debug results on last request
            if(reelIndex === 2) {
                this.debugResults = null;
            }
        } else {
            let possibleStoppingPositions = ["top", "center", "bottom"];
            let posIndex = Math.floor(Math.random() * 3);
            results = 
             {
                symbols:   [this.symList[Math.floor(Math.random() * 5)], this.symList[Math.floor(Math.random() * 5)], this.symList[Math.floor(Math.random() * 5)]],
                winlineType: possibleStoppingPositions[posIndex]
            }
        }

        return results;
    }
    
    
}