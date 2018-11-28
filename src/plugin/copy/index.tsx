import * as React from 'react'
import { findDOMNode } from 'react-dom'
import ClipboardJS from 'clipboard';

class Copy extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
    }
    componentDidMount() {
        let btn = this.refs.copys;   
        let aa: Element | null | Text = findDOMNode(btn);
        let isCopy = new ClipboardJS(aa as Element);
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

export default Copy