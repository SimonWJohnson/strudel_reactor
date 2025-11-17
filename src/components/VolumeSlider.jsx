
function VolumeSlider({ volume, onVolumeChange }) {
    // Debugging logic
    const handleMouseUp = (e) => {
        const value = parseFloat(e.target.value);
        console.log("VolumeSlider: ", value);
        onVolumeChange(value); 
    }


    return (
        <>
            <div className="mb-2 text-center">
                <h5 className="m-0 dj-title" style={{ fontWeight: "600", letterSpacing: "0.5px" }}>
                    Volume
                </h5>
            </div>
            {/*<label htmlFor="volume_range" className="form-label">Volume</label>*/}
            <input type="range" className="form-range" min="0" max="2" step="0.01" onMouseUp={handleMouseUp} id="volume_range" />
        </>
    );
}

export default VolumeSlider;