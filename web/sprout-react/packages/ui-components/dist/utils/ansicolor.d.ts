/// <reference types="react" />
/**
 * Represents an ANSI-escaped string.
 */
export default class Colors {
    spans: any[];
    static names: import("react").ReactText[];
    static rgb: {
        black: number[];
        darkGray: number[];
        lightGray: number[];
        white: number[];
        red: number[];
        lightRed: number[];
        green: number[];
        lightGreen: number[];
        yellow: number[];
        lightYellow: number[];
        blue: number[];
        lightBlue: number[];
        magenta: number[];
        lightMagenta: number[];
        cyan: number[];
        lightCyan: number[];
    };
    /**
     * @param {string} s a string containing ANSI escape codes.
     */
    constructor(s?: string);
    get str(): any;
    get parsed(): Colors & {
        spans: any[];
    };
    get asChromeConsoleLogArguments(): any[];
    get browserConsoleArguments(): any[];
    /**
     * @desc installs String prototype extensions
     * @example
     * require ('ansicolor').nice
     * console.log ('foo'.bright.red)
     */
    static get nice(): typeof Colors;
    /**
     * @desc parses a string containing ANSI escape codes
     * @return {Colors} parsed representation.
     */
    static parse(s: string): Colors & {
        spans: any[];
    };
    /**
     * @desc strips ANSI codes from a string
     * @param {string} s a string containing ANSI escape codes.
     * @return {string} clean string.
     */
    static strip(s: string): string;
    /**
     * @example
     * const spans = [...ansi.parse ('\u001b[7m\u001b[7mfoo\u001b[7mbar\u001b[27m')]
     */
    [Symbol.iterator](): IterableIterator<any>;
}
