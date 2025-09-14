import PropTypes from 'prop-types';

const FrameLoader = ({ setFrame }) => {
    const reader = new FileReader();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // On load
            reader.onload = (loadEvent) => {
                setFrame(loadEvent.target.result);
            };

            // Read the file
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <>
            <input type="file" className="files" id="images" accept="" multiple onChange={handleFileChange} />
        </>
    );
};

export default FrameLoader;

FrameLoader.propTypes = {
    setFrame: PropTypes.func.isRequired
};
