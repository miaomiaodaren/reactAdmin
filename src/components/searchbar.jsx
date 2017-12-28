import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Input, Button, Select, DatePicker, Cascader, Modal, Form } from 'antd';
import PropTypes from 'prop-types'

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            showmodel: false
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

    //打开弹出窗口
    add = () => {
        let modeltype = this.props.rd || '';
        this.setState({
            showmodel: true
        })
    }

    handleOk = () => {
        this.setState({
            showmodel: false
        })
    }
    onColse =() => {
        this.setState({showmodel: false})
    }

    sub = (value) => {
        const { onOk } = this.props;
        onOk && onOk(value);
        this.setState({showmodel: false});
    }

    render() {
        return (
            <div className="searchbar">
                {this.generateInputs(this.props.fields)}
                <div className="buttonGroup">
                    <Button onClick={this.handleReset} className="reset" icon="reload">重置</Button>
                    <Button onClick={this.handleSubmit} className="search" icon="search">搜索</Button>
                    { this.props.hasadd ?  <Button onClick={ this.add } className="search" icon="user-add" >添加</Button> : '' }
                </div>
                <Modal
                    title={this.props.hasadd && this.props.hasadd.title}
                    visible={this.state.showmodel}
                    footer={null}
                >
                    <SearchForm views={this.props.hasadd.addfiles} showCancel={true} onColse={this.onColse} noBtn={false} okText='添加' addClick={this.sub} />
                </Modal>
            </div>
        )
    }
}

const FormItem = Form.Item;
//表单提交插件
export class Isform extends Component {
    constructor(props) {
        super(props)
    }

    FormInputs = (fields) => {
        let components = [];
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
                    component = (<Input />)
                    break;
                case 'password':
                    component = (<Input type="password" />)
                    break;
                case 'select':
                    component = (<Select 
                        placeholder="请选择" 
                        multiple = { field.multiple } style={{ width: '100%', }}>
                        {items && items.map(({ mean, value }) => <Select.Option key={ value.toString() } value={ value.toString() }>{ mean }</Select.Option>)}
                    </Select>)
                    break;
            }
            component = this.generateFormItem({ title: field.key, options: field.options || {}, component });
            components.push(<div key={i++} className="field">
                <div className="input">
                    <div className="title" style={{ width: field.labelWidth || 100, display: 'inline-block' }}>{field.title}:</div>
                    <div style={{ width: field.width || 330, display: 'inline-block' }} className="input">{component}</div>
                </div>
            </div>)
        }
        const buttons = (
            <FormItem wrapperCol={{ span: 14, offset: 6 }}>
                <div className="buttons">
                    {this.props.showCancel && <Button onClick={this.doCancel} >取消</Button>}
                    {!this.props.noBtn && <Button type="primary" htmlType="submit">{this.props.okText || '确定'}</Button>}
                </div>
            </FormItem>
        )
        components.push(buttons);
        return components;
    }

    generateFormItem = ({title, options, component}) => {
        const { getFieldDecorator } = this.props.form;
        return (
            <FormItem>
                {getFieldDecorator(title, options)(component)} 
            </FormItem>
        )
    }
    //取消按钮
    doCancel = () => {
        const { onColse } = this.props;
        onColse && onColse();
        this.props.form.resetFields();
    }
    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { addClick } = this.props;
                values.isAdmin = values.isAdmin == 0 ? true : false;
                addClick && addClick(values)
                this.props.form.resetFields();
            }
        })
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    { this.FormInputs(this.props.views) }
                </Form>
            </div>
        )
    }
}

export const SearchForm = Form.create()(Isform);

Isform.propTypes = {
  title: PropTypes.string,
  fields: PropTypes.arrayOf(Object),
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  okText: PropTypes.string,
}