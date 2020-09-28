/// <reference types="react" />
export declare const InputControl: <As extends "symbol" | "object" | import("react").FunctionComponent<any> | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "big" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "footer" | "form" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "keygen" | "label" | "legend" | "li" | "link" | "main" | "map" | "mark" | "menu" | "menuitem" | "meta" | "meter" | "nav" | "noindex" | "noscript" | "ol" | "optgroup" | "option" | "output" | "p" | "param" | "picture" | "pre" | "progress" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "script" | "section" | "select" | "small" | "source" | "span" | "strong" | "style" | "sub" | "summary" | "sup" | "table" | "tbody" | "td" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "track" | "u" | "ul" | "var" | "video" | "wbr" | "webview" | "svg" | "animate" | "animateMotion" | "animateTransform" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feDropShadow" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "mpath" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "stop" | "switch" | "text" | "textPath" | "tspan" | "use" | "view" | import("react").ComponentClass<any, any> | "template" | import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>, ControlProp extends import("react-hook-form").Control<Record<string, any>> = import("react-hook-form").Control<Record<string, any>>>({ name, rules, as: InnerComponent, onBlur, onChange, onChangeName, onBlurName, valueName, defaultValue, control, ...rest }: import("react-hook-form").Assign<{
    name: string;
    as: As;
    rules?: Partial<{
        required: string | boolean | {
            value: boolean;
            message: string;
        };
        min: string | number | {
            value: import("react").ReactText;
            message: string;
        };
        max: string | number | {
            value: import("react").ReactText;
            message: string;
        };
        maxLength: string | number | {
            value: import("react").ReactText;
            message: string;
        };
        minLength: string | number | {
            value: import("react").ReactText;
            message: string;
        };
        pattern: RegExp | {
            value: RegExp;
            message: string;
        };
        validate: import("react-hook-form").Validate | Record<string, import("react-hook-form").Validate>;
    }> | undefined;
    onChange?: import("react-hook-form").EventFunction | undefined;
    onBlur?: import("react-hook-form").EventFunction | undefined;
    mode?: "onBlur" | "onChange" | "onSubmit" | undefined;
    onChangeName?: string | undefined;
    onBlurName?: string | undefined;
    valueName?: string | undefined;
    defaultValue?: any;
    control?: ControlProp | undefined;
}, import("react-hook-form").AsProps<As>>) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
