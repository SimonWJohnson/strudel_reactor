function Volume({inputText, volume}) {

    // outputputText set as default song used
    let outputText = inputText
    // use Volume tags
    // replace all instances of {$VOLUME} with the numeric value parsed from the volume slider
    outputText = outputText.replaceAll("{$VOLUME}", volume)

    return outputText;
}

export default Volume;