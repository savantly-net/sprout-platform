import darkTheme from './dark';
import lightTheme from './light';
var themeMock;
export var getTheme = function (name) {
    return (themeMock && themeMock(name)) || (name === 'light' ? lightTheme : darkTheme);
};
export var mockTheme = function (mock) {
    themeMock = mock;
    return function () {
        themeMock = null;
    };
};
//# sourceMappingURL=getTheme.js.map