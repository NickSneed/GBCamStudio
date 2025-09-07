import PropTypes from 'prop-types';
import PaletteSelector from '../components/PaletteSelector.js';
import FileLoader from '../components/FileLoader.js';

const toolbarStyles = {
    background: '#272727ff',
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    width: '100%'
};

const ToolBar = ({ palette, setPalette, setSaveData }) => {
    return (
        <>
            <div style={toolbarStyles}>
                <FileLoader setSaveData={setSaveData} />
                <PaletteSelector selectedPalette={palette} onPaletteChange={setPalette} />
                <span style={{ float: 'right', margin: '20px' }}>GBCam Studio</span>
            </div>
        </>
    );
};

export default ToolBar;

ToolBar.propTypes = {
    palette: PropTypes.string.isRequired,
    setPalette: PropTypes.func.isRequired,
    setSaveData: PropTypes.func.isRequired
};
