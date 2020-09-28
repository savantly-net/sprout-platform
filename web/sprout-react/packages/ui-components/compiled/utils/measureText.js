var canvas = null;
var cache = {};
export function measureText(text, fontSize) {
    var fontStyle = fontSize + "px 'Roboto'";
    var cacheKey = text + fontStyle;
    var fromCache = cache[cacheKey];
    if (fromCache) {
        return fromCache;
    }
    if (canvas === null) {
        canvas = document.createElement('canvas');
    }
    var context = canvas.getContext('2d');
    if (!context) {
        throw new Error('Could not create context');
    }
    context.font = fontStyle;
    var metrics = context.measureText(text);
    cache[cacheKey] = metrics;
    return metrics;
}
export function calculateFontSize(text, width, height, lineHeight, maxSize) {
    // calculate width in 14px
    var textSize = measureText(text, 14);
    // how much bigger than 14px can we make it while staying within our width constraints
    var fontSizeBasedOnWidth = (width / (textSize.width + 2)) * 14;
    var fontSizeBasedOnHeight = height / lineHeight;
    // final fontSize
    var optimalSize = Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth);
    return Math.min(optimalSize, maxSize !== null && maxSize !== void 0 ? maxSize : optimalSize);
}
//# sourceMappingURL=measureText.js.map