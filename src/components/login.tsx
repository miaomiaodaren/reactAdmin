import * as React from 'react';
import { Route } from 'react-router-dom';

export default class Login extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }
    render() {
        console.info(this.props, Route);
        return (
            <div>2222</div>
        )
    }
}