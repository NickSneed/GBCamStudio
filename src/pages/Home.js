import { useState, useRef } from "react";

const palette = [
  { r: 255, g: 232, b: 207 },
  { r: 223, g: 144, b: 79 },
  { r: 175, g: 40, b: 32 },
  { r: 48, g: 24, b: 80 },
];

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
const getImgData = (saveData, ctx, photoIndex) => {
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
        imageData.data[y * w * 4 + X * 4 + 0] = palette[val]["r"];
        imageData.data[y * w * 4 + X * 4 + 1] = palette[val]["g"];
        imageData.data[y * w * 4 + X * 4 + 2] = palette[val]["b"];
        imageData.data[y * w * 4 + X * 4 + 3] = 0xff;
      }
    }
  }

  return imageData;
};

const Home = () => {
  const [fileBuffer, setFileBuffer] = useState(null);
  const canvasRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // On load
      reader.onload = (loadEvent) => {
        // The result is now an ArrayBuffer
        const saveData = new Uint8Array(loadEvent.target.result);

        const imageData = getImgData(saveData, ctx, 1);
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        ctx.putImageData(imageData, 0, 0);

        setFileBuffer(loadEvent.target.result);
      };

      // Read the file
      reader.readAsArrayBuffer(file);
    }
  };

  const home = (
    <>
      <input
        type="file"
        className="files"
        id="images"
        accept=""
        multiple
        onChange={handleFileChange}
      />
      <canvas ref={canvasRef}></canvas>
      {fileBuffer ? (
        <div>
          <p>File loaded as ArrayBuffer.</p>
          <p>Buffer size: {fileBuffer.byteLength} bytes</p>
        </div>
      ) : null}
    </>
  );
  return home;
};

export default Home;
