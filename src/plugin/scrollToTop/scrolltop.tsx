import * as React from 'react';
import styled from 'styled-components';

const Scrollmain = styled.div`
    width: 100%;
    height: 3000px;
`

export default class ScrollToTop extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }
    componentDidMount() {
        document.addEventListener('scroll', () => {
            console.info(document.documentElement.scrollTop, 555);
        })
    }
    render() {
        return (
            <Scrollmain>
                11
            </Scrollmain>
        )
    }
}