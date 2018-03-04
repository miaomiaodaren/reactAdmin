import React from 'react';
import { Route } from 'react-router-dom';
import { Icon, Input  } from 'antd';

export default class lineage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            grammar: false,
            explain: false,
            sample: false,
        }
    }
    isedit = (v) => {
        return this.state[v] ? 'isshow' : 'ishide'
    }
    triggerClass = (type) => {
        console.info(2);
        this.setState({
            type: !type
        })
        console.info(this.state);
    }
    render() {
        console.info(this.props, this.props.match.params.name);
        const paramName = this.props.match.params.name || '';
        return (
            <div id="lineage">
                <h2>{ paramName }</h2>
                <div className="css_main">
                    <p>语法：<Icon type="edit" onClick={ () => this.triggerClass('grammar') } /></p>
                    <div className="css_grammar">
                        <p className={ this.isedit('grammar') }>
                            111
                        </p>
                        <Input className={ this.isedit('grammar') } value="111" />
                    </div>
                    <p>说明：<Icon type="edit" onClick={ () => this.triggerClass('explain') } /></p>
                    <div className="css_explain">
                        <p className={ this.isedit('explain') }>
                            222
                        </p>
                        <Input className={ this.isedit('explain') } value="222" />
                    </div>
                    <p>示例：<Icon type="edit" onClick={ () => this.triggerClass('sample') } /></p>
                    <div className="css_sample">
                        <p className={ this.isedit('sample') }>
                            333
                        </p>
                        <Input className={ this.isedit('sample') } value="333" />
                    </div>
                </div>
            </div>
        )
    }
}