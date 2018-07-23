import * as React from 'react';
import Sticky from './sticky'

export default class stickydemo extends React.Component<any, any> {
    render() {
        return (
            <div style={{height: 3000}}>
                <Sticky>
                    <div style={{marginTop: 1000, width: 700, height: 300, backgroundColor: 'red'}}>
                        this is sticky
                    </div>
                </Sticky>
            </div>
        )
    }
}