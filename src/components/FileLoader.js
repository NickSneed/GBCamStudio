import PropTypes from 'prop-types';
import { styles } from '../assets/styles.js';
import { getData } from 'gbcam-tools';

const FileLoader = ({ setSaveData }) => {
    const reader = new FileReader();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // On load
            reader.onload = (loadEvent) => {
                const saveData = getData(new Uint8Array(loadEvent.target.result));
                console.log(saveData);
                setSaveData(saveData);
            };

            // Read the file
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <>
            <input style={styles.input} type="file" className="files" id="images" accept="" multiple onChange={handleFileChange} />
        </>
    );
};

export default FileLoader;

FileLoader.propTypes = {
    setSaveData: PropTypes.func.isRequired
};
