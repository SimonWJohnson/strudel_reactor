function PlayButtons({ onPlay, onPause, onStop}) {
  return (
      <>
          <div className="mb-2 text-center">
              <h5 className="m-0 dj-title" style={{ fontWeight: "600", letterSpacing: "0.5px" }}>
                  Play Pause Stop
              </h5>
          </div>
          <div className="d-flex justify-content-center mt-3">
              <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                  <button id="play"
                      className="btn btn-success px-4 d-flex align-items-center gap-2"
                      onClick={onPlay}><i className="bi bi-play-fill"></i>
                  </button>
                  <button id="pause"
                      className="btn btn-warning px-4 d-flex align-items-center gap-2"
                      onClick={onPause}><i className="bi bi-pause-fill"></i>
                  </button>
                  <button id="stop"
                      className="btn btn-danger px-4 d-flex align-items-center gap-2"
                      onClick={onStop}><i className="bi bi-stop-fill"></i>
                  </button>
              </div>
          </div>
      </>
  );
}

export default PlayButtons;

