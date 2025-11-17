function ReverbSlider({reverb, onReverbChange}) {
    // Debugging logic
    const handleMouseUp = (e) => {
        const value = parseFloat(e.target.value);
        console.log("ReverbSlider: ", value, "onReverbChange type: ", typeof onReverbChange);
        onReverbChange(value);
    };
    return (
        <>
            <div className="mb-2 text-center">
                <h5 className="m-0 dj-title" style={{ fontWeight: "600", letterSpacing: "0.5px" }}>
                    Reverb
                </h5>
            </div>
            {/*<label htmlFor="reverb_range" className="form-label">Reverb</label>*/}
            <input type="range" className="form-range" min="0" max="1" step="0.01" defaultValue={reverb} onMouseUp={handleMouseUp} id="reverb_range" /> 
        </>
    );
}

export default ReverbSlider;