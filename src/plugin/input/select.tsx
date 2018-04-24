import * as React from 'react'
import * as PropTypes from 'prop-types';
import * as classnames from 'classnames'
const lessStyle = require('./input.less')

export interface SelectProps  {
    handleChange?: string;
    size?: 'large' | 'default' | 'small';
    defaultValue?: any
}

export default class Select extends React.Component<SelectProps, any> {
    static defaultProps = {
        size: 'default'
    };
    static propTypes = {
        placeholder: PropTypes.string,
        defaultValue: PropTypes.any,
    };
    

    constructor(props: SelectProps) {
        super(props)
    }

    componentDidMount() {
    }

    //此处得知ref的值是可以是function。如下：
    render() {
        const {size , placeholder, defaultValue} = this.props;
        return (
            <span>
                23123123
            </span>
        )
    }
}
