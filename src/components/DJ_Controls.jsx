import ReverbSlider from "./ReverbSlider";
import VolumeSlider from "./VolumeSlider";
import InstrumentSelection from "./InstrumentSelection";
import SaveOrLoadSettings from "./SaveOrLoadSettings";
import SetCPM from "./SetCPM";
import PlayButtons from "./PlayButtons";

{ /* https://getbootstrap.com/docs/5.3/components/list-group/ */ }


function DJ_Controls({ volume, onVolumeChange, reverb, onReverbChange, onPlay, onStop }) {
    return (
        <>
            <div className="dj-panel list-group">
                {/* Header */ }
                <li className="list-group-item dj-list-item dj-header text-center">
                <h1 className="h1 m-0 dj-title">DJ Controls</h1>
                </li>
                {/* Set CPM */ }
                <li className="list-group-item dj-list-item" aria-current="true">
                    <SetCPM/>
                </li>
                <br />
                {/* Volume */}
                <li className="list-group-item dj-list-item" aria-current="true">
                    {/*<VolumeSlider volume={volume} onVolumeChange={onVolumeChange} />*/}
                    <VolumeSlider volume={volume} onVolumeChange={onVolumeChange} />
                </li>
                <br />
                {/* Reverb */}
                <li className="list-group-item dj-list-item" aria-current="true">
                    <ReverbSlider reverb={reverb} onReverbChange={onReverbChange} />
                </li>
                <br />
                {/* Instrument */}
                <li className="list-group-item dj-list-item" aria-current="true">
                    <InstrumentSelection />
                </li>
                <br />
                {/* Save / Load */}
                <li className="list-group-item dj-list-item" aria-current="true">
                    <SaveOrLoadSettings />
                </li>
                <br />
                {/* Play / Pause / Stop */}
                <li className="list-group-item dj-list-item" aria-current="true">
                    <PlayButtons onPlay={onPlay} onStop={onStop} />
                </li>
                <br />
            </div>
        </>
  );
}

export default DJ_Controls;