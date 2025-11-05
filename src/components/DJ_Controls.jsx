import ReverbSlider from "./ReverbSlider";
import VolumeSlider from "./VolumeSlider";
import InstrumentSelection from "./InstrumentSelection";
import SaveOrLoadSettings from "./SaveOrLoadSettings";
import SetCPM from "./SetCPM";
function DJ_Controls(volume, onVolumeChange) {
    return (
        <>
            <SetCPM/>
            <br />
            <VolumeSlider/>
            <br />
            <ReverbSlider/>
            <br />
            <br />
            <InstrumentSelection/>
            <br />
            <SaveOrLoadSettings/>
        </>
  );
}

export default DJ_Controls;