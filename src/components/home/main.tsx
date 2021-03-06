import * as React from 'react';
import {is, fromJS, Map, List} from 'immutable'
import styled from 'styled-components';
import {Row, Col} from 'antd';
import NumAmation from '../../plugin/numtotal/index';
import MainList from './mainlist';
import ScrolltoTop from '../../plugin/scrollToTop/scrolltop'

export default class Main extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }
    componentDidMount() {
    }
    render() {
        console.info(this.props, 555);
        return (
            <HomeMain>
                <div className="home_main_header">
                    <Row>
                        <Col span={8}>
                            <p>用户数量</p>
                            <p className="userCount">
                                <span><NumAmation count={121} /></span>个
                            </p>
                        </Col>
                        <Col span={8}>
                            <p>文章数量</p>
                            <p className="blogCount">
                                <span><NumAmation count={121} /></span>个
                            </p>
                        </Col>
                        <Col span={8}>
                            <p>插件数量</p>
                            <p className="pluginCount">
                                <span><NumAmation count={121} /></span>个
                            </p>
                        </Col>
                    </Row>
                </div>
                <div className="bloglist">
                    <MainList />
                </div>
                <ScrolltoTop />
            </HomeMain>
        )
    }
}

const HomeMain = styled.div`
    .home_main_header{
        padding: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        display: block;
        text-align: center;
        font-size: 20px;
        background-color: #fff;
        .userCount, .blogCount, .pluginCount{
            color: #fc463f;
            font-size: 14px;
            span{
                font-size: 30px;
            }
        }
        .blogCount{
            color: #5db423;
        }
        .pluginCount{
            color: #ff9c00;
        }
    }
    .bloglist{
        margin-bottom: 30px;
    }
`