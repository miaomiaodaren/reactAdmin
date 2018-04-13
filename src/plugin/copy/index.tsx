import * as React from 'react'
import { findDOMNode } from 'react-dom'
// const ClipboardJS = require('clipboard') //复制文本到剪贴板功
import * as ClipboardJS from 'clipboard';

export class Copy extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
    }
    componentDidMount() {
        let btn = this.refs.copys;   
        let aa = findDOMNode(btn);
        let isCopy = new ClipboardJS(aa);
        isCopy.on('success', function(e: any) {
            alert(`成功了${e}`)
        });
        isCopy.on('error', function(e: any) {
            alert(`失败了${e}`)
        })
    }
    render() {
        return (
            <div>
                <button ref="copys" id="copy" className="btn" data-clipboard-text="Just because you can doesn't mean you should — clipboard.js">
                    Copy to clipboard
                </button>
            </div>
        )
    }
}
