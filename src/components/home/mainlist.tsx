import React from 'react';
import styled from 'styled-components';
import propsType from 'prop-types';
import {Pagination, Spin} from 'antd';
import {GetBlogList} from '../../api/api'

export default class List extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            list: [],
        }
    }

    onShowSizeChange = () => {
        
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        this.getlist(1);
    }

    getlist = async(page: number) => {
        try{
            const {status, result} = await GetBlogList({page, pagesize: 10});
            if(status === 'success') {
                const newresult = result.data.map((item: any) => {
                    item.about = '222'
                    return item
                })
                console.info(newresult, 222);
                this.setState({
                    list: result.data
                })
            }
        } catch(err) {
            console.info(err)
        }
    }

    showhtml = (data: any) => {
        var html = {__html: data};
        return <div dangerouslySetInnerHTML={html} /> ;
    }

    render() {
        const {list} = this.state;
        return (
            <ListMain>
                <Spin className="spin" />
                <ul className="blog_list">
                    {list.map((item: any) => {
                        return (<li>
                            <h2>{item.title}</h2>
                            <div className="blog_about">
                                <span>所属类别: {item.type}</span>
                                <span>添加日期: {item.addtime}</span>
                            </div>
                            <div className="blog_test">
                                {this.showhtml(item.content)}
                            </div>
                        </li>)
                    })}
                </ul>
                <Pagination showSizeChanger onShowSizeChange={this.onShowSizeChange} defaultCurrent={3} total={500} />,
            </ListMain>
        )
    }
}

const ListMain = styled.div`
    width: 100%;
    text-align: center;
    .spin{
        display: flex;justify-content: center;align-items:center;
    }
    .blog_list{
        background-color: #eee;
        li{
            min-height: 100px;
            margin-bottom: 20px;
            background-color: #fff;
            box-shadow: 0 2px 2px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.06), 0 1px 5px 0 rgba(0,0,0,0.12);
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            h2{
                padding: 20px 0;
                margin-bottom: 0;
                font-size: 20px;
                font-weight: 600;
            }
            .blog_about{
                display: flex;
                flex-direction: row;
                text-align: center;
                span{
                    flex: 1;
                }
            }
            .blog_test{
                text-align: left;
                padding: 30px 60px;
            }
        }
    }
`