import * as React from 'react';
import TextWrite from './text';


export default class Textdemo extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <div>
                <TextWrite />
            </div>
        )
    }
}