import * as React from 'react';
import { Editor, EditorState } from 'draft-js'

export default class Edits extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty()
        }
    }
    public editor: any
    onChange: Function = (editorState: any): void => {
        console.info(editorState.toJS(), 333);
        this.setState({editorState});
    }
    focus = () => {
    }
    //绑定ref元素
    setEditorReference: Function = (ref: Object): void => {
        this.editor = ref;
    }
    onTab: Function = (event: any) => {
            
    }
    render() {
        return (
            <div>
                <div onClick={this.focus}>
                    <Editor 
                        editorState={this.state.editorState} 
                        onChange={this.onChange} 
                        customStyleMap={colorStyleMap}
                        ref={this.setEditorReference}
                        onTab = {this.onTab}
                    />
                </div>
            </div>
        )
    }
}

const colorStyleMap = {
    red: {
      color: 'rgba(255, 0, 0, 1.0)',
    },
    orange: {
      color: 'rgba(255, 127, 0, 1.0)',
    },
    yellow: {
      color: 'rgba(180, 180, 0, 1.0)',
    },
    green: {
      color: 'rgba(0, 180, 0, 1.0)',
    },
    blue: {
      color: 'rgba(0, 0, 255, 1.0)',
    },
    indigo: {
      color: 'rgba(75, 0, 130, 1.0)',
    },
    violet: {
      color: 'rgba(127, 0, 255, 1.0)',
    },
};