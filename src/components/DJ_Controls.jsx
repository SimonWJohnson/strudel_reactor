import ReverbSlider from "./ReverbSlider";
import VolumeSlider from "./VolumeSlider";
import InstrumentSelection from "./InstrumentSelection";
import SaveOrLoadSettings from "./SaveOrLoadSettings";
function DJ_Controls() {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">Set CPM</span>
                <input type="text" class="form-control" id="cpm_text-input" placeholder="120" aria-label="cpm" aria-describedby="cpm_label" />
            </div>
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