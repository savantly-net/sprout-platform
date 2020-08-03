import React, { Component } from 'react'
import DOMPurify from 'dompurify';

interface HtmlPanelProps {
    content: string | Node
}

export default class HtmlPanel extends Component<HtmlPanelProps> {
    // DOMPurify config
    config = { };
    // script tags from plugin markup
    scripts:Array<string> = [];

    // evaluates any script tag that was removed, after the markup has been added to the DOM
    componentDidMount(){
        console.log('scripts:');
        console.log(this.scripts);
        this.scripts.map(s => {
            eval(s);
        })
    }

    render() {
        const clean = DOMPurify.sanitize(this.props.content, this.config);
        DOMPurify.removed.forEach(r => {
            console.log('removed tag:');
            console.log(r.element);
            if(r.element.tagName == 'SCRIPT') {
                this.scripts.push(r.element['text']);
            }
        });
        console.log(DOMPurify.removed);
        console.log(clean);
        return (
            <div>
                { <div dangerouslySetInnerHTML={{ __html:  clean}} /> }
            </div>
        )
    }
}
