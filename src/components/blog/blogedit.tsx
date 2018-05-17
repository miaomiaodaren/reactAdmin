/// <reference path="../../../declare_modules.d.ts" />
import * as React from 'react';
import { Row, Col, Card, Button, Input, Select, message } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import draftToMarkdown from 'draftjs-to-markdown';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';   //用来把html的数据还原成富文本框的格式
import { getAsynTypeList } from '../../model/actions/blog';
import { isEmptyObject } from '../../util/util'; 
import { connect } from 'react-redux';
import { AddBlog, GetBlogList } from '../../api/api';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';


interface IContentPageProps {
    saveType?: any
}

interface isf {
    title?: string,
    type?: string,
    [index: string]: any
}

const mapStateToProps = (state: any) => ({
    alltypeList: state.getAllType,
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        GetAllTypes: async(data: any = {}, callback?: any) => {
            return await getAsynTypeList(data, callback)(dispatch)
        }
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class blogEdit extends React.Component<any, any> {
    constructor(props: IContentPageProps) {
        super(props);
        this.state = {
            editorState: '',
            typeList: '',
            title: void 0,
            type: void 0,
            editorContent: void 0,
        }
    }

    onEditorChange = (editorContent: any): void  => {
        this.setState({
            editorContent
        })
    }

    onEditorStateChange = (editorState: string): void => {
        this.setState({
            editorState,
        });
    }

    //清空
    clearedit = () => {
        this.setState({
            editorContent: void 0
        })
    }

    componentDidMount() {
        const {alltypeList, GetAllTypes} = this.props;
        const {params} = this.props.match; 
        if(params.id) {
            GetBlogList({_id: params.id}).then(res => {
                const {title = '', type = '', content = ''} = res.result.data[0],
                    contentBlock = htmlToDraft(content);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks),
                        editorState = EditorState.createWithContent(contentState);
                    this.setState({
                        title, 
                        type, 
                        editorState,
                    });
                }
            })
        }
        //在加载的时候会先执行一次获取博客列表.此时因别处要使用，把代码数据放到redux中，方便后面的调用
        if(isEmptyObject(alltypeList)) {
            GetAllTypes().then((res: any[]) => {
                this.setState({
                    typeList: res || []
                })
            });
        } else {
            this.setState({
                typeList: alltypeList.list || []
            })
        }
    }

    //分类改变
    typeChange = () => {

    }

    addBlog = () => {
        const {params} = this.props.match,
            { editorContent, title, type } = this.state,
            data = params.id ? {title, type, content: draftToHtml(editorContent), _id: params.id} : {title, type, content: draftToHtml(editorContent)};
        AddBlog(data).then(res => {
            if(res.status == 'success') {
                message.success('博客添加成功');
                this.props.history.push('/blog');
            }
        })
    }

    setField(field: any, value: any) {
        let f: isf = {}; 
        f[field] = value;
        this.setState(f);    //在修改完成之后,还是需要使用setState;
        // console.info(this.state, 77);
    }

    setfiles = () => {
        const {list} = this.props.alltypeList || [];
        const bb = this.props.alltypeList.list;
        let sb = (list||[]).map((n: any, v: number) => <Select.Option value={n.name} >{n.name}</Select.Option>);
        let components = [];
        components.push(sb);
        return components
    }

    render() {
        console.info(this.props);
        const { editorContent, editorState, title, type } = this.state;
        return (
            <div className="warp">
                <Row gutter={16}>
                    <Col span={6}>
                        <Input placeholder="标题" style={{marginBottom: 20}}  value={title} onChange={e => this.setField('title', e.target.value)} />
                    </Col>
                    <Col span={12}>
                    <Select defaultValue="全部" style={{ width: 120 }} value={type == void 0 ? '全部': type}  onChange={(value) => this.setField('type', value)}>
                        {this.setfiles()}
                    </Select>
                    </Col>
                    <Col span={24}>
                        <div className="cloud-box">
                            <Card title="富文本编辑器" bordered={true} >
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="home-toolbar"
                                    wrapperClassName="home-wrapper"
                                    editorClassName="home-editor"
                                    onEditorStateChange={this.onEditorStateChange}
                                    toolbar={{
                                        history: { inDropdown: true },
                                        list: { inDropdown: true },
                                        textAlign: { inDropdown: true },
                                        // image: { uploadCallback: this.imageUploadCallBack },
                                    }}
                                    onContentStateChange={this.onEditorChange}
                                    placeholder="write it"
                                    spellCheck
                                    onFocus={() => {console.log('focus')}}
                                    onBlur={() => {console.log('blur')}}
                                    onTab={() => {console.log('tab'); return true;}}
                                    localization={{ locale: 'zh', translations: {'generic.add': 'Add'} }}
                                />
                            </Card>
                        </div>
                    </Col>
                    <Col span={24} className="editbutton">
                        <Button type="primary" onClick={this.addBlog}>确定</Button>
                        <Button type="danger" onClick={this.clearedit}>清空</Button>
                    </Col>
                    <Col span={7}>
                        <Card title="同步转换HTML" bordered={true}>
                            <pre>{draftToHtml(editorContent)}</pre>
                        </Card>
                    </Col>
                    <Col span={7}>
                        <Card title="同步转换MarkDown" bordered={true}>
                            <pre style={{whiteSpace: 'pre-wrap'}}>{draftToMarkdown(editorContent)}</pre>
                        </Card>
                    </Col>
                    <Col span={7}>
                        <Card title="同步转换JSON" bordered={true}>
                            <pre style={{whiteSpace: 'normal'}}>{JSON.stringify(editorContent)}</pre>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}


