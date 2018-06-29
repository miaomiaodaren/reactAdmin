import * as React from 'react';
import styled from 'styled-components';
import {debounce, animationFrame} from '../../util/util';
import * as PropTypes from 'prop-types';
import {Icon} from 'antd';

const Scrstyle = styled.div`
    position: fixed;
    bottom: 50px;
    right: 50px;
    cursor: pointer;
    opacity: 0;
    transition: all .5s ease-in-out;
    .scrolltop{
        width: 40px;
        text-align: center;
        font-size: 14px;
    }
    &.active{
        opacity: 1;
    }
`

export default class ScrollToTop extends React.Component<any, any> {
    static propTypes = {
        visibilityHeight: PropTypes.number,
        onClick: PropTypes.func,
        step: PropTypes.number,
    }

    static defaultProps = {
        visibilityHeight: 400,
        step: 50,
    }

    public times: any;

    constructor(props: any) {
        super(props)
        this.state = {
            scraction: false
        }
    }
    componentDidMount() {
        animationFrame();
        const {visibilityHeight} = this.props;
        document.addEventListener('scroll', debounce(() => {
            const srctop = document.documentElement.scrollTop;
            const {scraction} = this.state;
            if((srctop >= visibilityHeight && !scraction) || (srctop < visibilityHeight) && scraction) {
                this.setState((preState: {scraction: boolean}) => {
                    return {scraction: srctop >= visibilityHeight ? true : false}
                })
            }
        }, 100, true))
    }

    setScrollTop = (value: number) => {
        document.body.scrollTop = value;
        document.documentElement.scrollTop = value;
        
    }

    goscrtop = () => {
        const frameFunc = () => {
            const scnumb: number = document.documentElement.scrollTop
            this.setScrollTop(scnumb - this.props.step);
            if(scnumb - this.props.step <= 0) {
                cancelAnimationFrame(this.times)
            } else {
                requestAnimationFrame(frameFunc)
            }
        }
        this.times = requestAnimationFrame(frameFunc)
    }

    render() {
        const {scraction} = this.state;
        const {children} = this.props;
        return (
            <Scrstyle className={`${scraction ? 'active' : ''}`} onClick={this.goscrtop}>
                {children ? this.props.children : <div className={`scrolltop`}>
                    <Icon type="arrow-up" style={{fontSize: 30, display: 'block'}}/>
                    <span>返回顶部</span>
                </div>}
            </Scrstyle>
        )
    }
}