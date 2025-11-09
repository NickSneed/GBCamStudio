import PropTypes from 'prop-types';
import * as styles from './SettingsMenu.module.css';

const SettingsMenu = ({ isShowDeleted, setIsShowDeleted, scaleFactor, setScaleFactor }) => {
    return (
        <div className={styles.settings}>
            <label>
                <input
                    type="checkbox"
                    checked={isShowDeleted}
                    onChange={(e) => setIsShowDeleted(e.target.checked)}
                />
                Show Deleted
            </label>
            <label>
                Scale:{' '}
                <select
                    className={styles.select}
                    value={scaleFactor}
                    onChange={(e) => setScaleFactor(Number(e.target.value))}
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
            </label>
        </div>
    );
};

export default SettingsMenu;

SettingsMenu.propTypes = {
    isShowDeleted: PropTypes.bool.isRequired,
    setIsShowDeleted: PropTypes.func.isRequired,
    scaleFactor: PropTypes.number.isRequired,
    setScaleFactor: PropTypes.func.isRequired
};
