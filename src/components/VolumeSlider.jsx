
function VolumeSlider({ volume, onVolumeChange }) {
    // Debugging logic
    const handleMouseUp = (e) => {
        const value = parseFloat(e.target.value);
        console.log("VolumeSlider: ", value);
        onVolumeChange(value); 
    }


    return (
        <>
            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="2" step="0.01" onMouseUp={handleMouseUp} id="volume_range" />
        </>
    );
}

export default VolumeSlider;