import chars from '../assets/character.js';

/**
 * Calculates the memory address for a specific tile within the save data.
 * Each tile is 16 bytes long.
 * @param {number} base The base address for the tile data.
 * @param {number} tileId The ID of the tile.
 * @returns {number} The calculated memory address for the tile.
 */
const getTileIndex = (base, tileId) => {
    return base + 16 * tileId;
};

/**
 * Extracts pixel data for a single photo from the save file and converts it into an ImageData object.
 * It reads the 2bpp tile data and maps it to the provided color palette.
 * @param {Uint8Array} saveData The raw save data for the Game Boy Camera.
 * @param {import('canvas').CanvasRenderingContext2D} ctx The 2D rendering context, used to create ImageData.
 * @param {number} photoIndex The index of the photo to extract (0-29).
 * @param {Array<{r: number, g: number, b: number}>} palette The color palette to apply to the image.
 * @returns {ImageData} An ImageData object representing the photo.
 */
const getImgData = (saveData, ctx, photoIndex, palette) => {
    // First photo at 0x2000, 0x1000 per photo
    const offset = 0x2000 + photoIndex * 0x1000;
    let x, y, i, p, X;
    const w = 128;
    const h = 112;
    const wTiles = w >> 3;
    const hTiles = h >> 3;
    const imageData = ctx.createImageData(w, h);
    let val;
    let tdata;

    for (y = 0; y < hTiles * 8; y++) {
        for (x = 0; x < wTiles; x++) {
            tdata = getTileIndex(offset + 0, (y >> 3) * 0x10 + x);

            for (i = 0; i < 8; i++) {
                p = tdata + (y & 7) * 2;

                val = 0;
                if ((saveData[p] & (0x80 >> i)) != 0) {
                    val += 1;
                }
                if ((saveData[p + 1] & (0x80 >> i)) != 0) {
                    val += 2;
                }

                X = x * 8 + i;
                imageData.data[y * w * 4 + X * 4 + 0] = palette[val]['r'];
                imageData.data[y * w * 4 + X * 4 + 1] = palette[val]['g'];
                imageData.data[y * w * 4 + X * 4 + 2] = palette[val]['b'];
                imageData.data[y * w * 4 + X * 4 + 3] = 0xff;
            }
        }
    }

    return imageData;
};

/**
 * Checks if the photo at the given index is marked as deleted in the save file.
 * @param {Uint8Array} saveData The raw save data.
 * @param {number} photoIndex The index of the photo to check.
 * @returns {boolean} True if the photo is deleted, false otherwise.
 */
const getIsDeleted = (saveData, photoIndex) => {
    return saveData[0x011d7 + photoIndex] === 255;
};

/**
 * Converts a Game Boy Camera character code to its corresponding ASCII character.
 * It uses a lookup table for the conversion.
 * @param {number} code The character code from the save file.
 * @returns {string} The corresponding ASCII character, or an empty string if not found.
 */
const gbcCharToAscii = (code) => {
    // 0x56 = A to 0xC8 = @
    // 'A' to 'Z', '0' to '9', etc.
    if (code >= 0x56 && code <= 0xc8) {
        return chars[code - 0x56];
    }

    // Add more mappings as needed
    return '';
};

/**
 * Reads a section of the save data, converts the character codes to ASCII, and returns the resulting string.
 * It iterates over a given address range.
 * @param {Uint8Array} saveData The raw save data.
 * @param {number} start The starting address of the section.
 * @param {number} end The ending address of the section.
 * @param {number} [offset=0] An optional offset to add to the start and end addresses.
 * @returns {string} The decoded string from the specified section.
 */
const convertSection = (saveData, start, end, offset = 0) => {
    let str = '';

    for (let addr = start + offset; addr <= end + offset; addr++) {
        str = saveData[addr] ? str + gbcCharToAscii(saveData[addr]) : str;
    }

    return str;
};

/**
 * Extracts the comment for a specific photo from the save file.
 * @param {Uint8Array} saveData The raw save data.
 * @param {number} photoIndex The index of the photo.
 * @returns {string} The photo's comment.
 */
const getComment = (saveData, photoIndex) => {
    return convertSection(saveData, 0x02f15, 0x02f2f, 0x01000 * photoIndex);
};

/**
 * Extracts the owner's username from the save file.
 * @param {Uint8Array} saveData The raw save data.
 * @returns {string} The owner's username.
 */
const getUsername = (saveData) => {
    return convertSection(saveData, 0x02f04, 0x02f0c);
};

/**
 * Extracts the owner's gender from the save file.
 * @param {Uint8Array} saveData The raw save data.
 * @returns {'male' | 'female'} The owner's gender.
 */
const getGender = (saveData) => {
    return saveData[0x02f0d] === 0x01 ? 'male' : 'female';
};

/**
 * Extracts the frame ID used for a specific photo from the save file.
 * The value in the save data is 0-indexed, so 1 is added to match the frame filenames (e.g., frame1.png).
 * @param {Uint8Array} saveData The raw save data.
 * @param {number} photoIndex The index of the photo.
 * @returns {number} The frame ID (1-based).
 */
const getFrameId = (saveData, photoIndex) => {
    const frameId = saveData[0x02f54 + 0x01000 * photoIndex] + 1;
    return frameId + '';
};

export { getImgData, getComment, getUsername, getIsDeleted, getGender, getFrameId };
