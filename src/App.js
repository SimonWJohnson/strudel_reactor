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

        const masterBuild = MasterBuild({ songText, volume, reverb, instrumentMute });
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

       //const mBuild = masterBuild(); // uses current state
        // Apply the CPM change
        //console.log("cpm state = ", cpm)
        //let outputText = applyCPM({ inputText: songText, cpm })
        //const cps = (Number(cpm) || 120) / 60 / 4; // 4 bars/cycle
        //songText = outputText.replaceAll("{$CPM}", String(cps));
        // Apply the volume tags first
        //let outputText = Volume({ inputText: songText, volume: volume });
        // Then apply the reverb tags
        //outputText = Reverb({ inputText: outputText, reverb });
        // Then apply the instrument mute
        //outputText = InstrumentMute({ inputText: outputText, muteMap: instrumentMute });

        //// Safety: if a token slipped through (e.g. stray spaces), replace again
        //if (/\{\s*\$CPM\s*\}/.test(outputText)) {
        //    const cps = (Number(cpm) || 120) / 60 / 4;
        //    outputText = outputText.replace(/\{\s*\$CPM\s*\}/g, String(cps));
        //}

        // CPM Debugging
        //console.log("FINAL CODE >>>\n", outputText.slice(0, 200));
        //console.log("FIRST LINE:", outputText.split("\n")[0]);       // should be: setcps(0.5)
        //console.log("Has tag left?", outputText.includes("{$CPM}")); // should be: false
        //globalEditor.setCode(outputText);
        //globalEditor.evaluate();
        //globalEditor.setCode(outputText);
        //globalEditor.evaluate();
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
    }
    // setCpm
    const handleCPM = (newCpm) => {
        // Apply the CPM tag
        //setCpm(newCpm);
        // Error handling for when app 'crashes' after hot reload
        //if (!globalEditor) return;
        //const mBuild = masterBuild({ cpm: newCpm })
        //const outputText = applyCPM({ inputText: songText, cpm });
        //const outputText = applyCPM({ inputText: songText, cpm });
        //globalEditor.setCode(outputText);
        //console.log("first line:", mBuild.split("\n")[0]);            // should be setcps(...)
        //console.log("has {$CPM} left?", mBuild.includes("{$CPM}"));   // should be false
        //console.log("contains 'undefined'?", mBuild.includes("undefined"));
        //globalEditor.setCode(mBuild);
        //globalEditor.evaluate();
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
        const masterBuild = MasterBuild({ songText, volume: newVolume, reverb, instrumentMute }); // add CPM**
        globalEditor.setCode(masterBuild);
        globalEditor.evaluate();
        //const mBuild = masterBuild({ volume: newVolume });
        // Rebuild both tags so they stay in sync
        //let outputText = Volume({ inputText: songText, volume: newVolume });
        //outputText = Reverb({ inputText: outputText, reverb });
        //outputText = InstrumentMute({ inputText: outputText, muteMap: instrumentMute });

        //globalEditor.setCode(outputText);
        //globalEditor.setCode(mBuild);
        //globalEditor.evaluate();
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
        const masterBuild = MasterBuild({ songText, volume, reverb: newReverb, instrumentMute }); // add CPM **
        globalEditor.setCode(masterBuild);
        globalEditor.evaluate();
        // Rebuild both tags so they stay in sync
        //let outputText = Volume({ inputText: songText, volume});
        //outputText = Reverb({ inputText: outputText, reverb: newReverb });
        //outputText = InstrumentMute({ inputText: outputText, muteMap: instrumentMute });

        //globalEditor.setCode(outputText);
       //globalEditor.setCode(mBuild);
        //globalEditor.evaluate();
    }

    // Instrument Mute
    const handleInstrumentMute = (newMap) => {
        setInstrumentMute(newMap);
        if (!globalEditor) return;

        const masterBuild = MasterBuild({ songText, volume, reverb, instrumentMute: newMap }); // add CPM **
        globalEditor.setCode(masterBuild);
        globalEditor.evaluate();

        //let outputText = Volume({ inputText: songText, volume });
        //outputText = Reverb({ inputText: outputText, reverb: reverb });
        //outputText = InstrumentMute({ inputText: outputText, muteMap: newMap });

        //globalEditor.setCode(outputText);
        //globalEditor.evaluate(); // stacktrace
    }

    // Save Settings - Save & Export in a single action, download json
    const handleSaveExport = () => {
        const settings = {
            _meta: { version: "1.0.0", savedAt: new Date().toISOString() },
            controls: { volume, reverb, instrumentMute }, // ** Add CPM here later **
        };

        const blob = new Blob([JSON.stringify(settings, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `strudel-settings-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        console.log("Exported settings");
    };



    // Apply Settings helper function for Load/Import 
    const applySettings = (settingsJson) => {
        const { controls } = settingsJson || {};
        if (!controls) return;

        const { volume: vol, reverb: rev, instrumentMute: mute } = controls; // add CPM **

        // update the UI state
        setVolume(vol);
        setReverb(rev);
        setInstrumentMute(mute);
        // add CPM **

        // Update Strudel code 
        if (!globalEditor) return;
        const masterBuild = MasterBuild({ songText, volume: vol, reverb: rev, instrumentMute: mute }); // add CPM **
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
    //const [cpm, setCpm] = useState(120);

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
                    <div className="row">
                        {/* LEFT COLUMN */}
                        <div className="col-md-8 d-flex flex-column">
                            {/* Preprocessing text area */}
                            <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
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
                                //cpm={cpm}                                //onCpmChange={setCpm}                              /*onCpmChange={(val) => setCpm(val)} // pass the setter*/
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