function SetCPM({ cpm, onCpmChange }) {
    // number handling for cpm input
    //const handleChange = (e) => {
    //    //const n = e.target.valueAsNumber; // number or NaN
    //    //onCpmChange(Number.isFinite(n) ? n : 0); // keep state numeric
    //    // debugging
    //    console.log("CPM input ->", e.target.value, "parsed:", n);
    //};
    const handleChange = (e) => onCpmChange(e.target.valueAsNumber ?? 0);

    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">Set CPM</span>
                {/*<input type="text"*/}
                <input type="number" min="1" max="400" step="1"
                    className="form-control"
                    id="cpm_text-input"
                    //placeholder="120" // this needs adjusting
                    aria-label="cpm"
                    aria-describedby="cpm_label"
                    /*value={cpm}*/
                    value={Number.isFinite(cpm) ? cpm : ""}
                    /*onChange={(e) => onCpmChange(Number(e.target.value))} // controlled value*/
                    onChange={handleChange}
                />
            </div>
        </>
    );
}

export default SetCPM;