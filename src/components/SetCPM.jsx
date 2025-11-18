function SetCPM({ cpm, onCpmChange }) {
    // number handling for cpm input
    const handleChange = (e) => onCpmChange(e.target.valueAsNumber ?? 0);

    return (
        <>
            <div className="mb-2 text-center">
                <h5 className="m-0 dj-title" style={{ fontWeight: "600", letterSpacing: "0.5px" }}>
                    Set CPM
                </h5>
            </div>
            <div className="input-group mb-3 dj-cpm-group">
                <input type="number" min="1" max="400" step="1"
                    className="form-control"
                    id="cpm_text-input"
                    aria-label="cpm"
                    aria-describedby="cpm_label"
                    value={Number.isFinite(cpm) ? cpm : ""}
                    onChange={handleChange}
                />
            </div>
        </>
    );
}

export default SetCPM;