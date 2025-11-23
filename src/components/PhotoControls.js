import PropTypes from 'prop-types';

const PhotoControls = ({ onExport, onSelect, isSelected, isDisabled, imageIndex }) => {
    return (
        <div>
            <button
                className="button"
                onClick={onExport}
            >
                Export<span> as PNG</span>
            </button>
            {onSelect ? (
                <label className="pixel-checkbox">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => onSelect(imageIndex, e.target.checked)}
                        disabled={isDisabled}
                    />
                    <span></span>
                </label>
            ) : null}
        </div>
    );
};

PhotoControls.propTypes = {
    onExport: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    isSelected: PropTypes.bool,
    isDisabled: PropTypes.bool,
    imageIndex: PropTypes.number
};

PhotoControls.defaultProps = {
    onSelect: null,
    isSelected: false,
    isDisabled: false,
    imageIndex: -1
};

export default PhotoControls;
