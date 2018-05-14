import * as React from 'react'
import * as classnames from 'classnames'
import * as ProtType from 'prop-types'

import * as cssList from '../input/input.less'

export interface PROPS {
    type?: 'line' | 'circle';
    percent?: number
}

export default class progress extends React.Component<PROPS, any> {
    static propTypes = {
        type: ProtType.string,
        percent: ProtType.number
    }
    static defaultProps = {
        type: 'line',
        percent: 0
    }
    timer: any = void 0
    constructor(props: any) {
        super(props)
        this.state = {
            styleList: {width: `0%`, backgroundColor: '#ff0000'},
            dasharNum: 0
        }
    }

    handleChange = (v: string) => {
        console.info(v)
    }

    componentDidMount() {
        if(this.props.type === 'line') {
            this.timer = setTimeout(() => {
                this.setState({
                    styleList: {width: `${this.props.percent}%`, backgroundColor: '#ff0000'},
                })
            }, 100);
        } else {
            let dasharray = 2 * Math.PI * 70;
            this.timer = setTimeout(() => {
                this.setState({
                    dasharNum: dasharray * (this.props.percent / 100)
                })
            }, 100);
        }
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        const {type, percent} = this.props;
        const {styleList} = this.state;
        let progress;
        if(type === 'line') {
            progress = (
                <div className={cssList.progress_line}>
                    <div className={cssList.progress_realline} style={styleList}></div>
                </div>
            )
        } else if(type === 'circle') {
            progress= (
                <svg width="640" height="480">
                    <circle stroke="#a89f9f" id="svg_1" r="70" cy="134" cx="154.5" strokeWidth="12" fill="none"/>
                    <circle style={{transition: 'stroke-dasharray .25s'}} fill="none" transform="rotate(360deg)" strokeDasharray={`${this.state.dasharNum} 440`} strokeWidth="12" cx="154.5" cy="134" r="70" id="svg_1" stroke="#ff0000"/>
                </svg>
            )
        }
        return (
            <div className="progress">
                {progress}{percent}%
            </div>
        )
    }
}