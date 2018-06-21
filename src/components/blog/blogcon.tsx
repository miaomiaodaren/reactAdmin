import * as React from 'react';
import { GetBlogList } from '../../api/api';
import styled from 'styled-components';

const BlogMain = styled.div`
    padding: 30px;
    h2{
        text-align: center;
        line-height: 80px;
    }
    .blog_typeof{
        display: flex;
        flex-direction: row;
        span{
            flex: 1;
            display: inline-block;
            text-align: center;
        }
    }
    .blog_main{
        font-size: 14px;
        margin-top: 30px;
    }
    pre{
        padding: 1em;
        border: none;
        overflow: auto;
        line-height: 1.45;
        max-height: 35em;
        position: relative;
        background: url('/src/static/blueprint.png') #F6F6F6;
        -webkit-background-size: 30px,30px;
        background-size: 30px,30px;
        font-size: 13px;
    }
`

export default class BlogCon extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            blogCon: []
        }
    }
    componentDidMount() {
        const {id} = this.props.match && this.props.match.params
        GetBlogList({_id: id}).then(res => {
            this.setState({
                blogCon: res.result.data
            })
        }).catch(err => {
            console.info(err);
        })
    }
    showhtml = (data: any) => {
        var html = {__html: data};
        return <div dangerouslySetInnerHTML={html} /> ;
    }
    render() {
        const {blogCon} = this.state;
        return(
            <BlogMain>
                {blogCon.map((component: any) => {
                    return <React.Fragment key={component._id}>
                        <h2>{component.title}</h2>
                        <div className="blog_typeof">
                            <span>所属分类: {component.type}</span>
                            <span>发布日期: {component.addtime}</span>
                        </div>
                        <div className="blog_main">
                            {this.showhtml(component.content)}
                        </div>
                    </React.Fragment>
                })}
            </BlogMain>
        )
    }
}