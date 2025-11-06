function Volume({inputText, volume}) {

    // outputputText set as default song used
    let outputText = inputText
    // use Volume tags
    outputText = outputText.replaceAll("{$VOLUME}", volume)

    return outputText;
}

export default Volume;