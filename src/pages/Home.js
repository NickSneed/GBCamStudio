import { useState } from 'react';
import Photo from '../components/Photo.js';
import ToolBar from '../components/ToolBar.js';

const Home = () => {
    const [saveData, setSaveData] = useState(null);
    const [palette, setPalette] = useState('sgb2h');

    return (
        <>
            {Array.from({ length: 30 }, (_, i) => (
                <Photo key={i} data={saveData} photoIndex={i} paletteId={palette} />
            ))}
            <ToolBar palette={palette} setPalette={setPalette} setSaveData={setSaveData} />
        </>
    );
};

export default Home;
