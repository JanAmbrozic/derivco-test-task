import * as dat from 'dat.gui';

export default class Debug {
    /**
     * Creates 3 folders for each reel and sends 
     * the data when RIG button is pressed
     */
    constructor(eventEmitter) {
        let gui = new dat.GUI({ name: 'My GUI' });

        let reel1Data = this.createReelFolder("Reel 1", gui);
        let reel2Data = this.createReelFolder("Reel 2", gui);
        let reel3Data = this.createReelFolder("Reel 3", gui);

        let submit = {
            RIG: function() {
                alert("RNG is now rigged.");
                let debugResults = {
                    0: {
                        symbols:   [reel1Data.TopSymbol, reel1Data.CenterSymbol, reel1Data.BottomSymbol],
                        winlineType: reel1Data.Winline
                    },
                    1: {
                        symbols:   [reel2Data.TopSymbol, reel2Data.CenterSymbol, reel2Data.BottomSymbol],
                        winlineType: reel2Data.Winline
                    },
                    2: {
                        symbols:   [reel3Data.TopSymbol, reel3Data.CenterSymbol, reel3Data.BottomSymbol],
                        winlineType: reel3Data.Winline
                    }
                };
                eventEmitter.emit('setResults', debugResults);
            }
        };
        gui.add(submit, 'RIG');
    }

    /**
     * Creates reel folder section in DAT.GUI which enables per-reel rigging. 
     * @param {string} reelName - Reel name which is used for folder title
     * @param {object} datGui - datGUI reference
     * @returns {object} Folder data which is used to retrieve settings.
     */
    createReelFolder(reelName, datGui) {
        var reel = datGui.addFolder(reelName);

        var folderData ={
            Winline: 'top',
            TopSymbol: 'random',
            CenterSymbol: 'random',
            BottomSymbol: 'random'
        };
        reel.add(folderData, 'Winline', { Top: 'top', Center: 'center', Bottom: 'bottom' });
        reel.add(folderData, 'TopSymbol', { 7: '7', CHERRY: 'CHERRY', BAR: 'BAR', RANDOM: 'random'  });
        reel.add(folderData, 'CenterSymbol', { 7: '7', CHERRY: 'CHERRY', BAR: 'BAR', RANDOM: 'random' });
        reel.add(folderData, 'BottomSymbol', { 7: '7', CHERRY: 'CHERRY', BAR: 'BAR', RANDOM: 'random' });

        return folderData;
    }

}