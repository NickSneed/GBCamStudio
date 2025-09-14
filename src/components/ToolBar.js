import PropTypes from 'prop-types';
import PaletteSelector from '../components/PaletteSelector.js';
import FileLoader from '../components/FileLoader.js';
import { parseSave } from 'gbcam-js';
import * as styles from './ToolBar.module.css';

const ToolBar = ({ palette, setPalette, setSaveData, setFrame, setScaleFactor }) => {
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
                <FileLoader onChange={loadSave} />
                <FileLoader onChange={loadFrame} />
                <PaletteSelector
                    selectedPalette={palette}
                    onPaletteChange={setPalette}
                />
                <select
                    className={styles.select}
                    onChange={(e) => setScaleFactor(e.target.value)}
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
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
    setScaleFactor: PropTypes.func.isRequired
};
