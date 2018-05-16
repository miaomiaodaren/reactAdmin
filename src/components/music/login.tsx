import * as React from 'react';
import axios from 'axios';

export default class Music extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:3009/login/cellphone?phone=15268516980&password=fy5201314*').then((res: any) => {
            console.info(res);
        })
    }
    render() {
        return (
            <div>
                <input type="text" />
            </div>
        )
    }
}