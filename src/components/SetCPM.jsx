function SetCPM() {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">Set CPM</span>
                <input type="text" class="form-control" id="cpm_text-input" placeholder="120" aria-label="cpm" aria-describedby="cpm_label" />
            </div>
        </>
    );
}

export default SetCPM;