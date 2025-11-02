function InstrumentSelection() {
    return (
        <>
            <div class="form-check">
                <input className="form-check-input" type="checkbox" value="" id="inst1" />
                <label className="form-check-label" htmlFor="checkDefault">
                    Instrument 1
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="inst2" />
                <label className="form-check-label" htmlFor="checkChecked">
                    Instrument 2
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="inst3" />
                <label className="form-check-label" htmlFor="checkChecked">
                    Instrument 3
                </label>
            </div>
        </>
    );
}

export default InstrumentSelection;