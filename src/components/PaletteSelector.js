import { useState } from 'react';
import PropTypes from 'prop-types';
import palettes from '../assets/palettes.js';

const PaletteSelector = ({ selectedPalette, onPaletteChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (paletteId) => {
        onPaletteChange(paletteId);
        setIsOpen(false); // Close the selector after choosing a palette
    };

    return (
        <>
            <div>
                <button style={{ margin: '10px' }} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? 'Hide palettes' : 'Select palette'}
                </button>

                {isOpen && (
                    <div style={{ display: 'grid', 'grid-template-columns': 'auto auto auto auto', margin: '10px 5px', position: 'absolute', backgroundColor: 'rgba(0,0,0,0.9)' }}>
                        {Object.keys(palettes).map((paletteId) => {
                            const palette = palettes[paletteId];

                            return (
                                <label key={paletteId} style={{ display: 'block', margin: '5px', cursor: 'pointer' }}>
                                    <input type="radio" name="palette" value={paletteId} checked={selectedPalette === paletteId} onChange={(e) => handleSelect(e.target.value)} style={{ display: 'none' }} />
                                    <span
                                        style={{
                                            display: 'inline-flex',
                                            width: '40px',
                                            height: '16px',
                                            border: selectedPalette === paletteId ? '1px solid #5a0ae5ff' : '1px solid #ccc',
                                            marginRight: '5px',
                                            verticalAlign: 'middle',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {palette.map((c, index) => (
                                            <span
                                                key={index}
                                                style={{
                                                    width: '25%',
                                                    height: '100%',
                                                    backgroundColor: `rgb(${c.r},${c.g},${c.b})`
                                                }}
                                            ></span>
                                        ))}
                                    </span>
                                    {paletteId}
                                </label>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

PaletteSelector.propTypes = {
    selectedPalette: PropTypes.string.isRequired,
    onPaletteChange: PropTypes.func.isRequired
};

export default PaletteSelector;
