import * as React from 'react';

export default function asyncComponent(importComponent: any) {
    class AsyncComponent extends React.Component<any, any> {
        constructor(props: any) {
            super(props)
            this.state = {
                com: null
            }
        }

        async componentDidMount() {
            const { default: com } = await importComponent();
            this.setState({com})
        }
        
        render() {
            const C = this.state.com;
            return C ? <C {...this.props} /> : null
        }
    }

    return AsyncComponent
}