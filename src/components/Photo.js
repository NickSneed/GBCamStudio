import PropTypes from "prop-types";

function Photo(props) {
  return (
    <>
      <canvas ref={canvasRef}></canvas>
      {fileBuffer ? (
        <div>
          <p>File loaded as ArrayBuffer.</p>
          <p>Buffer size: {fileBuffer.byteLength} bytes</p>
        </div>
      ) : null}
    </>
  );
}

Photo.propTypes = {
  txt: PropTypes.string.isRequired,
};

export default Photo;
