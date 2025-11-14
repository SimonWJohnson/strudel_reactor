
function applyCPM({inputText, cpm,}) {
    // start from the curent song text
    //let outputText = inputText;
    //// replace all {$CPM} tags with the current value
    //outputText = outputText.replaceAll("{$CPM}", cpm);
    //// return the processed result
    //return outputText;

    // convert CPM to CPS
    const cps = (Number(cpm) || 120) / 60 / 4;
    //const safe = Number.isFinite(cps) && cps > 0 ? cps : 0.5;

    //return inputText.replaceAll("{$CPM}", String(cps));
    return inputText.replace(/\{\s*\$CPM\s*\}/g, String(cps));
}

export default applyCPM;