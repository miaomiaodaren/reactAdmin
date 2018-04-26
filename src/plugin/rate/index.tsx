import * as React from 'react'
import { Icon } from 'antd'
import * as ProtType from 'prop-types'
import * as CssList from '../input/input.less'

export interface RateProps {
    count?: number
}

export default class Rate extends React.Component<any, any> {
    static propTypes = {
        count: ProtType.number
    }
    static defaultProps = {
        count: 5
    }
    constructor(props: any) {
        super(props)
    }
    mouseMove() {
        
    }
    render() {
        const {count} = this.props;
        let rateArr = [];
        for(let i = 0; i < count; i ++) {
            rateArr.push(<li className="rate" onMouseMove={this.mouseMove.bind(this)}><Icon type="star-o" /></li>)
        }
        return (
            <div>
                <ul className={CssList.rate}>
                    {rateArr}
                </ul>
            </div>
        )
    }
} 