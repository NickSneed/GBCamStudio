import PropTypes from 'prop-types';
import * as styles from './Modal.module.css';
import closeIcon from '../assets/svgs/close.svg';

const Modal = ({ isOpen, setIsSettingsOpen, title, children }) => {
    return (
        <>
            <div
                className={styles.modal}
                style={{ display: isOpen ? 'block' : 'none' }}
            >
                <button
                    className={`${styles.close} img-button`}
                    onClick={() => setIsSettingsOpen(!isOpen)}
                >
                    <img src={closeIcon} />
                </button>
                <h2>{title}</h2>
                <div className={styles.modalscroll}>{children}</div>
            </div>
        </>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsSettingsOpen: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node
};

export default Modal;
