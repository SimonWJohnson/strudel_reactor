
function VolumeSlider({volume, onVolumeChange}) {
    return (
        <>
            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="2" step="0.01" onMouseUp={onVolumeChange} id="volume_range" />
        </>
    );
}

export default VolumeSlider;