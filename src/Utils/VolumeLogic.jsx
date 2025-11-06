function Volume({inputText, volume}) {

    //6:48
    //let outputText = inputText + "\n//Hello, this is a test";

    // delete this
    //outputText += '\n//all(x => x.gain(${volume}))'

    let outputText = inputText
    // use Volume tags
    outputText = outputText.replaceAll("{$VOLUME}", volume)

    // looks for all matches, i.e. all instruments
    //let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:\/])/gm;

    //let m;

    //let matches = []

    //while ((m = regex.exec(outputText)) !== null) {
    //    // This is necessary to avoid infinite loops with zero-width matches
    //    if (m.index === regex.lastIndex) {
    //        regex.lastIndex++;
    //    }
    //    // The result can be accessed through the 'm' variable
    //    m.forEach((match, groupIndex) => {
    //        console.log(`Found match, group ${groupIndex}: ${match}`);
    //        matches.push(match)
    //    });
    //}

    //// This regex looks specifically for 'gain' for each instrument, but not 'postgain'
    //// captureGroup == gain level, i.e. '1' etc.
    //// If instrument does not have 'gain', simply add it in tunes.js ** .gain(1)
    //let matches2 = matches.map(
    //    match => match.replaceAll(/(?<!post>)gain\(([\d.]+)\)/g, (match, captureGroup) =>
    //        `gain(${captureGroup}*${volume})`
    //    )
    //);

    //// Function to replace original gain with new gain value
    //let matches3 = matches.reduce(
    //    (text, original, i) => text.replaceAll(original, matches2[i]),
    //    outputText);

    //console.log(matches3);

    //return matches3;
    return outputText;
}

export default Volume;