import * as React from 'react';
// import { addClass } from '../../util/util.js'
import '../../style.less'

export interface Props extends React.Props<Home> {}
export interface State {}

export default class Home extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
    }
    componentDidMount() {
        console.info(this);
        const headeDOM = this.refs.index_head_span,
            indeDOM = this.refs.index_head;
            // wid = headeDOM.getBoundingClientRect().width;
            // indexwid = indeDom.getBoundingClientRect().width;
            
    }
    render() {
        return (
            <div className="aa" ref="index_head">
                <div className="index_head name_title" style={{fontSize: 14}}>
                    <span ref="index_head_span">热烈庆祝喵喵大人后台开业</span>
                </div>
                dajia11
            </div>
        )
    }
}