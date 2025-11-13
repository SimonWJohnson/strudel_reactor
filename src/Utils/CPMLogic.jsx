
function applyCPM(inputText, cpmValue) {
    let outputText = inputText;
    outputText = inputText;
    outputText = outputText.replaceAll("{$CPM}", cpmValue);
    return outputText;
}

export default applyCPM;