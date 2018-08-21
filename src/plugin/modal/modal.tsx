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

    succlick = () => {
        const {suc_btn} = this.props;
        suc_btn && suc_btn();
        this.colse();
    }

    alertBtn = () => {
        const {type, error_btn, suc_btn} = this.props;
        if(type !== 'alert') return '';
        let component = [];
        let com = (
            <div className="alert_btn">
                {error_btn ? <div className="alert_error">取消</div> : ''}
                <div className="alert_success" onClick={this.succlick}>确定</div>
            </div>
        )
        return com
    }

    render() {
        console.info(this.props, 66);
        const {type} = this.props;
        return (
            <React.Fragment>
                {this.props.children}
                {this.alertBtn()}
            </React.Fragment>
        )
    }
}
