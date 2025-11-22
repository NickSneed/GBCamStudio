import PropTypes from 'prop-types';
import * as styles from './SettingsMenu.module.css';

const SettingsMenu = ({
    isShowDeleted,
    setIsShowDeleted,
    scaleFactor,
    setScaleFactor,
    color,
    setColor,
    isReversed,
    setIsReversed
}) => {
    return (
        <div className={styles.settings}>
            <label>
                Photo scale:{' '}
                <select
                    className="select"
                    value={scaleFactor}
                    onChange={(e) => setScaleFactor(Number(e.target.value))}
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
            </label>
            <label>
                UI color:{' '}
                <select
                    className="select"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                >
                    <option>red</option>
                    <option>green</option>
                    <option>yellow</option>
                    <option>blue</option>
                </select>
            </label>
            <label className="pixel-checkbox">
                <input
                    type="checkbox"
                    checked={isReversed}
                    onChange={(e) => setIsReversed(e.target.checked)}
                />
                <span></span>
                Reverse order
            </label>
            <label className="pixel-checkbox">
                <input
                    type="checkbox"
                    checked={isShowDeleted}
                    onChange={(e) => setIsShowDeleted(e.target.checked)}
                />
                <span></span>
                Show deleted
            </label>
        </div>
    );
};

export default SettingsMenu;

SettingsMenu.propTypes = {
    isShowDeleted: PropTypes.bool.isRequired,
    setIsShowDeleted: PropTypes.func.isRequired,
    scaleFactor: PropTypes.number.isRequired,
    setScaleFactor: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    setColor: PropTypes.func.isRequired,
    isReversed: PropTypes.bool.isRequired,
    setIsReversed: PropTypes.func.isRequired
};
