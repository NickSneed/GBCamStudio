import { useState } from 'react';
import Photo from '../components/Photo.js';
import FileLoader from '../components/FileLoader.js';

const Home = () => {
    const [fileBuffer, setFileBuffer] = useState(null);
    const palette = 'sgb2h';

    return (
        <>
            <FileLoader setFileBuffer={setFileBuffer} />
            <br />
            {Array.from({ length: 30 }, (_, i) => (
                <Photo key={i} data={fileBuffer} photoIndex={i + 1} paletteId={palette} />
            ))}
        </>
    );
};

export default Home;
