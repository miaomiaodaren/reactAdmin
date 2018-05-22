import * as React from 'react';
import { Route } from 'react-router-dom';
import { SearchForm } from './searchbar';
import { message } from 'antd';



import { UserLogin } from '../api/api';

export default class Login extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            
        }
    }

    Loginfields = (): any[] => {
        return [
            {
                title: '用户名',
                key: 'userName',
                type: 'input', 
                defaultValue: '',
                options: {
                    rules: [{ required: true, message: 'Please input userName!' }],
                }
            }, {
                title: '密码',
                key: 'passWord',
                type: 'password', 
                defaultValue: '',
                options: {
                    rules: [{ required: true, message: 'Please input passWord!' }],
                }
            }
        ]
    }

    editBtn = () => {
        return [{
            name: '确定',
            type: "primary",
            htmlType: 'submit'
        }]
    }

    sumbitClick = async(params: any) => {
        const dataInfo = await UserLogin(params);
        message[dataInfo.status](dataInfo.message);
        if(dataInfo.status === 'success') {
            sessionStorage.setItem('token', params.userName);
            this.props.history.push('/main', {title: 'i am is success!'})
        }
    }

    render() {
        console.info(this.props, this.props.children, 222);
        return (
            <div className="loginBg">
                <SearchForm fields={ this.Loginfields()} editBtn={this.editBtn()} submitClick={this.sumbitClick} />
            </div>
        )
    }
}
