import * as React from 'react';
import * as classList from 'classnames';
import Pick from './pick';

export default class Select extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            selVal: ['浙江', '杭州', '江干区'],
            isactive: false,
            iData: [
                [{label: '浙江', value: 'zhejiang'}, {label: '上海', value: 'shanghai'}, {label: '南京', value: 'nanjing'}, , {label: '北京', value: 'beijing'}],
                [{label: '杭州', value: 'hangzhou', pvalue: 'zhejiang'}, {label: '浦东', value: 'pudong', pvalue: 'shanghai'}]
            ],
            transformVla: 0
        };
    }
    public classMethod: any = {}
    selFocus = () => {
        this.setState((preStart: any, props: any) => {
            return {isactive: true}
        })
    }
    touchStart = (event: any) => {
        const touch = event.targetTouches[0];
        this.classMethod =  {y: touch.pageY}
    }
    touchMove = (event: any) => {
        if(event.targetTouches.length > 1) return;
        const touch = event.targetTouches[0];
        // this.classMethod['endPos'] = {y: touch.pageY - this.classMethod.y};
        if(this.classMethod.endPos !== 0) {
            this.setState({
                transformVla: touch.pageY - this.classMethod.y
            })
        }
    }
    touchEnd = (e: any) => {
        
    }

    setModel = () => {
        const { isactive, iData, transformVla } = this.state;
        let componet: any = [];
        iData.map((items: any, is: number) => {
            let con: any[] = [];
            items.map((item: any, i: number) => {
                let childHtml = (
                    <div className='prolist' key={`prolist${item.value}`}>
                        {item.label}
                    </div>);
                con.push(childHtml)
            })
            componet.push(
                <div className="am-picker-col" key={`${items}${is}`} onTouchEnd={this.touchEnd} onTouchMove={this.touchMove} onTouchStart={this.touchStart}>
                    <div className="am-picker-col-mask" style={{"backgroundSize": "100% 102px"}}></div>
                    <div className='lists' style={{"transform": `translate3d(0px, ${transformVla}px, 0px)`}}>{con}</div>
                </div>
            )
        })
        const setHtml = (
            <div className="sel_model">
                <div className="sel_model_mask"></div>
                <div className="set_model_warp">
                    <div className="set_model_con">
                        <div className="set_model_con_head">
                            <div className="set_model_con_head1">取消</div>
                            <div className="set_model_con_head2">title</div>
                            <div className="set_model_con_head3">确定</div>
                        </div>
                        <div className="set_model_con_list">
                            {componet}
                        </div>
                    </div>
                </div>
            </div>
        )
        return isactive ? setHtml : null
    }

    render() {
        let { selVal, isactive } = this.state;
        let items: any[] = []; 
        for(let i = 0; i < 10; i++) {
            items.push({
                value: String(i),
                label: `0 ${i}`,
            })
        }
        return (
            <div>
                {/* <input onFocus={this.selFocus} defaultValue={selVal.join(' ')} />
                { this.setModel() } */}
                <Pick>{items}</Pick>
            </div>
        )
    }
}