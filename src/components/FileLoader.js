import PropTypes from 'prop-types';
import * as styles from './FileLoader.module.css';

const FileLoader = ({ onChange }) => {
    const reader = new FileReader();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // On load
            reader.onload = (loadEvent) => {
                onChange(loadEvent);
            };

            // Read the file
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <>
            <input
                className={styles.input}
                type="file"
                id="images"
                accept=""
                multiple
                onChange={handleFileChange}
            />
        </>
    );
};

export default FileLoader;

FileLoader.propTypes = {
    onChange: PropTypes.func.isRequired
};
