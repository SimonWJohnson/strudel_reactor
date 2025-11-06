function PreprocessTextArea({defaultValue, onChange }) {
  return (
      <>
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Drop the beats here son...</label>
          <textarea className="form-control" rows="15" defaultValue={defaultValue} onChange={onChange} id="proc" ></textarea>
      </>
  );
}

export default PreprocessTextArea;