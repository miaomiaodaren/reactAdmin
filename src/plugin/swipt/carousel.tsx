import * as React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types'

export interface CarouseProps {
    height?: number;
    arrow?: string
}

export default class Carouse extends React.Component<CarouseProps, any> {
    static propTypes = {
        height: PropTypes.number,
        arrow: PropTypes.string,
    }
    static defaultProps = {
        arrow: 'click'
    }
    constructor(props: CarouseProps) {
        super(props)
    } 
    render() {
        const { height, arrow } = this.props;
        return (
            <div ref ="root" className = {'el-carousel'}>
                <div className="el-carousel__container" style={{height}}>
                    {this.props.children}
                </div>
                
            </div>
        )
    }
}