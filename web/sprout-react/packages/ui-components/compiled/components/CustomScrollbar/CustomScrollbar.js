import { __assign, __extends } from "tslib";
import React, { Component } from 'react';
import isNil from 'lodash/isNil';
import classNames from 'classnames';
import Scrollbars from 'react-custom-scrollbars';
/**
 * Wraps component into <Scrollbars> component from `react-custom-scrollbars`
 */
var CustomScrollbar = /** @class */ (function (_super) {
    __extends(CustomScrollbar, _super);
    function CustomScrollbar(props) {
        var _this = _super.call(this, props) || this;
        _this.renderTrack = function (track, hideTrack, passedProps) {
            if (passedProps.style && hideTrack) {
                passedProps.style.display = 'none';
            }
            return React.createElement("div", __assign({}, passedProps, { className: track }));
        };
        _this.renderThumb = function (thumb, passedProps) {
            return React.createElement("div", __assign({}, passedProps, { className: thumb }));
        };
        _this.renderTrackHorizontal = function (passedProps) {
            return _this.renderTrack('track-horizontal', _this.props.hideHorizontalTrack, passedProps);
        };
        _this.renderTrackVertical = function (passedProps) {
            return _this.renderTrack('track-vertical', _this.props.hideVerticalTrack, passedProps);
        };
        _this.renderThumbHorizontal = function (passedProps) {
            return _this.renderThumb('thumb-horizontal', passedProps);
        };
        _this.renderThumbVertical = function (passedProps) {
            return _this.renderThumb('thumb-vertical', passedProps);
        };
        _this.renderView = function (passedProps) {
            return React.createElement("div", __assign({}, passedProps, { className: "view" }));
        };
        _this.ref = React.createRef();
        return _this;
    }
    CustomScrollbar.prototype.updateScroll = function () {
        var ref = this.ref.current;
        var scrollTop = this.props.scrollTop;
        if (ref && !isNil(scrollTop)) {
            ref.scrollTop(scrollTop);
        }
    };
    CustomScrollbar.prototype.componentDidMount = function () {
        var _this = this;
        this.updateScroll();
        // this logic is to make scrollbar visible when content is added body after mount
        if (this.props.updateAfterMountMs) {
            setTimeout(function () { return _this.updateAfterMount(); }, this.props.updateAfterMountMs);
        }
    };
    CustomScrollbar.prototype.updateAfterMount = function () {
        if (this.ref && this.ref.current) {
            var scrollbar = this.ref.current;
            if (scrollbar.update) {
                scrollbar.update();
            }
        }
    };
    CustomScrollbar.prototype.componentDidUpdate = function () {
        this.updateScroll();
    };
    CustomScrollbar.prototype.render = function () {
        var _a = this.props, className = _a.className, children = _a.children, autoHeightMax = _a.autoHeightMax, autoHeightMin = _a.autoHeightMin, setScrollTop = _a.setScrollTop, autoHide = _a.autoHide, autoHideTimeout = _a.autoHideTimeout, hideTracksWhenNotNeeded = _a.hideTracksWhenNotNeeded;
        return (React.createElement(Scrollbars, { ref: this.ref, className: classNames('custom-scrollbar', className), onScroll: setScrollTop, autoHeight: true, autoHide: autoHide, autoHideTimeout: autoHideTimeout, hideTracksWhenNotNeeded: hideTracksWhenNotNeeded, 
            // These autoHeightMin & autoHeightMax options affect firefox and chrome differently.
            // Before these where set to inherit but that caused problems with cut of legends in firefox
            autoHeightMax: autoHeightMax, autoHeightMin: autoHeightMin, renderTrackHorizontal: this.renderTrackHorizontal, renderTrackVertical: this.renderTrackVertical, renderThumbHorizontal: this.renderThumbHorizontal, renderThumbVertical: this.renderThumbVertical, renderView: this.renderView }, children));
    };
    CustomScrollbar.defaultProps = {
        autoHide: false,
        autoHideTimeout: 200,
        autoHideDuration: 200,
        setScrollTop: function () { },
        hideTracksWhenNotNeeded: false,
        autoHeightMin: '0',
        autoHeightMax: '100%',
    };
    return CustomScrollbar;
}(Component));
export { CustomScrollbar };
export default CustomScrollbar;
//# sourceMappingURL=CustomScrollbar.js.map