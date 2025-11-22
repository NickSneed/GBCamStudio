import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Photo from '../components/Photo.js';
import * as styles from './EditModal.module.css';
import { applyEffect } from 'gbcam-js';

const EditModal = ({ editImage, palette, frame }) => {
    const [editedImage, setEditedImage] = useState(editImage);
    const [effect, setEffect] = useState('none');

    useEffect(() => {
        if (effect === 'none') {
            setEditedImage(editImage);
        }
    }, [editImage]);

    useEffect(() => {
        if (editedImage && effect && effect !== 'none') {
            let newPhotoData = editImage.photoData;
            newPhotoData = applyEffect(newPhotoData, effect);
            setEditedImage({
                ...editedImage,
                photoData: newPhotoData
            });
        }
    }, [effect]);

    return (
        <div className={styles.editWrapper}>
            Effect:
            <select
                className={styles.select}
                value={effect}
                onChange={(e) => setEffect(e.target.value)}
            >
                <option value="none">none</option>
                <option value="invert">invert</option>
                <option value="mirror-rtl">mirror-rtl</option>
                <option value="mirror-ltr">mirror-ltr</option>
                <option value="mirror-btt">mirror-btt</option>
                <option value="mirror-ttb">mirror-ttb</option>
                <option value="zoom">zoom</option>
                <option value="zoom-h">zoom-h</option>
                <option value="zoom-v">zoom-v</option>
                <option value="tile">tile</option>
            </select>
            <div className={styles.photo}>
                <Photo
                    image={editedImage}
                    paletteId={palette}
                    frame={frame}
                    scaleFactor={4}
                    isScale={true}
                />
            </div>
        </div>
    );
};

export default EditModal;

EditModal.propTypes = {
    editImage: PropTypes.object,
    palette: PropTypes.string,
    frame: PropTypes.object
};
