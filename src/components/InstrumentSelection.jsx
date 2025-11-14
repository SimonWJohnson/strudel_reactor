function InstrumentSelection() {
    return (
        <>
            <div class="form-check">
                <input className="form-check-input" type="checkbox" value="" id="inst1" />
                <label className="form-check-label" htmlFor="checkDefault">
                    Bassline
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="inst2" />
                <label className="form-check-label" htmlFor="checkChecked">
                    Main Arpeggiator
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="inst3" />
                <label className="form-check-label" htmlFor="checkChecked">
                    Drums
                </label>
            </div>
        </>
    );
}

export default InstrumentSelection;