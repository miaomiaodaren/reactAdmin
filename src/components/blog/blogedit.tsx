/// <reference path="../../../declare_modules.d.ts" />
import * as React from 'react';
import { Row, Col, Card, Button, Input, Select, message } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import draftToMarkdown from 'draftjs-to-markdown';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';   //用来把html的数据还原成富文本框的格式
import { typelistedit } from '../../model/actions/blog';
import { connect } from 'react-redux';
import { AddBlog, GetBlogList } from '../../api/api';
import { withRouter } from 'react-router-dom'

export interface Props {
    saveType: any
}

@connect(
    (state) => ({ saveType: state.saveType })
)

class blogEdit extends React.Component<any, any> {
    constructor(props: Props) {
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
        const {params} = this.props.match;
        if(params.id) {
            GetBlogList({_id: params.id}).then(res => {
                const {title = '', type = '', content = ''} = res.information[0],
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
        if(!Object.keys(this.props.saveType).length) {
            typelistedit({}, (data) => {
                this.setState({
                    typeList: data.list
                })
            })(this.props.dispatch)   
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
            if(res.status == 1) {
                message.success('博客添加成功');
                this.props.history.push('/blog');
            }
        })
    }

    setField(field, value) {
        let f = {}; 
        f[field] = value;
        this.setState(f);    //在修改完成之后,还是需要使用setState;
        // console.info(this.state, 77);
    }

    setfiles = () => {
        const {list} = this.props.saveType || [];
        const bb = this.props.saveType.list;
        let sb = (list||[]).map((n, v) => <Select.Option value={n.name} >{n.name}</Select.Option>);
        let components = [];
        components.push(sb);
        return components
    }

    render() {
        const { editorContent, editorState, title, type } = this.state;
        return (
            <div className="warp">
                <Row gutter={16}>
                    <Col span={6}>
                        <Input placeholder="标题" style={{marginBottom: 20}}  value={title} onChange={e => this.setField('title', e.target.value)} />
                    </Col>
                    <Col span={12}>
                    <Select defaultValue="全部" style={{ width: 120 }} onChange={this.typeChange} value={type == void 0 ? '全部': type}  onChange={(value) => this.setField('type', value)}>
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
                                    placeholder="大家好,我是傻逼"
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

export default withRouter(blogEdit)