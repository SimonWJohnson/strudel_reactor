function PreprocessTextArea({defaultValue, onChange }) {
  return (
      <>
          <div className="dj-subtitle-zone">
              <label htmlFor="exampleFormControlTextarea1" className="h3 m-0 dj-subtitle">Drop the beats here son...</label>
          </div>          
          <textarea className="form-control" rows="15" defaultValue={defaultValue} onChange={onChange} id="proc" ></textarea>
      </>
  );
}

export default PreprocessTextArea;