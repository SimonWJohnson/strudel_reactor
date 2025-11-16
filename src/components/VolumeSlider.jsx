import { useEffect, useState } from "react";
function VolumeSlider({ volume, onVolumeChange }) {
    // Debugging logic

    // local Ui value for slider 
    const [uiValue, setUiValue] = useState(volume);

    // keep the UI in sync if parent changes (load json)
    useEffect(() => {
        setUiValue(volume);
    }, [volume]);

    const handleMouseUp = (e) => {
        //const value = parseFloat(e.target.value);
        const uiValue = parseFloat(e.target.uiValue);
        //console.log("VolumeSlider: ", value);
        console.log("VolumeSlider: ", uiValue);
        //onVolumeChange(value); 
        onVolumeChange(uiValue); 
    }


    return (
        <>
            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input
                type="range"
                className="form-range"
                min="0" max="2" step="0.01"
                onMouseUp={handleMouseUp}
                id="volume_range"
                value={uiValue}
            />
        </>
    );
}

export default VolumeSlider;