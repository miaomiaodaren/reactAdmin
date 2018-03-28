import * as React from 'react';
import { Route } from 'react-router-dom';
import { Icon, Input  } from 'antd';
import { addLineAge, getLineAge } from '../../api/api';
import { createAjaxAction } from '../../util/index'
const { TextArea } = Input;

import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';   //用来把html的数据还原成富文本框的格式
import draftToHtml from 'draftjs-to-html';
import { trim } from '../../util/util'
import { csstt, cssAttrAction } from '../../model/actions/jstt';

import * as styles from './javalist.less';

class lineage extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            grammar: false,
            explain: false,
            sample: false,
            nonu: {
                grammar: '',
                explain: '',
                sample: '',
            },
            grammar_editorState: '',
            grammar_editorContent: void 0,
            explain_editorState: '',
            explain_editorContent: void 0,
            sample_editorState: '',
            sample_editorContent: void 0,
        }
    }
    componentDidMount() {
        getLineAge({title: this.props.match.params.name || ''}).then(res => {
            if(res.data.length) {
                this.assingment(res);
            }
        }).catch(err => {
            console.info(err, 'iserr');
        })
    }
    //在进页进来时，需要对富文本框以及显示的字段进行双重复值
    assingment = (res: any) => {
        const keys = Object.keys(this.state.nonu), stateCount: any = {}; 
        let n = res.data[0];
        keys.forEach(v => {
            const contentBlock = htmlToDraft(n[v] || ''),
                contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks),
                editorState = EditorState.createWithContent(contentState);
                stateCount[ v +'_editorState'] = editorState;
                stateCount[ v +'_editorContent'] = contentBlock;
        })
        this.setState({
            nonu: res.data[0],
            ...stateCount
        })
    }

    triggerClass = (type: any, ischeck: any) => {
        let type_bool = this.state[type];
        const { nonu } = this.state;
        if(ischeck === 'check') {
            //此处提交数据库，把修改的值进行保存
            addLineAge({
                title: this.props.match.params.name, 
                grammar: draftToHtml(this.state.grammar_editorContent) || this.state.nonu.grammar, 
                explain: draftToHtml(this.state.explain_editorContent) || this.state.nonu.explain, 
                sample: draftToHtml(this.state.sample_editorContent) || this.state.nonu.sample, 
                thetype: '11'
            }).then(res => {
                this.props.showAttr(this.props.match.params.name, this.assingment)
            })
        }
        this.setState({
            [type]: !type_bool
        }, () => {
            console.info(this.state);
        })
    }
    grammar_onEditorChange = (grammar_editorContent: any): void => {
        this.setState({
            grammar_editorContent
        })
    }
    grammar_onEditorStateChange = (grammar_editorState: any): void => {
        this.setState({
            grammar_editorState,
        });
    }
    explain_onEditorChange = (explain_editorContent: any): void => {
        this.setState({
            explain_editorContent
        })
    }
    explain_onEditorStateChange = (explain_editorState: any): void => {
        this.setState({
            explain_editorState,
        });
    }
    sample_onEditorChange = (sample_editorContent: any): void => {
        this.setState({
            sample_editorContent
        })
    }
    sample_onEditorStateChange = (sample_editorState: any): void => {
        this.setState({
            sample_editorState,
        });
    }

    showhtml = (data: any) => {
        var html = {__html: data};
        return <div dangerouslySetInnerHTML={html} /> ;
    }

    filesHtml = () => {
        const { grammar, explain, sample, nonu } = this.state,
            paramName: [string, number] = this.props.match.params.name || '';
        let com_type: any[] = [{title: '语法', type: 'grammar'}, {title: '说明', type: 'explain'}, {title: '示例', type: 'sample'}],
            components: any[] = [], self: any = this;
        com_type.forEach(com => {
            components.push(
                (
                    <div key={com.type} className="css_main">
                        <p>{com.title}<Icon type={ this.state[com.type] ? 'check' : 'edit' } onClick={ () => this.triggerClass(com.type, this.state[com.type] ? 'check' : 'edit') } /></p>
                        <div className="css_grammar">
                            <div className={ this.state[com.type] ? 'ishide' : 'isshow' } >
                                {this.showhtml(nonu[com.type])}
                            </div>
                            <Editor
                                toolbarClassName="toolbarClassName"
                                wrapperClassName={ this.state[com.type] ? 'isshow' : 'ishide' }
                                editorClassName={ styles.editorClassName }
                                editorState={ this.state[`${com.type}_editorState`] }
                                onContentStateChange={self[`${com.type}_onEditorChange`]}
                                onEditorStateChange={self[`${com.type}_onEditorStateChange`]}
                            />
                        </div>
                    </div>
                )
            )
        })
        return components
    }

    render() {
        const paramName: [string, number] = this.props.match.params.name || '';
        const { grammar, explain, sample, nonu, grammar_editorState,  } = this.state;
        return (
            <div id="lineage">
                <h2>{ paramName }</h2>
                {this.filesHtml()}
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    cssAttr: state.CssTtReducer,
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        showAttr: (title: string, callback: any) => createAjaxAction(getLineAge, '', cssAttrAction)({title}, callback)(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(lineage)



//3.28简化代码备注
{/* <div className="css_main">
<p>语法：
    <Icon type={ grammar ? 'check' : 'edit' } onClick={ () => this.triggerClass('grammar', grammar ? 'check' : 'edit') } />
</p>
<div className="css_grammar">
    <p className={ grammar ? 'ishide' : 'isshow' } >
        {this.showhtml(nonu.grammar)}
    </p>
    <Editor
        editorState={ grammar_editorState }
        toolbarClassName="toolbarClassName"
        wrapperClassName={ grammar ? 'isshow' : 'ishide' }
        editorClassName={ styles.editorClassName }
        onContentStateChange={this.grammar_onEditorChange}
        onEditorStateChange={this.grammar_onEditorStateChange}
    />
</div>
<p>说明：
    <Icon type={ explain ? 'check' : 'edit' } onClick={ () => this.triggerClass('explain', explain ? 'check' : 'edit') } />
</p>
<div className="css_explain">
    <p className={ explain ? 'ishide' : 'isshow' }>
        {this.showhtml(nonu.explain)}
    </p>
    <Editor
        editorState={ this.state.explain_editorState }
        toolbarClassName="toolbarClassName"
        wrapperClassName={ explain ? 'isshow' : 'ishide' }
        editorClassName={ styles.editorClassName }
        onContentStateChange={this.explain_onEditorChange}
        onEditorStateChange={this.explain_onEditorStateChange}
    />
</div>
<p>示例：
    <Icon type={ sample ? 'check' : 'edit' } onClick={ () => this.triggerClass('sample', sample ? 'check' : 'edit') } />
</p>
<div className="css_sample">
    <p className={ sample ? 'ishide' : 'isshow' }>
        {this.showhtml(nonu.sample)}
    </p>
    <Editor
        editorState={ this.state.sample_editorState }
        toolbarClassName="toolbarClassName"
        wrapperClassName={ sample ? 'isshow' : 'ishide' }
        editorClassName={ styles.editorClassName }
        onContentStateChange={this.sample_onEditorChange}
        onEditorStateChange={this.sample_onEditorStateChange}
    />
</div>
</div> */}