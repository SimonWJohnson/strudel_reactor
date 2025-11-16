import Volume from "./VolumeLogic";
import Reverb from "./ReverbLogic";
import InstrumentMute from "./InstrumentLogic";
import applyCPM from "./CPMLogic";

function MasterBuild({ songText, volume, reverb, instrumentMute }) { // add CPM **
    let masterBuild = Volume({ inputText: songText, volume });
    masterBuild = Reverb({ inputText: masterBuild, reverb });
    masterBuild = InstrumentMute({ inputText: masterBuild, muteMap: instrumentMute });

    return masterBuild;
}

export default MasterBuild;