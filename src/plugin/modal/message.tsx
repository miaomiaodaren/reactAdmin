import * as React from 'react'
import Model from './modal';
import * as ReactDOM from 'react-dom'
import Style from './message.less'


type ConfigContent = React.ReactNode | string;
type ConfigOption = {
    children?: ConfigContent
    duration?: number,      //秒娄 
    maxCount?: number,      //最多几个
    suc_btn?: () => void,
    error_btn ?: () => void,
    type?: string
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
    div.className = Style.message;
    const componet = React.createElement(Model, Object.assign({}, {...Options}, {...option},  {willUnmount: () => {
        ReactDOM.unmountComponentAtNode(div);
        first_div.removeChild(div);
    }}))
    ReactDOM.render(componet, div)
}

export default {
    info(content: ConfigContent, duration?: number) {
        let op = {children: content, duration, type: 'info'}
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