import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default class Modal extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    static propTypes = {
        duration: PropTypes.number
    }

    static defaultProps = {
        duration: 3,            //消失时间默认3秒，如果传入0，则永远不消失
    }

    componentDidMount() {
        const {duration, willUnmount} = this.props;
        if(parseInt(duration) !== 0) {
            setTimeout(willUnmount, duration * 1000);
        }
    }

    colse = () => {
        const {willUnmount} = this.props;
        willUnmount && willUnmount()
    }

    render() {
        console.info(this.props, 66);
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }
}
