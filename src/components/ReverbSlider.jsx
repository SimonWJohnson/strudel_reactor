function ReverbSlider({reverb, onReverbChange}) {
    // Debugging logic
    const handleMouseUp = (e) => {
        const value = parseFloat(e.target.value);
        console.log("ReverbSlider: ", value, "onReverbChange type: ", typeof onReverbChange);
        onReverbChange(value);
    };
    return (
        <>
            <label htmlFor="reverb_range" className="form-label">Reverb</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" defaultValue={reverb} onMouseUp={handleMouseUp} id="reverb_range" /> 
        </>
    );
}

export default ReverbSlider;