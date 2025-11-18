import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJ_Controls from './components/DJ_Controls';
import PlayButtons from './components/PlayButtons';
import ProcButtons from './components/ProcButtons';
import PreprocessTextArea from './components/PreprocessTextArea';
import SaveOrLoadSettings from './components/SaveOrLoadSettings';
import Volume from './Utils/VolumeLogic'; 
import Reverb from './Utils/ReverbLogic';
import applyCPM from './Utils/CPMLogic';
import InstrumentMute from './Utils/InstrumentLogic';
import MasterBuild from './Utils/MasterBuild';
import D3Graph from './components/D3Graph'


let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelDemo() {

    // Handlers
    const hasRun = useRef(false);

    // 'Play' button
    const handlePlay = async () => {
        // Error handling for when app 'crashes' after hot reload
        if (!globalEditor) return;

        const masterBuild = MasterBuild({ songText, volume, reverb, instrumentMute, cpm }); // added cpm
        globalEditor.setCode(masterBuild);
        globalEditor.evaluate();

        // Incorporate the pause button
        const ac = getAudioContext();
        if (state === "pause") {
            // resume audio without rebuilding/starting over
            await ac.resume();
            setState("play");
            return;
        }
        setState("play");
    }

    // 'Pause' Button
    const handlePause = async () => {
        if (!globalEditor) return;

        const ac = getAudioContext();
        if (state === "play") {
            // pause the audio graph
            await ac.suspend();
            setState("pause");
        }
        else if (state === "pause") {
            // resume audio without rebuilding/starting over
            await ac.resume();
            setState("play")
        }
    }; 

    // 'Stop' button
    const handleStop = () => {
        globalEditor.stop()
        setState("stop");
    }
    // setCpm
    const handleCPM = (newCpm) => {
        // Apply the CPM tag
        setCpm(newCpm);
        // Error handling for when app 'crashes' after hot reload
        if (!globalEditor) return;
        const masterBuild = MasterBuild({ songText, volume, reverb, instrumentMute, cpm: newCpm });
        globalEditor.setCode(masterBuild);
        if (state === "play") globalEditor.evaluate();
    }

    // Volume
    /*
     * Logic Flow
     * VolumeSLider calls onVolumeChange() on onMouseUp
     * the onVolumeChange prop is forwarded to DJ_Controls
     * In App.js, onVolumeChange is actually handleVolume():
     * updates the state
     * reapplies the Strudel code with the new {$VOLUME} while playing 
    */
    const handleVolume = (newVolume) => {
        setVolume(newVolume);
        // Debugging
        console.log("handleVolume called with: ", newVolume);
        if (!globalEditor) return;
        const masterBuild = MasterBuild({ songText, volume: newVolume, reverb, instrumentMute, cpm }); // add CPM**
        globalEditor.setCode(masterBuild);
        if (state === "play") globalEditor.evaluate();
    };

    // Reverb
    /*
     * Logic Flow
     * ReverbSlider calls onReverbChange() on onMouseUp
     * the onReverbChange prop is forwarded to DJ_Controls
     * In App.js, onReverbChange is actually handleReverb():
     * updates the state
     * reapplies the Strudel code with the new {$REVERB} while playing 
    */
    const handleReverb = (newReverb) => {
        // Debugging
        console.log("handleReverb: ", newReverb);

        setReverb(newReverb);
        if (!globalEditor) return;
        const masterBuild = MasterBuild({ songText, volume, reverb: newReverb, instrumentMute, cpm }); // add CPM **
        globalEditor.setCode(masterBuild);
        if (state === "play") globalEditor.evaluate();
    }
    /**
     * Logic flow
     * Updates the React state by storing a mute value for each instrument
     * Checks editor is initialised
     * calls MasterBuild to rebuild the song based on values passed in
     * the editors displayed code is updated
     * updated song / code is evaluated
     * 
     * @param {any} newMap
     * @returns
     */
    // Instrument Mute
    const handleInstrumentMute = (newMap) => {
        setInstrumentMute(newMap);
        if (!globalEditor) return;

        const masterBuild = MasterBuild({ songText, volume, reverb, instrumentMute: newMap, cpm }); 
        globalEditor.setCode(masterBuild);
        if (state === "play") globalEditor.evaluate();
    }

    // Save Settings - Save & Export in a single action, download json
    const handleSaveExport = () => {
        // create a setting object
        const settings = {
            _meta: { version: "1.0.0", savedAt: new Date().toISOString() },
            controls: { volume, reverb, instrumentMute, cpm }, 
        };

        // convert settings into a JSON file
        const blob = new Blob([JSON.stringify(settings, null, 2)], { type: "application/json" });
        // create a temp url for the file
        const url = URL.createObjectURL(blob);
        // create an <a> element to download the file
        const a = document.createElement("a");
        a.href = url;
        a.download = `strudel-settings-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
        // trigger the download
        document.body.appendChild(a);
        a.click();
        a.remove();
        // clean the temp file url
        URL.revokeObjectURL(url);
        //debugging
        console.log("Exported settings");
    };



    // Apply Settings helper function for Load/Import 
    const applySettings = (settingsJson) => {
        const { controls } = settingsJson || {};
        if (!controls) return;

        const { volume: vol, reverb: rev, instrumentMute: mute, cpm: cpm } = controls; 

        // update the UI state
        setVolume(vol);
        setReverb(rev);
        setInstrumentMute(mute);
        setCpm(cpm);

        // Update Strudel code 
        if (!globalEditor) return;
        const masterBuild = MasterBuild({ songText, volume: vol, reverb: rev, instrumentMute: mute, cpm: cpm }); 
        globalEditor.setCode(masterBuild);
        if (state === "play") globalEditor.evaluate();
    };

    // Load Settings (Load & Import in a single action)
    const handleLoadImport = async (file) => {
        try {
            const text = await file.text();
            const json = JSON.parse(text);

            // validation
            if (!json?.controls) {
                console.warn("Invalid settings file (missing controls)");
                return;
            }
            applySettings(json);
            console.log("Imported settings");
        }
        catch (e) {
            console.error("Failed to import settings: ", e);
        }
    };


    // States
    const [songText, setSongText] = useState(stranger_tune);

    const [state, setState] = useState("stop");
    // Volume
    const [volume, setVolume] = useState(1);
    // Reverb
    const [reverb, setReverb] = useState(0.4);
    // CPM
    const [cpm, setCpm] = useState(120);

    // Instrument Selection (Mute)
    const [instrumentMute, setInstrumentMute] = useState({
        bassline: false, // Bassline
        main_arp: false, // Main Arpeggiator
        drums: false, // Drums
    });

    // Slider value passed into this useEffect
    useEffect(() => {
        if (state === "play") {
            handlePlay();
        }
    }, [volume])

    // Debugging
    useEffect(() => {
        console.log("Volume state is now: ", volume);
    }, [volume]);

useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });

        document.getElementById('proc').value = songText

        globalEditor.setCode(songText)

    }

}, [songText]);


    return (
        <div>
            <h2 className="h1 m-0 dj-subtitle">Strudel Demo</h2>
            <main>
                <div className="container-fluid">
                    {/* ROW 1: Left = Preprocess + REPL, Right = DJ Controls */}
                    { /* D3 Graph display */}
                    <div className="row mt-3">
                        <div className="col-12">
                            <D3Graph />
                        </div>
                    </div>
                    <div className="row">
                        {/* LEFT COLUMN */}
                        <div className="col-md-8 d-flex flex-column">
                            {/* Preprocessing text area */}
                            <div
                            className="preprocess-wrapper">
                                <PreprocessTextArea
                                    defaultValue={songText}
                                    onChange={(e) => setSongText(e.target.value)}
                                />
                            </div>
                            {/* REPL */}
                            <div className="mt-3" style={{ maxHeight: "50vh", overflowY: "auto" }}>
                                <div id="editor" />
                                <div id="output" />
                            </div>
                        </div>
                        {/* RIGHT COLUMN – DJ Controls */}
                        <div className="col-md-4">
                            <DJ_Controls
                                volume={volume}
                                onVolumeChange={handleVolume}
                                reverb={reverb}
                                onReverbChange={handleReverb}
                                onPlay={handlePlay}
                                onPause={handlePause} 
                                onStop={handleStop}
                                instrumentMute={instrumentMute}
                                onInstrumentMuteChange={handleInstrumentMute}
                                onSaveExport={handleSaveExport}
                                onLoadImport={handleLoadImport}
                                cpm={cpm}                                onCpmChange={handleCPM}
                            />
                        </div>
                    </div>
                    {/* ROW 2: Piano roll */}
                    <div className="row mt-3">
                        <div className="col-12">
                            <canvas id="roll" className="roll-canvas"></canvas>
                        </div>
                    </div>
                </div>
            </main>
        </div>
);


}