import * as React from 'react';
import Modal from './modal';
import styled from 'styled-components';
import * as ReactDOM from 'react-dom';

export default class ModleDemo extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    butclick = () => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        document.body.style.setProperty('overflow', 'hidden');
        const componet = React.createElement(Modal, Object.assign({}, this.props, {willUnmount: () => {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
            document.body.style.removeProperty('overflow');
        }}))
        ReactDOM.render(componet, div)
    }

    render() {
        return(
            <div>
                <button onClick={this.butclick}>1312312312</button>
                {/* <Modal /> */}
            </div>
        )
    }
}