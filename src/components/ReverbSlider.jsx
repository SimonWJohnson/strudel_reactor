function ReverbSlider() {
    return (
        <>
            <label htmlFor="reverb_range" className="form-label">Reverb</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="reverb_range" /> 
        </>
    );
}

export default ReverbSlider;