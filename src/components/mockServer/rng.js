/**
 * Fake (and a very bad :)) RNG
 */
 export default class RNG {


    
    /**
     * Returns result based on Math.random. If DEBUG is enabled then 
     * user can pass in wanted results
     */
    getResults() {

        let possibleStoppingPositions = ["top", "center", "bottom"];
        let posIndex = 0//Math.floor(Math.random() * 3);

        return {
            symbols:   ["7", "BAR", "CHERRY"],
            winlineType: possibleStoppingPositions[posIndex]
        }
    }
    
    
}