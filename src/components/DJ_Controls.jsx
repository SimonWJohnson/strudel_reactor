import ReverbSlider from "./ReverbSlider";
import VolumeSlider from "./VolumeSlider"
function DJ_Controls() {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPM</span>
                <input type="text" class="form-control" id="cpm_text-input" placeholder="120" aria-label="cpm" aria-describedby="cpm_label" />
            </div>
            <br />
            <VolumeSlider/>

            <ReverbSlider/>
            <br />
            <br />
            <div class="form-check">
                <input className="form-check-input" type="checkbox" value="" id="inst1"/>
                <label className="form-check-label" htmlFor="checkDefault">
                        Instrument 1
                    </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="inst2" />
                <label className="form-check-label" htmlFor="checkChecked">
                    Instrument 2
                    </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="inst3" />
                <label className="form-check-label" htmlFor="checkChecked">
                    Instrument 3
                </label>
            </div>
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