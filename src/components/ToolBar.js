import PropTypes from 'prop-types';
import PaletteSelector from '../components/PaletteSelector.js';
import FileLoader from '../components/FileLoader.js';
import { parseSave } from 'gbcam-js';
import settingsIcon from '../assets/svgs/settings.svg';
import * as styles from './ToolBar.module.css';

const ToolBar = ({
    palette,
    setPalette,
    setSaveData,
    setFrame,
    setIsSettingsOpen,
    isSettingsOpen,
    frame
}) => {
    // Parses the save data
    const loadSave = (event) => {
        const saveData = parseSave(event.target.result);
        setSaveData(saveData);
        window.scrollTo(0, 0);
    };

    // Set the frame
    const loadFrame = (event) => {
        setFrame(event.target.result);
    };

    return (
        <>
            <div className={styles.toolbar}>
                <FileLoader
                    onChange={loadSave}
                    accept=".sav"
                />
                <FileLoader
                    onChange={loadFrame}
                    onRemove={() => setFrame(null)}
                    showRemove={frame ? true : false}
                    accept=".png"
                />
                <PaletteSelector
                    selectedPalette={palette}
                    onPaletteChange={setPalette}
                />
                <button
                    className={`${styles.settingsbutton} img-button`}
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                >
                    <img
                        src={settingsIcon}
                        alt="Settings"
                    />
                </button>
                <span className={styles.logo}>GBCam Studio</span>
            </div>
            <div className={styles.blur}></div>
        </>
    );
};

export default ToolBar;

ToolBar.propTypes = {
    palette: PropTypes.string.isRequired,
    setPalette: PropTypes.func.isRequired,
    setSaveData: PropTypes.func.isRequired,
    setFrame: PropTypes.func.isRequired,
    setScaleFactor: PropTypes.func.isRequired,
    setIsSettingsOpen: PropTypes.func.isRequired,
    isSettingsOpen: PropTypes.bool.isRequired,
    frame: PropTypes.object,
    scaleFactor: PropTypes.number.isRequired
};
