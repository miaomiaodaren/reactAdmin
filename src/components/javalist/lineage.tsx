import React from 'react';
import { Route } from 'react-router-dom';
import { Icon, Input  } from 'antd';
import { addLineAge, getLineAge } from '../../api/api';
const { TextArea } = Input;

export default class lineage extends React.Component {
    constructor(props) {
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
        }
    }
    componentDidMount() {
        getLineAge({title: this.props.match.params.name || ''}).then(res => {
            if(res.data.length) {
                this.setState({
                    nonu: res.data[0]
                })
            }
        }).catch(err => {
            throw new(err)
        })
    }
    triggerClass = (type, ischeck) => {
        let type_bool = this.state[type];
        const { nonu } = this.state;
        if(ischeck === 'check') {
            console.info(this.state, 889);
            //此处提交数据库，把修改的值进行保存
            addLineAge({
                title: this.props.match.params.name, 
                grammar: nonu.grammar, 
                explain: nonu.explain, 
                sample: nonu.sample, 
                thetype: '11'}).then(res => {
                console.info(res, 22);
            })
        }
        this.setState({
            [type]: !type_bool
        }, () => {
            console.info(this.state);
        })
    }
    setField(filed, value) {
        const { nonu } = this.state; 
        nonu[filed] = value;
        this.setState({nonu});
    }
    render() {
        const paramName = this.props.match.params.name || '';
        const { grammar, explain, sample, nonu } = this.state;
        console.info(this.state, 33);
        return (
            <div id="lineage">
                <h2>{ paramName }</h2>
                <div className="css_main">
                    <p>语法：
                        <Icon type={ grammar ? 'check' : 'edit' } onClick={ () => this.triggerClass('grammar', grammar ? 'check' : 'edit') } />
                    </p>
                    <div className="css_grammar">
                        <p className={ grammar ? 'ishide' : 'isshow' }>
                            {nonu && nonu['grammar']}
                        </p>
                        <TextArea className={ grammar ? 'isshow' : 'ishide' } autosize  onChange={(e) => this.setField('grammar', e.target.value)} value={this.state.nonu.grammar} />
                    </div>
                    <p>说明：
                        <Icon type={ explain ? 'check' : 'edit' } onClick={ () => this.triggerClass('explain', explain ? 'check' : 'edit') } />
                    </p>
                    <div className="css_explain">
                        <p className={ explain ? 'ishide' : 'isshow' }>
                            {nonu && nonu['explain']}
                        </p>
                        <TextArea className={ explain ? 'isshow' : 'ishide' } autosize onChange={(e) => this.setField('explain', e.target.value)} value={this.state.nonu.explain} />
                    </div>
                    <p>示例：
                        <Icon type={ sample ? 'check' : 'edit' } onClick={ () => this.triggerClass('sample', sample ? 'check' : 'edit') } />
                    </p>
                    <div className="css_sample">
                        <p className={ sample ? 'ishide' : 'isshow' }>
                            {nonu && nonu['sample']}
                        </p>
                        <TextArea className={ sample ? 'isshow' : 'ishide' } autosize onChange={(e) => this.setField('sample', e.target.value)} value={this.state.nonu.sample} />
                    </div>
                </div>
            </div>
        )
    }
}