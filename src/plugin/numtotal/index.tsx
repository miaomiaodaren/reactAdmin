import * as React from 'react';
import {numAmation, animationFrame} from '../../util/util';
import * as PropTypes from 'prop-types';

interface NUMPROPS{
    count: number,
    time?: number
}

export default class NumAmation extends React.Component<any, any> {
    static proTypes = {
        count: PropTypes.number,
        time: PropTypes.number,
    }
    static defaultProps = {
        time: 5000,
    }
    private ct: any;
    private timestamp = 0;
    private starttime = 0;
    constructor(props: any) {
        super(props)
        this.state = {
            startNum: 0,
            showNum: 0
        }
    }
    componentDidMount() {
        animationFrame();
        this.ct = window.requestAnimationFrame(this.numCount)
    }
    
    //使用requestAnimationFrame时,fun1会带一个参数为这个频率的数字，可以用来做时间差
    numCount = (timestamp?: any) => {
        const {startNum, showNum} = this.state;
        const {count, time} = this.props;
        if(!this.starttime) {
            this.starttime = this.timestamp;
        }
        this.timestamp = timestamp;
        let endtimes = Math.round(startNum + ((count - showNum) * ((this.timestamp - this.starttime) / time)));
        if(endtimes >= count) {
            this.setState((preStart: any) => {
                return {showNum: count}
            }, () => {
                window.cancelAnimationFrame(this.ct);
                return false
            })
        } else {
            this.setState((preStart: any) => {
                return {showNum: endtimes}
            }, () => {
                console.info(showNum, 7777, timestamp, this.starttime);
                window.requestAnimationFrame(this.numCount);
            })
        }
    }

    shouldComponentUpdate(nextProps:any, nextState: any) {
        return true
    }

    componentWillUnmount() {
        this.ct = '';
        this.starttime = 0;
        this.timestamp = 0;
    }

    render() {
        return(
            <span>
                {this.state.showNum}
            </span>
        )
    }
}