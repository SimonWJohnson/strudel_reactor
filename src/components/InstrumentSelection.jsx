function InstrumentSelection({ value = {}, onChange = () => { } }) {
    // helper function to toggle each instrument by key
    const keyToggle = (key) => {
        // Create a new object for the state change
        onChange({...value, [key]: !value[key]});
    }

    return (
        <>
            <div className="form-check">
                <input className="form-check-input"
                    type="checkbox"
                    value=""
                    id="bassline"
                    checked={!!value.bassline}
                    onChange={() => keyToggle("bassline")}
                />
                <label className="form-check-label" htmlFor="bassline">
                    Bassline
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input"
                    type="checkbox"
                    value=""
                    id="main_arp"
                    checked={!!value.main_arp}
                    onChange={() => keyToggle("main_arp") }
                />
                <label className="form-check-label" htmlFor="main_arp">
                    Main Arpeggiator
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input"
                    type="checkbox"
                    value=""
                    id="drums"
                    checked={!!value.drums}
                    onChange={() => keyToggle("drums") }
                />
                <label className="form-check-label" htmlFor="drums">
                    Drums
                </label>
            </div>
        </>
    );
}

export default InstrumentSelection;