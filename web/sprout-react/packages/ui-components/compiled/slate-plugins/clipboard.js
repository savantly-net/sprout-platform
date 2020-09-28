import { __assign, __values } from "tslib";
var getCopiedText = function (textBlocks, startOffset, endOffset) {
    if (!textBlocks.length) {
        return undefined;
    }
    var excludingLastLineLength = textBlocks.slice(0, -1).join('').length + textBlocks.length - 1;
    return textBlocks.join('\n').slice(startOffset, excludingLastLineLength + endOffset);
};
export function ClipboardPlugin() {
    var clipboardPlugin = {
        onCopy: function (event, editor, next) {
            var clipEvent = event;
            clipEvent.preventDefault();
            var _a = editor.value, document = _a.document, selection = _a.selection;
            var startOffset = selection.start.offset, endOffset = selection.end.offset;
            var selectedBlocks = document
                .getLeafBlocksAtRange(selection)
                .toArray()
                .map(function (block) { return block.text; });
            var copiedText = getCopiedText(selectedBlocks, startOffset, endOffset);
            if (copiedText && clipEvent.clipboardData) {
                clipEvent.clipboardData.setData('Text', copiedText);
            }
            return true;
        },
        onPaste: function (event, editor, next) {
            var e_1, _a;
            var clipEvent = event;
            clipEvent.preventDefault();
            if (clipEvent.clipboardData) {
                var pastedValue = clipEvent.clipboardData.getData('Text');
                var lines = pastedValue.split('\n');
                if (lines.length) {
                    editor.insertText(lines[0]);
                    try {
                        for (var _b = __values(lines.slice(1)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var line = _c.value;
                            editor.splitBlock().insertText(line);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            }
            return true;
        },
    };
    return __assign(__assign({}, clipboardPlugin), { onCut: function (event, editor, next) {
            var clipEvent = event;
            clipboardPlugin.onCopy(clipEvent, editor, next);
            editor.deleteAtRange(editor.value.selection);
            return true;
        } });
}
//# sourceMappingURL=clipboard.js.map