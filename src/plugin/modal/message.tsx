import * as React from 'react'
import Model from './modal';
import * as ReactDOM from 'react-dom'


type ConfigContent = React.ReactNode | string;
export type ConfigOption = {
    children?: ConfigContent
    duration?: number,      //秒娄 
    maxCount?: number,      //最多会在页面上显示几个，后面的会把头部的顶掉
    suc_btn?: () => void,
    error_btn ?: boolean,
    type?: "alert" | "info" | "config" | string,
    mask?: true,             //是否显示遮罩层
    position?: "top" | 'left' | 'right' | 'bottom' | 'center'
}


let status:boolean = false;
let first_div: HTMLElement;
let Options: ConfigOption = {};

function firstcreat() {
    if(status === false) {
        status = true;
        first_div = document.createElement('div');
        document.body.appendChild(first_div);
        first_div.className = 'f_message';
        document.body.style.setProperty('overflow', 'hidden');
    }
    return first_div
}

function notice(option:ConfigOption) {
    firstcreat();
    if(Options && Options.maxCount) {
        let childrens = first_div.children;
        if(childrens.length > Options.maxCount) {
            let firstNode = first_div.firstChild;
            first_div.removeChild(firstNode);
        }
    }
    const div = document.createElement('div');
    first_div.appendChild(div);
    div.className = `message ${option.position}`;
    const componet = React.createElement(Model, Object.assign({}, {...Options}, {...option},  {willUnmount: () => {
        ReactDOM.unmountComponentAtNode(div);
        first_div.removeChild(div);
    }}))
    ReactDOM.render(componet, div)
}

export default {
    info(content: ConfigContent, duration?: number, options?: object) {
        console.info(arguments.length, 'leng')
        let op: object;
        if(typeof duration === 'object' && arguments.length === 2) {
            op = {children: content, duration, type: 'info'}
        } else {
            op = {children: content, duration, type: 'info', ...options}
        }
        return notice(op); 
    },
    config(option: ConfigOption) {
        Options = {...option}
    },
    alert(options: any) {
        let op = {...options, children: options.content, type: 'alert', duration: 0}
        return notice(op); 
    }
}




// function notice(content: ConfigContent, duration?: number) {
//     const div = document.createElement('div');
//     document.body.appendChild(div);
//     div.className = Style.message;
//     document.body.style.setProperty('overflow', 'hidden');
//     const componet = React.createElement(Model, Object.assign({}, {children: content, duration}, {willUnmount: () => {
//         ReactDOM.unmountComponentAtNode(div);
//         document.body.removeChild(div);
//         document.body.style.removeProperty('overflow');
//     }}))
//     ReactDOM.render(componet, div)
// }