import { Component } from 'react';
interface Props {
    className?: string;
    autoHide?: boolean;
    autoHideTimeout?: number;
    autoHideDuration?: number;
    autoHeightMax?: string;
    hideTracksWhenNotNeeded?: boolean;
    hideHorizontalTrack?: boolean;
    hideVerticalTrack?: boolean;
    scrollTop?: number;
    setScrollTop: (event: any) => void;
    autoHeightMin?: number | string;
    updateAfterMountMs?: number;
}
/**
 * Wraps component into <Scrollbars> component from `react-custom-scrollbars`
 */
export declare class CustomScrollbar extends Component<Props> {
    static defaultProps: Partial<Props>;
    private ref;
    constructor(props: Props);
    updateScroll(): void;
    componentDidMount(): void;
    updateAfterMount(): void;
    componentDidUpdate(): void;
    renderTrack: (track: 'track-vertical' | 'track-horizontal', hideTrack: boolean | undefined, passedProps: any) => JSX.Element;
    renderThumb: (thumb: 'thumb-horizontal' | 'thumb-vertical', passedProps: any) => JSX.Element;
    renderTrackHorizontal: (passedProps: any) => JSX.Element;
    renderTrackVertical: (passedProps: any) => JSX.Element;
    renderThumbHorizontal: (passedProps: any) => JSX.Element;
    renderThumbVertical: (passedProps: any) => JSX.Element;
    renderView: (passedProps: any) => JSX.Element;
    render(): JSX.Element;
}
export default CustomScrollbar;
