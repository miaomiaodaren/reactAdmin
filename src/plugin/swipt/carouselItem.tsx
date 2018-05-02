import * as React from 'react';

export default class CarouseItem extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}