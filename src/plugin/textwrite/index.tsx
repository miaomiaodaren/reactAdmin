import * as React from 'react';
import WriteText from './write';
import  * as Login from './ff.jpg';

export default class Writedemo extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            textcon: [{type: 'text', conent: '大家好,<p style="color: #ff0000">我是喵喵大人!</p>', times: 100}, 
                {type: 'text', conent: '!人大喵<p>喵是我,好</p>家大', times: 100, wait: 1000},
                {type: 'wait', times: 2000},
                {type: 'text', conent: '今年9月以来，“倒闭潮”这个<词又重新出现在网贷行业中，退出、清盘、暴雷……一个又一个平台接连出事', times: 100},
                {type: 'delete', times: 200, length: 8},
                {type: 'image', conent: `<img style="display: block" src=${Login}>`}
            ]
        }
    }
    render() {
        const { textcon } = this.state; 
        console.info(Login, 88)
        return(
            <WriteText arrcon={textcon} />
        )
    }
}