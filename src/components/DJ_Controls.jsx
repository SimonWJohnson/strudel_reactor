import ReverbSlider from "./ReverbSlider";
import VolumeSlider from "./VolumeSlider";
import InstrumentSelection from "./InstrumentSelection";
import SaveOrLoadSettings from "./SaveOrLoadSettings";
import SetCPM from "./SetCPM";
import PlayButtons from "./PlayButtons";

{ /* https://getbootstrap.com/docs/5.3/components/list-group/ */ }


function DJ_Controls({ volume, onVolumeChange, onPlay, onStop }) {
    return (
        <>
            <div className="list-group">
                <li className="list-group-item list-group-item-info-text-center">
                <h1>DJ Controls</h1>
                </li>
                <li className="list-group-item list-group-item-action" aria-current="true">
                    <SetCPM/>
                </li>
                <br />
                <li className="list-group-item list-group-item-action" aria-current="true">
                    <VolumeSlider volumeChange={volume} onVolumeChange={onVolumeChange}/>
                </li>
                <br />
                <li className="list-group-item list-group-item-action" aria-current="true">
                    <ReverbSlider />
                </li>
                <br />
                <li className="list-group-item list-group-item-action" aria-current="true">
                    <InstrumentSelection />
                </li>
                <br />
                <li className="list-group-item list-group-item-action" aria-current="true">
                    <SaveOrLoadSettings />
                </li>
                <br />
                <li className="list-group-item list-group-item-action" aria-current="true">
                    <PlayButtons onPlay={onPlay} onStop={onStop} />
                </li>
                <br />
            </div>
        </>
  );
}

export default DJ_Controls;