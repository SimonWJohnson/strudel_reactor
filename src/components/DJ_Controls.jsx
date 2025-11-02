import ReverbSlider from "./ReverbSlider";
import VolumeSlider from "./VolumeSlider";
import InstrumentSelection from "./InstrumentSelection";
function DJ_Controls() {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPM</span>
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
            <div className="mb-3">
                <label className="form-label d-block" htmlFor="save_settings">Save or Load Settings</label>
                <div className="btn-group" role="group" aria-label="Save/Load">
                    <button id="save_settings" className="btn btn-outline-success">Save</button>
                    <button id="load_settings" className="btn btn-outline-danger">Load</button>
                </div>
            </div>



        </>

  );
}

export default DJ_Controls;