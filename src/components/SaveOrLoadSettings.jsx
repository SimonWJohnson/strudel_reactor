function SaveOrLoadSettings() {
    return (
        <>
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

export default SaveOrLoadSettings;