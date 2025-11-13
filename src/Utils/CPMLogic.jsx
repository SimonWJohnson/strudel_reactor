
function applyCPM({inputText, cpm}) {
    // start from the curent song text
    let outputText = inputText;
    // replace all {$CPM} tags with the current value
    outputText = outputText.replaceAll("{$CPM}", cpm);
    // return the processed result
    return outputText;
}

export default applyCPM;