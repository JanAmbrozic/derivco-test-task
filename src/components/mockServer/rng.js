/**
 * Fake (and a very bad :)) RNG
 */
export default class RNG {

    constructor(entity) {
        // listen for debug events
        entity.eventEmitter.on('setResults', this.setResults.bind(this));
        this.debugResults;
        // simple symbol mapping, we could retrieve this from the scene definition but since in 
        // reality RNG would never live here I left it here
        this.symList = ["CHERRY", "7", "BAR", "2xBAR", "3xBAR"];
    }

    /**
     * Results which are then "rigged" and are used in the slotmachine stop.
     * @param {object} results - JSON object with results
     */
    setResults(results) {
        this.debugResults = results;
    }


    /**
     * Returns result based on Math.random. If DEBUG is enabled then 
     * user can pass in wanted results
     * @param {number} reelIndex - reel index so we can retrieve different results per reel
     */
    getResults(reelIndex) {
        let results;

        if (this.debugResults) {

            let symbols = [];

            for (const symbol of this.debugResults[reelIndex].symbols) {
                if (symbol === "random") {
                    symbols.push(this.symList[Math.floor(Math.random() * 5)]);
                } else {
                    symbols.push(symbol);
                }
            }

            results = {
                symbols: symbols,
                winlineType: this.debugResults[reelIndex].winlineType
            };

            // reset debug results on last request
            if (reelIndex === 2) {
                this.debugResults = null;
            }
        } else {
            // if we don't have debug results lets set them "pseudo-randomly"
            let possibleStoppingPositions = ["top", "center", "bottom"];
            let posIndex = Math.floor(Math.random() * 3);
            results =
            {
                symbols: [this.symList[Math.floor(Math.random() * 5)], this.symList[Math.floor(Math.random() * 5)], this.symList[Math.floor(Math.random() * 5)]],
                winlineType: possibleStoppingPositions[posIndex]
            };
        }

        return results;
    }
}