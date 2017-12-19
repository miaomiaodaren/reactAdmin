import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

const FormItem = Form.Item;

import './index.less'

import { Loging } from '../../api/api'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: `/api/user/GetImgCode`
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if(!err) {
                let d = await Loging({});
                console.info(d, 3333);
            } else {
                console.info(err, values, 333);
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="adminLogin">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input className="login_input" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input className="login_input" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('imgcode', {
                            rules: [{ required: true, message: 'Please input your ImageCode' }],
                        })(
                            <Input className="login_input imgcode" prefix={<Icon type="area-chart" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Imgcode" />
                        )}
                        <img src={this.state.imgUrl} className="imgcodes" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            用户登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

// 经过 Form.create 包装的组件将会自带 this.props.form 属性
const Login = Form.create()(LoginPage);
export default Login;