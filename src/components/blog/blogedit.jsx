import React from 'react';
import { Row, Col, Card, Button, Input, Select } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import draftToMarkdown from 'draftjs-to-markdown';
import { typelistedit } from '../../model/actions/blog.js';
import { connect } from 'react-redux';

@connect(
    (state) => ({
        saveType: state.saveType,
    })
)

class blogEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: '',
            typeList: '',
            title: void 0,
            type: void 0,
            editorContent: void 0,
        }
    }

    onEditorChange = (editorContent) => {
        this.setState({
            editorContent
        })
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
        console.info(this.state.editorState);
    }

    //清空
    clearedit = () => {
        this.setState({
            editorContent: void 0
        })
    }

    componentDidMount() {
        //在加载的时候会先执行一次获取博客列表.此时因别处要使用，把代码数据放到redux中，方便后面的调用
        if(!Object.keys(this.props.saveType).length) {
            typelistedit({}, (data)=> {
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
        const { editorContent, title, type } = this.state
        console.info(editorContent, title, type, 88888);
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

export default blogEdit