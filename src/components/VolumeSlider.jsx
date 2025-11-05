
function VolumeSlider() {
    return (
        <>
            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" onMouseUp={onvolumechange} id="volume_range" />
        </>
    );
}

export default VolumeSlider;