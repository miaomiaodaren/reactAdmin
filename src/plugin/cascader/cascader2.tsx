import React, { Children } from 'react'
import styled from 'styled-components';
import  * as ReactDOM from 'react-dom';
import {arrayTreeFilter} from '../../util/util';
const ClickOutside = require('react-click-outside');

type item = {
    value: string,
    label: string,
    children?: string[],
    [index: string]: any
}

@ClickOutside
export default class Cascaders extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            select: [],
            isshow: false,
            selectValue: [],
            chagneValue: []         
        }
    }
    
    public Dom: any = []
    public index: number = 0
    public selectVal: any[] = []

    inputclick = () => {
        const {isshow} = this.state;
        if(!isshow) {
            this.setState({
                isshow: true
            })
        }
    }

    liclick = (value: string, item: any, index: number) => {
        const {selectValue} = this.state;
        this.selectVal = this.selectVal.slice(0, index);
        this.selectVal.push(value);
        this.setState({selectValue: this.selectVal})
    }

    handleClickOutside =() => {
        this.setState({isshow: false})
    }

    componentDidMount() {
        // const {options = []} = this.props;
        // this.creact(options, 0)
        // var aa = arrayTreeFilter(this.state.option, (o:any, level) => o[this.getFieldName('value')] === activeValue[level], { childrenKeyName: this.getFieldName('children') })
    }

    getFieldName = (name: any) => {
        let defaultFieldNames: any = { label: 'label', value: 'value', children: 'children' };
        // 防止只设置单个属性的名字
        return defaultFieldNames[name];
    }

    menus = () => {
        const {selectValue} = this.state;
        const {options = []} = this.props;
        console.info(selectValue, 6666);
        let result;
        if(selectValue.length == 0) {
            result = [options];
            return result
        } else {
            let option = arrayTreeFilter(options, (o:any, level) => o[this.getFieldName('value')] === selectValue[level], { childrenKeyName: this.getFieldName('children') });
            result = option.map((item:item) => item[this.getFieldName('children')]).filter((item: item) => !!item);
            result.unshift(options);
            console.info(result, 22222);
            return result
        }
    }

    render() {
        const {select, isshow, selectValue} = this.state;
        return(
            <Cas className="cascader">
                <input onFocus={this.inputclick} />
                <div>{selectValue.join('-')}</div>
                {isshow && this.menus().map((item: item, index: number) => {
                    return (<ul key={index}>
                        {item.map((items: item, Indexnum: number) => <li className={items.value === selectValue[index] ? 'active' : ''} key={items.label} onClick={() => this.liclick(items.value, items, index)}> {items.value}{index} </li>)}
                    </ul>)
                })}
            </Cas>
        )
    }
}

let Cas = styled.div`
    input{
        display: block;
    }
    ul{
        width: 160px !important;
        display: inline-block !important;
        background-color: #fff;
        border: 1px solid #ddd;
        li{
            width: 100% !important;
            height: 45px !important;
            line-height: 45px !important;
            display: block !important;
            margin-bottom: 0 !important;
            padding: 0 !important;
            border-bottom: 1px solid #ddd;
            &.active{
                background-color: #20a0ff;
                color: #fff;
            }
        }
    }
`