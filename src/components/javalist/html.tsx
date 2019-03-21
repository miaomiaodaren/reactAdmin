import * as React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';

export default class Htmler extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }
    // static propTypes = {
    //     title: propsType.any
    // }
    // static defaultProps = {
    //     title: '1'
    // }

    render() {
        return (
            <Htmlstyle id="html">
                <h1>{this.props.title}</h1>
            </Htmlstyle>
        )
    }
}

const Htmlstyle = styled.div`
    h1{
        font-size: 24px;
        line-height: 40px;
        display: block;
    }
`