
function Reverb({ inputText, reverb}) {
    let outputText = inputText;
    outputText = inputText;
    outputText = outputText.replaceAll( "{$REVERB}", reverb);
    return outputText;
}

export default Reverb;