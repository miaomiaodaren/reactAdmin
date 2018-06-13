import * as React from 'react';
import styled from 'styled-components';

const Modal_main = styled.div`
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 999;
    h4{
        font-size: 50px;
        color: #000;
    }
`

export default class Modal extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    colse = () => {
        const {willUnmount} = this.props;
        willUnmount && willUnmount()
    }

    render() {
        return (
            <Modal_main>
                <h4 onClick={this.colse}>点击关闭</h4>
            </Modal_main>
        )
    }
}