import * as React from 'react'
import { Icon } from 'antd'
import * as ProtType from 'prop-types'
import * as CssList from '../input/input.less'
import {throttle, hasClass} from '../../util/util'
import  * as classnames from 'classnames'

export interface RateProps {
    count?: number;
    value?: number;
    onChange?: () => void;
    texts?: any[];
    allowHalf?: boolean
}

export interface RateState {
    counts?: number,
}

export default class Rate extends React.Component<any, any> {
    static propTypes = {
        count: ProtType.number,
        value: ProtType.number,
        onChange: ProtType.func,
        texts: ProtType.array,
        allowHalf: ProtType.bool,
    }
    static defaultProps = {
        count: 5,
        texts: ['极差', '失望', '一般', '满意', '惊喜'],
        allowHalf: false
    }
    constructor(props: any) {
        super(props)
        this.state = {
            hoverIndex: -1,
            currerIndex: -1,
        }
    }
    mouseMove(e: any, index: number) {
        let target = e.target;
        if(hasClass(target.parentNode, 'allcount')) {
            if(hasClass(target.parentNode, CssList.allowHalf_left)) {
                index = index - 0.5;
            }
        }
        if(index === this.state.hoverIndex) return
        this.setState({
            hoverIndex: index
        })
    }

    mouseLeave = () => {
        this.setState ({
            hoverIndex: -1
        })
    }

    hanlClick = (e: any, i: number) => {
        const {onChange} = this.props;
        this.setState({
            currerIndex: i
        }, () => {
            onChange && onChange(this.state.currerIndex + 1)
        })
    }

    componentWillMount() {
        const {value, onChange} = this.props;
        value && this.setState({
            currerIndex: value - 1
        });
    }
    

    componentDidMount() {
        
    }

    shouldComponentUpdate(nextProps: RateProps, nextState: RateState) {
        return true
    }   

    render() {
        const { count, texts, allowHalf } = this.props;
        const { hoverIndex, currerIndex } = this.state;
        let rateArr = [], 
            cssLIst = (index: number) => classnames('Rate',{
                [CssList.is_active] : hoverIndex > -1 ? index <= hoverIndex : index <= currerIndex
            }),
            cssRightList = (index: number) => classnames('allcount', `${CssList.allowHalf_right}`, {
                [CssList.rightHalf] : !Number.isInteger(hoverIndex) && Math.ceil(hoverIndex) === index
            });
        for(let i = 0; i < count; i ++) {
            rateArr.push(
                <li key={i} className={cssLIst(i)} 
                    onMouseMove={throttle((e: any) => this.mouseMove.call(this, e, i), 500)}
                    onMouseLeave = {this.mouseLeave}
                    onClick = {(e: any) => this.hanlClick.call(this, e, i)}
                >
                    {allowHalf ? 
                        <div className={`${CssList.allowHalf}`}>
                            <div className={`allcount ${CssList.allowHalf_left}`}><Icon type="star" /></div>
                            <div className={cssRightList(i)}><Icon type="star" /></div> 
                        </div> 
                        : <Icon type="star" />
                    }
                </li>
            )
        }
        let RateText = texts && currerIndex > -1 ? (<span>{texts[currerIndex]}</span>) : '';
        return (
            <div>
                <ul className={CssList.rate}>
                    {rateArr} 
                    {RateText}
                    <br />
                    {hoverIndex}
                </ul>
            </div>
        )
    }
} 