import React, { ReactElement, ReactHTMLElement, ReactFragment } from 'react';

export interface ICountDownProps {
    target: Date | number;
    format?: (time: number) => void;
    onEnd?: () => void;
    style?: React.CSSProperties;
}

function fixedZero(val: number) {
    return val * 1 < 10 ? `0${val}` : val;
}

class CountDown extends React.Component<ICountDownProps, {lastTime: number}>{
    constructor(props: ICountDownProps) {
        super(props)
        const {lastTime} = this.initTime(props)

        this.state = {
            lastTime
        }
    }

    componentDidMount() {
        this.tick()
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    interval: number = 1000;
    timer: any = 0;

    initTime = (props:ICountDownProps): {lastTime: number} => {
        let lastTime = 0;
        let tragetTime = 0;
        try {
            if(Object.prototype.toString.call(props.target) === '[object Date]') {
                tragetTime = (props.target as Date).getTime()
            } else {
                tragetTime = new Date(props.target).getTime()
            }
        } catch(e) {
            throw new Error('invalid target prop')
        }
        lastTime = tragetTime - new Date().getTime();
        return {
            lastTime: lastTime < 0 ? 0 : lastTime
        }
    }

    tick = () => {
        const {onEnd} = this.props;
        let  {lastTime} = this.state;
        this.timer = setTimeout(() => {
            if(lastTime < this.interval) {
                clearTimeout(this.timer);
                this.setState({lastTime: 0}, () => {
                    onEnd && onEnd()
                })
            } else {
                lastTime -= this.interval;
                this.setState({lastTime},() => {this.tick()})
            }
        }, this.interval)
    }

    defaultFormat = (time: number): any => {
        const hours = 60 * 60 * 1000;
        const minutes = 60 * 1000;
        const h = Math.floor(time / hours);
        const m = Math.floor((time - h * hours) / minutes);
        const s = Math.floor((time - h * hours - m * minutes) / 1000);
        return (
            <span>
                {fixedZero(h)}:{fixedZero(m)}:{fixedZero(s)}
            </span>
        )
    }

    render() {
        const { format = this.defaultFormat, onEnd, ...rest } = this.props;
        const { lastTime } = this.state;
        const result: any = format(lastTime);
        return (
            // <div className="aa">{result}</div>
            <React.Fragment>
                {result}
            </React.Fragment>
        )
    }
}

export default CountDown