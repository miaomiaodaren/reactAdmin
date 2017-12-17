import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Input, Button, Select, DatePicker, Cascader } from 'antd';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        console.info(props, 3333);
        this.state = {
            fields: {},
        }
    }

    //当搜索中的值发现变化的时候.把这个值赋值给this.state中,方便在回调的时候使用，用来记录当前最新的值
    setField(field, value) {
        const { fields } = this.state; 
        fields[field.key] = value;
        this.setState({ fields });    //在修改完成之后,还是需要使用setState;
    }

    //根据不同的type 返回不同的dom
    generateInputs(fields) {
        const components = [];
        this.needToEmptyStyleComponents = [];   //暂时不知，但是插入DOM后会调用
        let i = 0;
        for(const field of fields) {
            let items = [];
            if(field.items) {
                items = field.items();
            }
            let component = null;
            switch (field.type) {
                case 'input':
                default:
                    component = (<Input value={this.state.fields[field.key]}  onChange={e => this.setField(field, e.target.value)} />)
                    break;
                case 'select':
                    component = (<Select 
                        placeholder="请选择" 
                        value = {this.state.fields[field.key] === undefined ? (field.defaultValue && field.defaultValue.toString()) : this.state.fields[field.key]}
                        multiple = { field.multiple } style={{ width: '100%', }} onChange={(value) => {
                            field.onChange && field.onChange(value);
                            this.setField(field, value);
                        }}>
                        {items && items.map(({ mean, value }) => <Select.Option key={ value.toString() } value={ value.toString() }>{ mean }</Select.Option>)}
                    </Select>)
                    break;
            }
            components.push(<div key={i++} className="field">
                <div className="input">
                    <div className="title" style={{ width: field.labelWidth || 100 }}>{field.title}:</div>
                    <div style={{ width: field.width || 130 }} className="input">{component}</div>
                </div>
            </div>)
        }
        return components;
    }

    //重置 因为组件内的值已通过setField传给state。所以只需要清空state的值就可以达到重置的效果
    handleReset = () => {
        this.setState({
            fields: {}
        })
    }

    render() {
        return (
            <div className="searchbar">
                {this.generateInputs(this.props.fields)}
                <div className="buttonGroup">
                    <Button onClick={this.handleReset} className="reset" icon="reload">重置</Button>
                    <Button onClick={this.handleSubmit} className="search" icon="search">搜索</Button>
                </div>
            </div>
        )
    }
}