import * as React from 'react';
import styled from 'styled-components';
import ScrollToTop from './scrolltop'

const Scrollmain = styled.div`
    width: 100%;
    height: 3000px;
`

export default class Scrolldemo extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <Scrollmain>
                <ScrollToTop></ScrollToTop>
            </Scrollmain>
        )
    }
}