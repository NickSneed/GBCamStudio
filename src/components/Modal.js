import PropTypes from 'prop-types';
import * as styles from './Modal.module.css';

const Modal = ({ isOpen, setIsSettingsOpen, title, children }) => {
    return (
        <>
            <div
                className={styles.modal}
                style={{ display: isOpen ? 'block' : 'none' }}
            >
                <button
                    className={styles.close}
                    onClick={() => setIsSettingsOpen(!isOpen)}
                >
                    X
                </button>
                <h2>{title}</h2>
                {children}
            </div>
        </>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsSettingsOpen: PropTypes.func.isRequired,
    children: PropTypes.node
};

export default Modal;
