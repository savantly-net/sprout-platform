import React from 'react';
interface ZoomPluginProps {
    onZoom: (range: {
        from: number;
        to: number;
    }) => void;
}
export declare const ZoomPlugin: React.FC<ZoomPluginProps>;
export {};
