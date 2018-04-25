import * as React from 'react'
import * as ProtType from 'prop-types'
import Input from '../input/input'

import * as CssList from '../input/input.less'

export default class SwiperDemo extends React.Component<any, any> {
    sw: HTMLElement;       
    constructor(props: any) {
        super(props);
        this.state = {
            selectIndex: 1
        }
    }
    setSwiper = () => {
        if(this.sw) {
        }
    }
    GetLb = (edit: string) => {
        const { selectIndex } = this.state;
        let index, len = this.sw.children.length - 1;
        if(edit === 'pre') {
            index = selectIndex === 0 ? len : selectIndex - 1;
        } else if(edit === 'next') {
            index = selectIndex === len ? 0 : selectIndex + 1
        }
        this.setState({
            selectIndex: index
        }, () => {
            this.sw.style.transform = `translate3d(-${300 * selectIndex}px, 0px, 0px)`;
        })
    }
    componentDidMount() {
        this.setSwiper()
    }
    render() {
        let aacount: React.ReactChild[] = [], newSlide: any[] = [];
        const len = React.Children.count(this.props.children);
        React.Children.map(this.props.children, (item: React.ReactChild, index: number) => {
            if(typeof item === 'string') {return false}
            aacount.push(React.cloneElement(item, {
                style: {width: '300px', height: '150px', display: 'inline-block'},
                key: `${index}`
            }))
        })
        newSlide.push(<div key="33" ref={(node: HTMLElement) => this.sw = node} className={CssList.swiper_list}>{aacount}</div>)
        return (
            <div className={CssList.swiper_main}>
                <span className={CssList.swiper_pro} onClick={() => {this.GetLb('pre')}}>pro</span>
                {newSlide}
                <span className={CssList.swiper_next} onClick={() => {this.GetLb('next')}}>next</span>
            </div>
        )
    }
}