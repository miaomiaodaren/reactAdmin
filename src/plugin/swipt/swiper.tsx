import * as React from 'react'
import * as ProtType from 'prop-types'
import Input from '../input/input'
import classnames from 'classnames'

import * as CssList from '../input/input.less'

export default class SwiperDemo extends React.Component<any, any> {
    sw: HTMLElement;       
    constructor(props: any) {
        super(props);
        this.state = {
            selectIndex: 0
        }
    }
    setSwiper = () => {
        if(this.sw) {
        }
    }
    GetLb = (edit?: string) => {
        let timer;
        const { selectIndex } = this.state;
        let index = selectIndex, len = this.sw.children.length;
        if(edit === 'pre') {
            index = selectIndex === 0 ? len : selectIndex - 1;
        } else if(edit === 'next') {
            index = selectIndex === len ? 0 : selectIndex + 1
        }
        this.setState({
            selectIndex: index
        }, () => {
            if(this.state.selectIndex === len / 2) {
                this.sw.style.left = '0';
            } else {
                // this.sw.style.transform = `translate3d(-${300 * this.state.selectIndex}px, 0px, 0px)`;
                this.sw.style.left = `-${300 * this.state.selectIndex}px`
            }
        })
    }
    componentDidMount() {
        this.GetLb()
    }
    render() {
        let aacount: React.ReactChild[] = [], newSlide: any[] = [];
        let cache: React.ReactChild[] = [];
        const len = React.Children.count(this.props.children);
        React.Children.map(this.props.children, (item: React.ReactChild, index: number) => {
            if(typeof item === 'string') {return false}
            aacount.push(React.cloneElement(item, {
                style: {width: '300px', height: '150px', display: 'inline-block'},
                key: `${index}`,
                className: `${CssList.swiper_li}`
            }))
        })
        newSlide.push(<div key="33" ref={(node: HTMLElement) => this.sw = node} className={CssList.swiper_list}>{aacount}{aacount}</div>)
        return (
            <div className={CssList.swiper_main}>
                <span className={CssList.swiper_pro} onClick={() => {this.GetLb('pre')}}>pro</span>
                {newSlide}
                <span className={CssList.swiper_next} onClick={() => {this.GetLb('next')}}>next</span>
            </div>
        )
    }
}