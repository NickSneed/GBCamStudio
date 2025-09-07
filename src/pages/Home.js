import { useState } from 'react';
import Photo from '../components/Photo.js';
import FileLoader from '../components/FileLoader.js';
import PaletteSelector from '../components/PaletteSelector.js';

const Home = () => {
    const [fileBuffer, setFileBuffer] = useState(null);
    const [palette, setPalette] = useState('sgb2h');

    return (
        <>
            <FileLoader setFileBuffer={setFileBuffer} />
            <PaletteSelector selectedPalette={palette} onPaletteChange={setPalette} />
            <br />
            {Array.from({ length: 30 }, (_, i) => (
                <Photo key={i} data={fileBuffer} photoIndex={i} paletteId={palette} />
            ))}
        </>
    );
};

export default Home;
