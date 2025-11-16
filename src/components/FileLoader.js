import { useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import * as styles from './FileLoader.module.css';

const FileLoader = forwardRef(({ onChange, onRemove, showRemove, accept }, ref) => {
    const reader = new FileReader();
    const internalRef = useRef(null);
    const inputRef = ref || internalRef;
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            reader.onload = (loadEvent) => {
                onChange(loadEvent);
            };

            reader.readAsArrayBuffer(file);
        }
    };

    const handleRemove = () => {
        if (onRemove) {
            onRemove();
        }
        if (inputRef.current) {
            inputRef.current.value = null;
        }
    };

    return (
        <div className={styles.inputwrapper}>
            <input
                ref={inputRef}
                className={`input ${styles.input}`}
                type="file"
                id="images"
                accept={accept}
                multiple
                onChange={handleFileChange}
            />
            <button
                className={`closeButton ${styles.remove}`}
                onClick={handleRemove}
                style={{ display: showRemove ? 'block' : 'none' }}
            >
                x
            </button>
        </div>
    );
});

export default FileLoader;

FileLoader.displayName = 'FileLoader';

FileLoader.propTypes = {
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func,
    showRemove: PropTypes.bool,
    accept: PropTypes.string
};

FileLoader.defaultProps = {
    onRemove: null,
    showRemove: false,
    accept: ''
};
