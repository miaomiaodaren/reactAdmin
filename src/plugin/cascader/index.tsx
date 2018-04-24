import * as React from 'react'
// import Cascader from './cascader'
import 'rc-cascader/assets/index.css';
import RcCascader from 'rc-cascader';

class Cas extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            option: [{
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [{
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [{
                        value: 'xihu',
                        label: 'West Lake',
                    }],
                }],
            }, {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [{
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [{
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                        children: [{
                            value: 'taipingmen',
                            label: 'Tai Ping Men'
                        }]
                    }],
                }],
            }],
            defvalue: []
        }
    }
    componentDidMount() {
        console.info(RcCascader, 2222)
    }
    changes = (v: any) => {
        console.info(v);
        this.setState({
            defvalue: v
        })
    }
    
    render() {
        const {option, defvalue} = this.state;
        return (
           <div>
               <RcCascader options={option} onChange={(val: any)=> this.changes(val)}  value={defvalue}><input value={defvalue} readOnly/></RcCascader>
           </div>
        )
    }
}

export default Cas