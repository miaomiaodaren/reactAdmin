import React from 'react';
import styled from 'styled-components';
import propsType from 'prop-types';
import {Pagination, Spin} from 'antd';
import {GetBlogList} from '../../api/api';
import {Link} from 'react-router-dom'

const ReactCSSTransitionGroup = require('react-addons-css-transition-group');



export default class List extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            list: [],
            page: 1,
            pagesize: 10,
            listcount: 0,
            isloading: false
        }
    }

    onShowChange = (p: number, pagesize: number) => {
        this.getlist(p)
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        this.getlist(1);
    }

    getlist = async(page: number) => {
        this.setState({isloading: true})
        try{
            const {status, result} = await GetBlogList({page, pagesize: 10});
            if(status === 'success') {
                const newresult = result.data.map((item: any) => {
                    item.about = item.content.replace(/(<pre.+>.+<\/pre>)/, '').replace(/(<[^>^<]*>)/g, '').substr(0, 300).replace(' ', '');
                    return item
                })
                console.info(newresult, 222);
                this.setState({
                    list: result.data,
                    page,
                    pagesize: parseInt(result.pagesize),
                    listcount: result.count,
                    isloading: false
                }, () => {
                    document.documentElement.scrollTop = 0;
                })
            }
        } catch(err) {
            this.setState({isloading: false})
            console.info(err)
        }
    }

    showhtml = (data: any) => {
        var html = {__html: data};
        return <span dangerouslySetInnerHTML={html} /> ;
    }

    render() {
        console.info(this.props, 4444);
        const {list, page, pagesize, listcount, isloading} = this.state;
        return (
            <ListMain>
                {isloading ? <Spin className="spin"  /> : ''}
                <ul className="blog_list">
                    {list.map((item: any) => {
                        return (<li key={item._id}>
                            <h2><Link to={`/blogcon/${item._id}`}>{item.title}</Link></h2>
                            <div className="blog_about">
                                {/* <ReactCSSTransitionGroup transitionName="example"  transitionAppear={true} transitionAppearTimeout={5000} transitionEnterTimeout={5000} transitionLeaveTimeout={5000} >
                                    <Aa></Aa>
                                </ReactCSSTransitionGroup> */}
                                <span>所属类别: {item.type}</span>
                                <span>添加日期: {item.addtime}</span>
                            </div>
                            <div className="blog_test">
                                {this.showhtml(item.about)}...<Link to={`/blogcon/${item._id}`}>查看更多</Link>
                            </div>
                        </li>)
                    })}
                </ul>
                <Pagination  onChange={this.onShowChange} pageSize={pagesize} defaultCurrent={1} current={page} total={listcount} />,
            </ListMain>
        )
    }
}

const Aa = ((props: any) => {
    return (<div>22222</div>)
})


const ListMain = styled.div`
    width: 100%;
    text-align: center;
    .spin{
        display: flex;justify-content: center;align-items:center;
    }
    .blog_list{
        background-color: #eee;
        margin-top: 30px;
        li{
            min-height: 100px;
            margin-bottom: 20px;
            background-color: #fff;
            box-shadow: 0 2px 2px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.06), 0 1px 5px 0 rgba(0,0,0,0.12);
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            transition: transform 0.3s ease-out;
            animation: fadeInLeft 1s 1;
            &:hover{
                transform: scale(1.01)
            }
            a{
                color: #000;
            }
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
                margin-bottom: 30px;
            }
        }
    }
    @-webkit-keyframes fadeInLeft {
        from {
            opacity: 0;
            -webkit-transform: translate3d(-10%, 0, 0);
            transform: translate3d(-10%, 0, 0);
        }

        to {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }

    @keyframes fadeInLeft {
        from {
            opacity: 0;
            -webkit-transform: translate3d(-10%, 0, 0);
            transform: translate3d(-10%, 0, 0);
        }

        to {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }

    .fadeInLeft {
        -webkit-animation-name: fadeInLeft;
        animation-name: fadeInLeft;
    }

    

`
