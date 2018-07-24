import * as React from 'react';
import { Route } from 'react-router-dom';
import { SearchForm } from './searchbar';
import { message } from 'antd';
import { UserLogin } from '../api/api';
import styled from 'styled-components';

const Pheight = document.body.clientHeight;

const LoginBg = styled.div`
    width: 100%;
    height: ${Pheight}px;
`
const LoginDiv = styled.div`
    width: 400px;
    height: 300px;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #ddd;
    background-color: #fff;
    padding: 30px;
`

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
        return (
            <LoginBg className="loginBg">
                <LoginDiv>
                    <SearchForm fields={ this.Loginfields()} editBtn={this.editBtn()} submitClick={this.sumbitClick} />
                </LoginDiv>
            </LoginBg>
        )
    }
}
