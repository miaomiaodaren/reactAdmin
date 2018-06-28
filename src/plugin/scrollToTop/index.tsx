import * as React from 'react';
import styled from 'styled-components';
import ScrollToTop from './scrolltop'

export default class Scrolldemo extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <div>
                <ScrollToTop />
            </div>
        )
    }
}