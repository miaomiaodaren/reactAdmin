
import * as React from 'react';
import ReactDom from 'react-dom';
import { Input, Button, Select, DatePicker, Cascader, Modal, Form } from 'antd';
import PropTypes from 'prop-types'

interface searchInterface {
    fields?: any,
    showmodel?: boolean
}

export default class SearchBar extends React.Component<any, searchInterface> {
    constructor(props: any) {
        super(props);
        this.state = {
            fields: {},
            showmodel: false
        }
    }

    //当搜索中的值发现变化的时候.把这个值赋值给this.state中,方便在回调的时候使用，用来记录当前最新的值
    setField(field: any, value: any) {
        const { fields } = this.state; 
        fields[field.key] = value;
        this.setState({ fields });    //在修改完成之后,还是需要使用setState;
    }

    //根据不同的type 返回不同的dom
    generateInputs(fields: any) {
        const components = [];
        // this.needToEmptyStyleComponents = [];   //暂时不知，但是插入DOM后会调用
        let i = 0;
        for(const field of fields) {
            let items: any[] = [];
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
                        mode = { field.multiple } style={{ width: '100%', }} onChange={(value) => {
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
        });
        this.props.onOk && this.props.onOk({})
    }
    //提交搜索按钮事件
    handleSubmit = () => {
        let params: any = {};
        for(let n in this.state.fields) {
            params[n] = this.state.fields[n];
        }
        this.props.onOk && this.props.onOk(params)
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

const FormItem = Form.Item;
//表单提交插件

interface formInterface {
    editBtn?: any,
    form?: any,
    submitClick?: any,
    onColse?: any,
    fields?: any
}
export class Isform extends React.Component<formInterface, any> {
    constructor(props: any) {
        super(props)
    }
    //按钮样式循环
    FormButtions = (fields: any): any[] => {
        let compon: any[] = [];
        for(const field of fields) {
            compon.push(<Button type={field.type} key={field.name} htmlType={field.htmlType} onClick={field.onClick} style={{marginRight: 30}}>{field.name}</Button>)
        }
        return compon;
    }
    FormInputs = (fields: any): any[] => {
        let components: any[] = [];
        let i = 0;
        for(const field of fields) {
            let items: any[] = [];
            if(field.items) {
                items = field.items();
            }
            let component = null;
            switch (field.type) {
                case 'input':
                default:
                    component = (<Input disabled={field.disabled || false} type={field.ishide ? 'hidden' : 'text'} />)
                    break;
                case 'password':
                    component = (<Input type="password" />)
                    break;
                case 'select':
                    component = (<Select 
                        placeholder="请选择" 
                        mode = { field.multiple } style={{ width: '100%' }} >
                        {items && items.map(({ mean, value }) => <Select.Option key={ value.toString() } value={ value.toString() }>{ mean }</Select.Option>)}
                    </Select>)
                    break;
            }
            component = this.generateFormItem({ title: field.key, options: field.options || {}, component });
            components.push(<div key={i++} className="field">
                <div className="input">
                    <div className="title" style={{ width: field.labelWidth || 100, display: field.ishide ? 'none' : 'inline-block' }}>{field.title}:</div>
                    <div style={{ width: field.width || 330, display: field.ishide ? 'none' : 'inline-block' }} className="input">{component}</div>
                </div>
            </div>)
        }
        const buttons = (
            <FormItem key="control-buttons" wrapperCol={{ span: 14, offset: 6 }}>
                <div className="buttons">
                    {this.FormButtions(this.props.editBtn)}
                </div>
            </FormItem>
        )
        components.push(buttons);
        return components;
    }

    generateFormItem = ({title, options, component}: any) => {
        const { getFieldDecorator } = this.props.form;
        return (
            <FormItem key={title}>
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
        this.props.form.validateFieldsAndScroll((err: any, values: any) : void => {
            if (!err) {
                const { submitClick } = this.props;
                if(values.isAdmin) {
                    //此处不能在这边进行处理，应该在前面拿到值之后能行处理(后期修改)
                    values.isAdmin = values.isAdmin == 0 ? true : false;
                }
                submitClick && submitClick(values)
                this.props.form.resetFields();
            }
        })
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    { this.FormInputs(this.props.fields) }
                </Form>
            </div>
        )
    }
}

export const SearchForm = Form.create()(Isform);




//views 要生成的列表配置
//showCancel 是否要显示取消按钮
//noBtn 不显示确定按钮
//okText 确定按钮文字
//submitClick 点击确定按钮时的function
//title 弹出层的文字 
//onColse 点击model的关闭与遮罩层的时候关闭的
//editBtn 显示按钮详情
//visible  控制model框是否显示

interface filedsInterface {
    title?: any,
    key?: string,
    type?: string,
    defaultValue?: any,
    items: any,
    onChange: any
}

interface modeInterface {
    title?: string,
    onColse?: any,
    fields?: filedsInterface,
    editBtn?: any,
    visible?: any,
    submitClick?: any,
    defaultData?: any,
    modalKey?: any
}

export class FormModel extends React.Component<modeInterface, any> {
    render() {
        const { title, onColse, fields, editBtn, visible, submitClick, defaultData, modalKey } = this.props
        return (
            <Modal footer={null} title={title} onCancel={onColse} visible={visible} key={modalKey}>
                <SearchForm fields={fields} editBtn={editBtn} submitClick={submitClick} />
            </Modal>
        )
    }
}



Isform.propTypes = {
  title: PropTypes.string,
  fields: PropTypes.arrayOf(Object),
//   onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  okText: PropTypes.string,
}

