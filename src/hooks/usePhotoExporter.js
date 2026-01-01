import { useCallback } from 'react';

const getFormattedUsername = (username) => {
    if (!username) {
        return '';
    }
    return '-' + username.toLowerCase().replace(/\s/g, '-');
};

export const usePhotoExporter = (saveCanvasRef, username, paletteId) => {
    const handleExport = useCallback(async () => {
        const canvas = saveCanvasRef.current;
        if (!canvas) {
            console.error('Save canvas not ready for export.');
            return;
        }

        const blob = await canvas.convertToBlob({ type: 'image/png' });
        const link = document.createElement('a');
        link.download = `gb-photo${getFormattedUsername(username)}-${paletteId}-${Date.now()}.png`;
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
    }, [saveCanvasRef, username, paletteId]);

    return { handleExport };
};
