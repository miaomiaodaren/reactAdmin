import * as React from 'react';
import { Route } from 'react-router-dom';
import { SearchForm } from './searchbar';
import { message } from 'antd';


import apis from '../api/api';

function proAjax(types: any) {
    return function(target: any) {
        target.aabb = apis[types]
    }
}

@proAjax('UserLogin')
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

    sumbitClick = (params: any) => {
        
    }

    render() {
        return (
            <div className="loginBg">
                <SearchForm fields={ this.Loginfields()} editBtn={this.editBtn()} submitClick={this.sumbitClick} />
            </div>
        )
    }
}



console.info(Login.prototype, Login, 7777);