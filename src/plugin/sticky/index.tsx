import * as React from 'react';
import Sticky from './sticky'

export default class stickydemo extends React.Component<any, any> {
    render() {
        return (
            <div style={{height: 3000}}>
                <div style={{height: 2000}}>11</div>
                <Sticky>
                    <div style={{ width: 700, height: 20, backgroundColor: 'red'}}>
                        this is sticky
                    </div>
                </Sticky>
            </div>
        )
    }
}