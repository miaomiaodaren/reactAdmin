import * as React from 'react'
import * as PropTypes from 'prop-types';
import * as classnames from 'classnames'
// import * as lessStyle from './input.less'
const lessStyle = require('./input.less')

export interface InputProps  {
    placeholder?: string;
    size?: 'large' | 'default' | 'small';
    defaultValue?: any
}

export default class Input extends React.Component<InputProps, any> {
    static defaultProps = {
        size: 'default'
    };
    static propTypes = {
        placeholder: PropTypes.string,
        defaultValue: PropTypes.any,
    };
    input: HTMLInputElement;                    //此处input 映射的是这个input的element

    constructor(props: InputProps) {
        super(props)
    }

    componentDidMount() {
    }

    //此处得知ref的值是可以是function。如下：
    render() {
        const {size , placeholder, defaultValue} = this.props;
        const classes = classnames(`${lessStyle[size]}`);
        return (
            <span className={classes}>
                <input placeholder={this.props.placeholder} defaultValue={defaultValue} ref={(node: HTMLInputElement) => this.input = node} />
            </span>
        )
    }
}
