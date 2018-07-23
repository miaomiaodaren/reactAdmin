import * as React from 'react';
import * as PropType from 'prop-types';
import styled from 'styled-components';
import {isString, isArray, escape, delHtmlTag} from '../../util/util';

const Write = styled.div`
    padding: 20px;
    font-size: 30px;
    @keyframes myfirst {
        from {opacity: 0;}
        to {opacity: 1;}
    }
    .writehtml{
        &:after{
            content: '|';
            color: #000;
            animation: myfirst 1s infinite;
            display: inline-block;
        }
    }
`

export default class WriteText extends React.Component<any, any> {
    static proptype = {
        times: PropType.number,
        arrcon: PropType.any.isRequired,
    }
    static defaultProps = {
        times: 300,
    }
    public textindex: number;
    constructor(props: any) {
        super(props)
        this.state = {
            text: [],
            indexs: 0,              //当前正在执行第几条
        }
        this.textindex = 0;
    }

    writeRender = () => {
        const {times, arrcon} = this.props;
        const {text, indexs} = this.state;
        if(isString(arrcon)) {
            const substring = arrcon.substr(text.length, 1);
            this.setState((preState: any) => (
                {text: preState.text.push(substring)}
            ))
        } else if(isArray(arrcon)) {
            this.selectTypes(arrcon[indexs])
        }
    }

    trimRex = (item: any) => {
        let arrindex = item['conent'].match(/(<[^>^<]*>)/g) || [];    //获取所有的html标签
        let arr: any[] = [];
        if(!arrindex.length) return arr;
        for(let i = 0; i < arrindex.length; i++) {
            let nb = item['conent'].match(arrindex[i]);
            arr.push({title: arrindex[i], len: arrindex[i].length, index: nb.index})
        }
        return arr
    }

    selectindex = (arr: any[], type: string) => {
        let result: any[] = [];
        arr.map((item: any) => {
            result.push(item[type])
        })
        return result
    }

    textRender = (item: any) => {
        if(this.textindex <= item['conent'].length) {
            let arr = this.trimRex(item);             //每次都会执行一次，后期有没有办法可以只用一次。
            let tabindex = this.selectindex(arr, 'index').indexOf(this.textindex);
            let substring: string;
            if(tabindex == -1) {
                substring = item['conent'].substr((this.textindex)++, 1);
            } else {
                substring = item['conent'].substr((this.textindex)++, this.selectindex(arr, 'len')[tabindex]);
                this.textindex = this.textindex + this.selectindex(arr, 'len')[tabindex] - 1;       //在截取完之后再进行加值,否则会出现截取错误
            }
            this.setState((preState: any) => (
                {text: preState['text'].concat(substring)}
            ))
        } else {
            const conlen = this.props.arrcon.length;
            this.indexsadd();
        }
    }

    indexsadd = () => {
        this.textindex = 0;
        this.setState((preState: any) => (
            {indexs: preState.indexs + 1}
        ))
    }

    indexdown = (item: any) => {
        if(this.textindex < item.length) {
            this.textindex++;
            this.setState((preState: any) => (
                {text: preState['text'].slice(0, preState['text'].length -1)}
            ))
        } else {
            this.indexsadd();
        }
    }

    showimage = (item: any) => {
        this.setState((preState: any) => (
            {text: preState['text'].concat(item.conent), indexs: preState.indexs + 1}
        ))
    }

    selectTypes = (item: any) => {
        const {times, arrcon} = this.props;
        switch(item.type) {
            case 'text':
                if(item.wait && this.textindex == 0) {
                    setTimeout(() => {
                        setTimeout(()=>{this.textRender(item)}, item.times || times);
                    }, item.wait)
                } else {
                    setTimeout(()=>{this.textRender(item)}, item.times || times);
                }
                break
            case 'wait':
                setTimeout(() => {this.indexsadd()}, item.times);
                break
            case 'delete':
                setTimeout(() => { this.indexdown(item)}, item.times)
                break
            case 'image':
                this.showimage(item)
                break
            default:
                break
        }
    }

    showhtml = (data: any) => {
        var html = {__html: data};
        return <div className="writehtml" dangerouslySetInnerHTML={html} /> ;
    }

    componentDidUpdate() { 
        const {times, arrcon} = this.props;
        const {indexs} = this.state;
        arrcon.length > indexs ? this.selectTypes(arrcon[indexs]) : '';
    }

    componentDidMount() {
        this.writeRender()
    }

    componentWillUnmount() {
        this.textindex = null;
        this.setState = (state,callback) => {
            return;
        };
    }

    render() {
        const {text} = this.state;
        return(
            <Write>
                {this.showhtml(text.join(''))}
            </Write>
        )
    }
}