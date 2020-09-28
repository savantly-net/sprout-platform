import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { CodeEditorSuggestionProvider } from './types';
/**
 * @internal -- only exported for tests
 */
export declare function findInsertIndex(line: string): {
    index: number;
    prefix: string;
};
/**
 * @alpha
 */
export declare function registerSuggestions(language: string, getSuggestions: CodeEditorSuggestionProvider): monaco.IDisposable | undefined;
