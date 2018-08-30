import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ConfigOption} from './message'

export interface tsModel {
    duration?: number,
    suc_but_text?: string,
    err_but_text?: string,
    willUnmount?: () => void,
    suc_btn_callback?: Function,
    err_btn_callback?: Function,
}


export default class Modal extends React.Component<ConfigOption & tsModel, any> {
    constructor(props: tsModel) {
        super(props)
    }

    static propTypes = {
        duration: PropTypes.number,
        suc_but_text: PropTypes.string,
        error_btn: PropTypes.bool,
        suc_btn_callback: PropTypes.func,
        err_btn_callback: PropTypes.func
    }

    static defaultProps = {
        duration: 3,            //消失时间默认3秒，如果传入0，则永远不消失
        suc_but_text: '确定',
        error_btn: false,       //取消按钮，默认为不显示
        err_but_text: '取消',
        position: 'center'
    }

    componentDidMount() {
        const {duration, willUnmount} = this.props;
        if(duration !== 0) {
            setTimeout(willUnmount, duration * 1000);
        }
    }

    colse = () => {
        const {willUnmount} = this.props;
        willUnmount && willUnmount()
    }

    succlick = () => {
        const {suc_btn_callback} = this.props;
        suc_btn_callback && suc_btn_callback();
        this.colse();
    }

    errclick = () => {
        const {err_btn_callback} = this.props;
        err_btn_callback && err_btn_callback();
        this.colse()
    }

    alertBtn = () => {
        const {type, error_btn, suc_btn_callback, suc_but_text, err_but_text} = this.props;
        if(type !== 'alert') return '';
        let component = [];
        let com = (
            <div className="alert_btn">
                <div className="alert_success msg_button" onClick={this.succlick}>{suc_but_text}</div>
                <div className="alert_error msg_button" onClick={this.errclick}>{err_but_text}</div>
            </div>
        )
        return com
    }

    render() {
        const {type} = this.props;
        return (
            <React.Fragment>
                <div className="model_text">{this.props.children}</div>
                {this.alertBtn()}
            </React.Fragment>
        )
    }
}
