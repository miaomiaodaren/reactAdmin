import * as React from 'react';
import * as classList from 'classnames';

export default class Select extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            selVal: ['浙江', '杭州', '江干区'],
            isactive: false,
            iData: [
                [{label: '浙江', value: 'zhejiang'}, {label: '上海', value: 'shanghai'}, {label: '南京', value: 'nanjing'}, , {label: '北京', value: 'beijing'}],
                [{label: '杭州', value: 'hangzhou', pvalue: 'zhejiang'}, {label: '浦东', value: 'pudong', pvalue: 'shanghai'}]
            ]
        }
    }
    selFocus = () => {
        this.setState((preStart: any, props: any) => {
            return {isactive: true}
        })
    }

    setModel = () => {
        const { isactive, iData } = this.state;
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
                <div className="am-picker-col" key={`${items}${is}`}>
                    <div className="am-picker-col-mask" style={{"backgroundSize": "100% 102px"}}></div>
                    <div className='lists'>{con}</div>
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
        return (
            <div>
                <input onFocus={this.selFocus} defaultValue={selVal.join(' ')} />
                { this.setModel() }
            </div>
        )
    }
}