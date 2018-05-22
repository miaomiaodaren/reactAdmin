import * as React from 'react';
import * as PropTypes from 'prop-types';

// https://github.com/xshua06/rmc-picker/blob/master/src/Picker.jsx#L218
export default class Pick extends React.Component<any, any> {
    static defaultProps = {
        prefixCls: 'rmc-picker',
        pure: true,
        disabled: false,
    }

    static propTypes = {
        prefixCls: PropTypes.string,
        disabled: PropTypes.bool,
        pure: PropTypes.bool
    }

    constructor(props: any) {
        super(props)
        this.state = {
            selectedValue: ''   //选中的值
        }
    }

    render() {
        const { children, prefixCls } = this.props;
        const { selectedValue } = this.state;
        return (
            <div>2222</div>
        )
    }
}