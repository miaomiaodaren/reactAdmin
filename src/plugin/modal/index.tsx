import * as React from 'react';
import Message from './message';
import styled from 'styled-components';
import * as ReactDOM from 'react-dom';

export default class ModleDemo extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    componentDidMount() {
        //全局注册
        Message.config({
            duration: 5,
            maxCount: 3
        });
    }

    butclick = () => {
        Message.info('This is a normal message', 12);
    }



    render() {
        return(
            <div>
                <button onClick={this.butclick}>1312312312</button>
            </div>
        )
    }
}