function InstrumentMute({ inputText, muteMap}) {

    // Define the tags / map state keys
    const tagMap = {
        bassline: '$_BASSLINE',
        main_arp: '$_MAIN_ARP',
        drums: '$_DRUMS',
    };

    let outputText = inputText;

    for (const [key, tag] of Object.entries(tagMap)) {
        // allow spaces in tags
        const re = new RegExp(`\\{\\s*\\${tag}\\s*\\}`, 'g');
        const replacement = muteMap?.[key] ? '_' : '';
        outputText = outputText.replace(re, replacement);
    }

    return outputText;

    }


export default InstrumentMute;