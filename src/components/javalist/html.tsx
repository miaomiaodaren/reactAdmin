import React from 'react';
import PropsTypes from 'prop-types';
import styled from 'styled-components';

export default class Htmler extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }
    static propTypes = {
        title: PropsTypes.string,
    }
    static defaultProps = {
        title: ''
    }

    render() {
        return (
            <Htmlstyle id="html">
                <h1>{this.props.title}</h1>
                <div>
                    <h2>Window 方法</h2>
                    <div>
                        window.innerHeight - 浏览器窗口的内部高度   不包括地址栏，导航栏
                        window.innerWidth - 浏览器窗口的内部宽度
                        window.open() - 打开新窗口
                        window.close() - 关闭当前窗口
                        window.moveTo() - 移动当前窗口
                        window.resizeTo() - 调整当前窗口大小
                        window.screen.availWidth - 可用的屏幕宽度
                        screen.availHeight - 可用的屏幕高度
                        location.hostname 返回 web 主机的域名
                        location.pathname 返回当前页面的路径和文件名
                        window.location.origin 返回当前的域名
                        location.port 返回 web 主机的端口 （80 或 443）
                        location.protocol 返回所使用的 web 协议（http:// 或 https://）
                        location.href 属性返回当前页面的 URL。
                        history.back() - 与在浏览器点击后退按钮相同
                        history.forward() - 与在浏览器中点击按钮向前相同
                    </div>
                </div>
            </Htmlstyle>
        )
    }
}

const Htmlstyle = styled.div`
    h1{
        font-size: 24px;
        line-height: 40px;
        display: block;
    }
    h2{
        font-size: 20px;
        line-height: 40px;
        display: block;
    }
`