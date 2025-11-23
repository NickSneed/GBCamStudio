import { useCallback } from 'react';

export const usePhotoExporter = (saveCanvasRef) => {
    const handleExport = useCallback(async () => {
        const canvas = saveCanvasRef.current;
        if (!canvas) {
            console.error('Save canvas not ready for export.');
            return;
        }

        const blob = await canvas.convertToBlob({ type: 'image/png' });
        const link = document.createElement('a');
        link.download = `gb-photo-${Date.now()}.png`;
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
    }, [saveCanvasRef]);

    return { handleExport };
};
