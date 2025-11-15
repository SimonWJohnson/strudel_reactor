
import { useRef } from "react";
function SaveOrLoadSettings() {
    return (
        <>
            <div className="d-flex flex-column align-items-center text-center gap-3">
                {/*<label className="form-label d-block" htmlFor="save_settings">Save or Load Settings</label>*/}
                <div className="mb-2 text-center">
                    <h5 className="m-0 dj-title" style={{ fontWeight: "600", letterSpacing: "0.5px" }}>
                        Save and Load Settings
                    </h5>
                </div>
                <div className="btn-group" role="group" aria-label="Save/Load">
                    <button id="save_settings" className="btn btn-outline-success">Save</button>
                    <button id="load_settings" className="btn btn-outline-danger">Load</button>
                </div>
            </div>
        </>
    );
}

export default SaveOrLoadSettings;