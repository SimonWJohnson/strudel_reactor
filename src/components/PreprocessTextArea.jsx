import sunsetSynth from '../Assets/sunsetSynth.jpg';

function PreprocessTextArea({ defaultValue, onChange }) {
  return (
      <>
          <div className="dj-subtitle-zone">
              <label htmlFor="exampleFormControlTextarea1"
                  className="h3 m-0 dj-subtitle">
                  Drop the beats here son...
              </label>
          </div>          
          <textarea
              className="form-control dj-textarea"
              rows="15"
              defaultValue={defaultValue}
              onChange={onChange}
              id="proc"
              style={{ "--bg-url": `url(${sunsetSynth})` }}
          >
          </textarea>
      </>
  );
}

export default PreprocessTextArea;