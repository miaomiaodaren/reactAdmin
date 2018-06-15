import * as React from 'react';
import styled from 'styled-components';
import {debounce} from '../util/util';

const Topline = styled.div`
    width: 100%;
    height: 2px;
    background-color: #f7f7f7;
    position: fixed;
    top: 0;
    left: 0;
    &:after{
        content: '';
        height: 2px;
        background-color: #ff0000;
        position: absolute;
        top: 0;
        left: 0;
        width: ${props => props.datatype ? props.datatype : 0};
        transition: width .5s;
        z-index: 999
    } 
`

export default class Topsolid extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            sctop: 0,
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', debounce(() => {
            let offsetHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight); //文档高度
            let viewPortHeight = document.documentElement.clientHeight;      // 视口高度
            let sHeight = Math.max(offsetHeight- viewPortHeight, 0);
            let Percentage = sHeight ? document.documentElement.scrollTop / sHeight : 0;
            this.setState({
                sctop: `${(Percentage* 100).toFixed(2)}%`
            })
        }, 100, true))
    }

    render() {
        return (
            <Topline datatype={this.state.sctop}></Topline>
        )
    }
}