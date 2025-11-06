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
import Volume from './Utils/VolumeLogic'; 
import Reverb from './Utils/ReverbLogic';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelDemo() {

    // Handlers
    const hasRun = useRef(false);

    // 'Play' button
    const handlePlay = () => {
        // Error handling for when app 'crashes' after hot reload
        if (!globalEditor) return;
        let outputText = Volume({inputText: songText, volume: volume})
        //handleVolume();
        globalEditor.setCode(outputText);
        globalEditor.evaluate();
    }
    // 'Stop' button
    const handleStop = () => {
        globalEditor.stop()
    }
    // setCpm
    const handleCPM = () => {
        
    }
    // Volume
    // I wanted this logic to be it's own component...
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

        let outputText = Volume({ inputText: songText, volume: newVolume });
        globalEditor.setCode(outputText);
        globalEditor.evaluate();
    }
    // Reverb


    // instrument1

    // instrument2

    // instrument3

    // Save Settings

    // Load Settings


    // States
    //const [procText, setProcText] = useState(algorave_dave_tune)
    // Songtext useEffect state (get, set)
    const [songText, setSongText] = useState(stranger_tune);

    const [state, setState] = useState("stop");
    // Volume
    const [volume, setVolume] = useState(1);
    // Reverb
    const [reverb, setReverb] = useState(0.4);

    // 16:28
    // Slider value passed into this useEffect
    useEffect(() => {
        if (state === "play") {
            handlePlay();
            //handleVolume();
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
        //17:17
        document.getElementById('proc').value = songText

        //document.getElementById('proc').value = stranger_tune
        globalEditor.setCode(songText)
        //SetupButtons()
        //Proc()
    }
    //globalEditor.setCode(songText);
}, [songText]);


    return (
        <div>
            <h2>Strudel Demo</h2>
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
                                //onVolumeChange={(e) => setVolume(e.target.value)} // ** possible issue here **
                                onVolumeChange={handleVolume}
                                onPlay={handlePlay}
                                onStop={handleStop}
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