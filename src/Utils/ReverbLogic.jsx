
function Reverb({ inputText, reverb}) {
    let outputText = inputText;
    outputText = inputText;
    // replace all instances of {$REVERB} with the numeric value parsed from the reverb slider
    outputText = outputText.replaceAll( "{$REVERB}", reverb);
    return outputText;
}

export default Reverb;