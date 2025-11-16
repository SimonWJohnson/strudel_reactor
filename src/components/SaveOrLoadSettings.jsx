
import { useRef } from "react";
function SaveOrLoadSettings({ onSaveExport, onLoadImport }) {
    const fileRef = useRef(null);

    const triggerImport = () => fileRef.current?.click();

    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (file) onLoadImport(file);
        // Allow re-import of the same file
        e.target.value = "";
    }

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
                    <button id="save_settings" className="btn btn-outline-success" onClick={onSaveExport}>Save</button>
                    <button id="load_settings" className="btn btn-outline-danger" onClick={triggerImport}>Load</button>
                    <input type="file" accept="application/json" className="d-none" ref={fileRef} onChange={handleFile} />
                </div>
            </div>
        </>
    );
}

export default SaveOrLoadSettings;