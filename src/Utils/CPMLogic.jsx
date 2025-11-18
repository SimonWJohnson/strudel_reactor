
function applyCPM({inputText, cpm,}) {

    // convert CPM to CPS
    const cps = (Number(cpm) || 120) / 60 / 4;

    // regex to allow spaces in user input
    return inputText.replace(/\{\s*\$CPM\s*\}/g, String(cps));
}

export default applyCPM;